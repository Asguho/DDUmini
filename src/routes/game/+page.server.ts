import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './/$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq, sql, and } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { getSentence } from '$lib/utils';
import { json } from '@sveltejs/kit';
import type { Sentence } from '$lib/types';

export const load = (async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/auth/login');
	}

	const [user] = await db.select().from(table.user).where(eq(table.user.id, event.locals.user.id));

	if (!user) {
		return redirect(302, '/auth/login');
	}

	const gameId = uuidv4();

	const AMOUNT = 5;
	const originalSentences = [];
	const sentencesWithoutCommas = [];

	for (let i = 0; i < AMOUNT; i++) {
		const sentence = getSentence();
		originalSentences.push({ id: i, text: sentence });
		const sentenceWithoutCommas = sentence.replace(/,/g, '');
		sentencesWithoutCommas.push({
			id: i,
			text: sentenceWithoutCommas
		});
	}

	// Store the original sentences in the database
	await db.insert(table.games).values({
		id: gameId,
		userId: event.locals.user.id,
		sentences: JSON.stringify(originalSentences)
	});

	return {
		user,
		gameId,
		sentences: sentencesWithoutCommas
	};
}) satisfies PageServerLoad;

export const actions = {
	finishGame: async (event) => {
		// check if user is logged in
		if (!event.locals.user) {
			return redirect(302, '/auth');
		}

		const formData = await event.request.formData();
		const gameId = formData.get('gameId') as string;
		const sentences: Sentence[] = JSON.parse(formData.get('sentences') as string);

		// check if the game ID is already completed
		const [completedGame] = await db
			.select()
			.from(table.completedGames)
			.where(
				and(
					eq(table.completedGames.userId, event.locals.user.id),
					eq(table.completedGames.gameId, gameId)
				)
			);

		if (completedGame) {
			return redirect(302, '/game');
		}

		//get the games original sentences
		const [game] = await db
			.select()
			.from(table.games)
			.where(and(eq(table.games.id, gameId), eq(table.games.userId, event.locals.user.id)));

		//verify that the game exists
		if (!game) {
			return redirect(302, '/game');
		}

		const originalSentences: { id: number; text: string }[] = JSON.parse(game.sentences);

		//check if the user has completed the game by verifying that all sentences are correctly punctuated
		const isGameCompleted = sentences.every((sentence) => {
			const originalSentence = originalSentences.find((s) => s.id === sentence.id);
			if (!originalSentence) {
				return false;
			}

			//if amount of missing commas is 0 and amount of wrong commas is 0 the sentence is correct
			const amountOfMissingCommas = [...originalSentence.text.matchAll(/,/g)].filter(
				(match) => sentence.text[match.index!] !== ','
			).length;

			const amountOfWrongCommas = [...sentence.text.matchAll(/,/g)]
				.map((match) => match.index!)
				.reduce((count, index) => (originalSentence.text[index] !== ',' ? count + 1 : count), 0);

			return amountOfMissingCommas === 0 && amountOfWrongCommas === 0;
		});

		console.log(isGameCompleted);
		console.log(sentences);
		console.log(originalSentences);

		//if the game is not completed redirect to game
		if (!isGameCompleted) {
			return redirect(302, '/game');
		}

		//get the user lives
		const [user] = await db
			.select()
			.from(table.user)
			.where(eq(table.user.id, event.locals.user.id));

		let userLifes = user.lifes;
		let mappedLifes = ((value, inMin, inMax, outMin, outMax) => {
			return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
		})(userLifes, 0, 10, 1, 1.5);

		let newXp = Math.floor(user.xp + 100 * mappedLifes);

		// update xp
		await db
			.update(table.user)
			.set({
				xp: newXp
			})
			.where(eq(table.user.id, event.locals.user.id));

		//add 3 lifes to the user because he finished the game
		await db
			.update(table.user)
			.set({
				lifes: sql`${table.user.lifes} + 3`
			})
			.where(eq(table.user.id, event.locals.user.id));

		//if the user has more than 10 lifes set the lifes to 10
		await db
			.update(table.user)
			.set({
				lifes: 10
			})
			.where(sql`${table.user.lifes} > 10`);

		// update activity history
		const [{ activityHistory: unparsedActivityHistory }] = await db
			.select({ activityHistory: table.user.activityHistory })
			.from(table.user)
			.where(eq(table.user.id, event.locals.user.id));

		const activityHistory = (() => {
			try {
				return JSON.parse(unparsedActivityHistory);
			} catch (error) {
				return {};
			}
		})();

		const today = new Date().toISOString().split('T')[0];
		const previousActivityToday = activityHistory[today] ?? 0;
		activityHistory[today] = previousActivityToday + 1;

		await db
			.update(table.user)
			.set({ activityHistory: JSON.stringify(activityHistory) })
			.where(eq(table.user.id, event.locals.user.id));

		// mark the game as completed
		await db.insert(table.completedGames).values({ userId: event.locals.user.id, gameId });

		//redirect to game
		return redirect(302, '/game');
	},
	deductLife: async (event) => {
		// check if user is logged in
		if (!event.locals.user) {
			return redirect(302, '/auth');
		}
		// update lifes
		await db
			.update(table.user)
			.set({
				lifes: sql`${table.user.lifes} - 1`
			})
			.where(eq(table.user.id, event.locals.user.id));

		//the the user has no lifes left l < 0 set the lifes to 0
		await db
			.update(table.user)
			.set({
				lifes: 0
			})
			.where(sql`${table.user.lifes} < 0`);

		//redirect to game
		return redirect(302, '/game');
	},
	disableTutorial: async (event) => {
		// check if user is logged in
		if (!event.locals.user) {
			return redirect(302, '/auth');
		}

		// update show tutorial
		await db
			.update(table.user)
			.set({
				showTutorial: false
			})
			.where(eq(table.user.id, event.locals.user.id));

		//redirect to game
		return redirect(302, '/game');
	},
	checkSentence: async (event) => {
		// Check if the user is logged in
		if (!event.locals.user) {
			return redirect(302, '/auth');
		}

		const formData = await event.request.formData();
		const gameId = formData.get('gameId') as string;
		const sentenceId = Number(parseInt(formData.get('sentenceId') as string));
		const userInputSentence = formData.get('userInputSentence') as string;

		// Retrieve the original sentences from the database
		const [game] = await db
			.select()
			.from(table.games)
			.where(and(eq(table.games.id, gameId), eq(table.games.userId, event.locals.user.id)));

		if (!game) {
			return redirect(302, '/game');
		}

		const originalSentences: { id: number; text: string }[] = JSON.parse(game.sentences);
		const originalSentenceObj = originalSentences.find((s) => s.id === sentenceId);

		if (!originalSentenceObj) {
			return redirect(302, '/game');
		}

		const originalSentence = originalSentenceObj.text;

		// Perform validation
		const amountOfMissingCommas = [...originalSentence.matchAll(/,/g)].filter(
			(match) => userInputSentence[match.index!] !== ','
		).length;

		const amountOfWrongCommas = [...userInputSentence.matchAll(/,/g)]
			.map((match) => match.index!)
			.reduce((count, index) => (originalSentence[index] !== ',' ? count + 1 : count), 0);

		const isCorrect = amountOfMissingCommas === 0 && amountOfWrongCommas === 0;

		//if not correct deduct a life
		if (!isCorrect) {
			await db
				.update(table.user)
				.set({
					lifes: sql`${table.user.lifes} - 1`
				})
				.where(eq(table.user.id, event.locals.user.id));

			//if the user has no lifes left l < 0 set the lifes to 0
			await db
				.update(table.user)
				.set({
					lifes: 0
				})
				.where(sql`${table.user.lifes} < 0`);
		}

		// Return the validation result
		return {
			isCorrect,
			sentenceId,
			amountOfMissingCommas,
			amountOfWrongCommas,
			feedbackHtml: feedbackHtml(originalSentence, userInputSentence),
			previousInput: userInputSentence
		};
	}
} satisfies Actions;

const feedbackHtml = (originalSentence: string, userInputSentence: string) => {
	const createCommaSpan = (color: string) =>
		`<span style="background-color: ${color}; padding: 1px 3px; border-radius: 9999px; margin: 0px 1px;">,</span>`;

	const wordGT = originalSentence.split(' ');
	const wordUI = userInputSentence.split(' ');

	const html = wordGT
		.map((gtWord, i) => {
			const uiWord = wordUI[i] || '';
			if (gtWord.includes(',') && uiWord.includes(',')) {
				return gtWord.replace(',', '') + createCommaSpan('#2dd4bf');
			} else if (gtWord.includes(',') && !uiWord.includes(',')) {
				return gtWord.replace(',', '') + createCommaSpan('#ef4444');
			} else {
				return gtWord;
			}
		})
		.join(' ');

	return `<p>${html}</p>`;
};

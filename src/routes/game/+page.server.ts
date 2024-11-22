import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq, sql } from 'drizzle-orm';

export const load = (async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/auth/login');
	}

	const [user] = await db.select().from(table.user).where(eq(table.user.id, event.locals.user.id));

	if (!user) {
		return redirect(302, '/auth/login');
	}

	return { user };
}) satisfies PageServerLoad;

export const actions = {
	finishGame: async (event) => {
		// check if user is logged in
		if (!event.locals.user) {
			return redirect(302, '/auth');
		}

		//get the user lives
		const [user] = await db
			.select()
			.from(table.user)
			.where(eq(table.user.id, event.locals.user.id));

		let userLifes = user.lifes;
		let mappedLifes = ((value, inMin, inMax, outMin, outMax) => {
			return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
		})(userLifes, 0, 10, 0.8, 2);

		let newXp = Math.floor((user.xp + 100) * mappedLifes);

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
	}
} satisfies Actions;

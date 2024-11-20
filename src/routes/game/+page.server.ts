import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq, sql } from 'drizzle-orm';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	finishGame: async (event) => {
        // check if user is logged in
		if (!event.locals.user) {
			return redirect(302, '/auth');
		}
        // update xp
		await db
			.update(table.user)
			.set({
				xp: sql`${table.user.xp} + 100`
			})
			.where(eq(table.user.id, event.locals.user.id));


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
	}
} satisfies Actions;

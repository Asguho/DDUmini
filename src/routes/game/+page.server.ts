import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	finishGame: async (event) => {
		if (!event.locals.user) {
			return redirect(302, '/auth');
		}
        
		const [{ xp }] = await db
			.select({ xp: table.user.xp })
			.from(table.user)
			.where(eq(table.user.id, event.locals.user.id));

		await db.update(table.user)
			.set({ xp: xp + 100 })
			.where(eq(table.user.id, event.locals.user.id));

        return redirect(302, '/game');
	}
} satisfies Actions;

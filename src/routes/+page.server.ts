import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq, sql, desc } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export const load = (async (event) => {
	if (!event.locals.user) {
		throw redirect(302, '/auth');
	}
	const [user] = await db.select().from(table.user).where(eq(table.user.id, event.locals.user.id));

	//get all useres and determine the rank of the user
	const users = await db.select().from(table.user).orderBy(desc(table.user.xp));
	let rank = 1;
	for (const u of users) {
		if (u.id === user.id) {
			break;
		}
		rank++;
	}

	return {
		user,
		rank,
		users
	};
}) satisfies PageServerLoad;

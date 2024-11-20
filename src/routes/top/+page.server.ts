import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq, sql } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export const load = (async (event) => {
	if (!event.locals.user) {
		throw redirect(302, '/auth');
	}
	//get all users and rank based of xp
	const users = await db.select().from(table.user).orderBy(table.user.xp);
	return { users };
}) satisfies PageServerLoad;

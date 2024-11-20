import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq, sql } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export const load = (async (event) => {
    if (!event.locals.user) {
        return redirect(302, '/auth');
    }
    const [user] = await db.select().from(table.user).where(eq(table.user.id, event.locals.user.id));
    return {
        user
    };
}) satisfies PageServerLoad;
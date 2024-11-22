import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';
import sharp from 'sharp';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/auth/login');
	}

	const [user] = await db.select().from(table.user).where(eq(table.user.id, event.locals.user.id));

	if (!user) {
		return redirect(302, '/auth/login');
	}

	return { user };
};

export const actions: Actions = {
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await auth.invalidateSession(event.locals.session.id);
		auth.deleteSessionTokenCookie(event);

		return redirect(302, '/auth/login');
	},
	uploadPfp: async (event) => {
		if (!event.locals.user) return fail(401);
		let formData = await event.request.formData();
		let pfp = formData.get('pfp') as File;
		if (!pfp) return fail(400);
		if (pfp.size === 0) return fail(400);

		let buffer = await pfp.arrayBuffer();
		//scale the image to 200x200
		let resizedBuffer = await sharp(buffer).resize(200, 200).png().toBuffer();
		let pfpB64 = resizedBuffer.toString('base64');

		//update the user's pfp
		await db.update(table.user).set({ pfpB64 }).where(eq(table.user.id, event.locals.user.id));

		return { pfpB64 };
	}
};

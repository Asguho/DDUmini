import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { db } from '$lib/server/db';


export const load = (async () => {

    return {

    };
}) satisfies PageServerLoad;

export const actions = {
	finishGame: async (event) => {
        if(!event.locals.user){
            return redirect(302, '/auth');
        }
        const formData = await event.request.formData();


	}
} satisfies Actions;
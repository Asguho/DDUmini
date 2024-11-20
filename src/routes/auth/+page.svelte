<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();

	console.log(data.user.activityHistory);
	let activityData = JSON.parse(data.user.activityHistory || '{}');
	console.log(activityData);
</script>

<div class="flex min-h-screen min-w-full flex-col items-center justify-center p-4">
	<h1 class="text-5xl font-bold text-teal-400">Profile</h1>
	<div class="mt-4 w-full max-w-md rounded-3xl border-4 border-gray-600 p-8">
		<h2 class="text-3xl font-bold">Hi, {data.user.username}!</h2>
		<p class="text-lg text-gray-600">User ID: {data.user.id}</p>
		<p class="text-lg text-gray-600">XP: {data.user.xp}</p>
		<div></div>
		<form method="post" action="?/logout" use:enhance class="mt-4">
			<button class="w-full rounded-lg bg-teal-400 p-2 text-2xl font-bold text-black"
				>Sign out</button
			>
		</form>
		<a href="/" class="mt-4 block text-center text-teal-400 underline">Go Back</a>
	</div>
</div>

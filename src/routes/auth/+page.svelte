<script lang="ts">
	import { enhance } from '$app/forms';
	import { convertObjectToArray } from '$lib/utils';
	import type { PageServerData } from './$types';
	let { data }: { data: PageServerData } = $props();

	let activityData = JSON.parse(data.user.activityHistory || '{}');
</script>

<svelte:head>
	<script
		type="module"
		src="https://cdn.jsdelivr.net/npm/@mariohamann/activity-graph/dist/activity-graph.min.js"
	></script>
</svelte:head>

<div class="flex min-h-screen min-w-full flex-col items-center justify-center p-4">
	<h1 class="*: w-fit text-5xl font-bold text-teal-400">Profile</h1>
	<div class="mt-4 flex flex-col items-center rounded-3xl border-4 border-gray-600 p-8">
		<h2 class="text-3xl font-bold">Hi, {data.user.username}!</h2>
		<div class="w-full">
			{#if data.user.pfpB64}
				<img
					src={'data:image/png;base64,' + data.user.pfpB64}
					alt=""
					class="aspect-video w-full rounded-3xl bg-cover object-cover"
				/>
			{/if}
			<div
				class="/10 my-3 flex w-full items-center justify-center rounded-3xl border-2 border-teal-700 bg-teal-950/10 py-5 text-sm *:text-center"
			>
				<form
					enctype="multipart/form-data"
					action="?/uploadPfp"
					method="post"
					use:enhance={() => {
						return async ({ update }) => {
							update();
						};
					}}
				>
					<input type="file" name="pfp" />
					<button
						type="submit"
						class="mt-3 block rounded-xl border-2 border-teal-400 p-2 px-4 text-teal-400"
					>
						Upload Profile Picture
					</button>
				</form>
			</div>
		</div>
		<p class="text-lg text-gray-600">User ID: {data.user.id}</p>
		<p class="text-lg text-gray-600">XP: {data.user.xp}</p>
		<div class="flex w-full justify-center">
			<activity-graph
				id="activity-graph"
				class="w-[700px] bg-[#1c2429]"
				range-start="2024-01-01"
				range-end="2024-12-31"
				activity-levels="0,1,2,3,5"
				activity-data={convertObjectToArray(activityData)}
			>
			</activity-graph>
		</div>
		<form method="post" action="?/logout" use:enhance class="mt-4">
			<button class="w-full rounded-lg bg-teal-400 p-2 text-2xl font-bold text-black"
				>Sign out</button
			>
		</form>
		<a href="/" class="mt-4 block text-center text-teal-400 underline">Go Back</a>
	</div>
</div>

<style>
	activity-graph {
		color: #fff;
		--activity-graph-text-color: #fff;
		--activity-graph-rounded: 999px;
		--activity-graph-level-0-bg: #161b22;
		--activity-graph-level-0-bg: rgb(24, 28, 32);
		--activity-graph-level-1-bg: rgba(13, 148, 136, 0.4);
		--activity-graph-level-2-bg: rgba(13, 148, 136, 0.6);
		--activity-graph-level-3-bg: rgba(13, 148, 136, 0.8);
		--activity-graph-level-4-bg: rgb(13, 148, 136);
	}
</style>

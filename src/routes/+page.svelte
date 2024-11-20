<script lang="ts">
	import type { User } from '$lib/server/db/schema';
	import { convertObjectToArray } from '$lib/utils';
	import type { PageServerData } from './$types';
	let { data }: { data: PageServerData } = $props();
	let user = $state(data.user);

	let activityData = JSON.parse(data.user.activityHistory || '{}');
	console.log(activityData);
</script>

<svelte:head>
	<script
		type="module"
		src="https://cdn.jsdelivr.net/npm/@mariohamann/activity-graph/dist/activity-graph.min.js"
	></script>
</svelte:head>

<main class="flex flex-col justify-between *:w-full *:p-8 xl:flex-row">
	<section class="border-gray-600 xl:border-r-4">
		<h1 class="text-8xl font-bold text-teal-400 2xl:text-9xl">Komma</h1>
		<ul class="mt-4 *:my-12 *:text-3xl *:font-bold">
			<li><a href="/game">Learn</a></li>
			<li><a href="/top">leaderboard</a></li>
			<li><a href="/auth">Profile</a></li>
		</ul>
	</section>
	<section>
		<div class=" *:mb-8">
			<img
				src="/img_avatar.png"
				alt=""
				class="aspect-video w-full rounded-3xl bg-cover object-cover"
			/>
			<div>
				<h1 class="text-5xl font-bold">{user.username}</h1>
				<h2 class="text-lg text-gray-600">
					{'@' + user.username.replace(' ', '').toLocaleLowerCase()}
				</h2>
			</div>

			<div class="flex justify-between text-lg *:w-full *:font-bold *:text-teal-400">
				<span class="">23 following</span>
				<span class="">23 followers</span>
			</div>
		</div>
		<div class=" border-t-4 border-gray-600 pt-8 *:mb-8">
			<div>
				<h1 class="text-5xl font-bold">Statistics</h1>
				<h2 class="text-lg text-gray-600">Games played this year</h2>
			</div>

			<div class="relative h-48 w-full overflow-hidden rounded-3xl bg-gray-600">
				<div class="absolute right-[0%] top-[50%] -translate-y-1/2">
					<activity-graph
						id="activity-graph"
						class="w-[700px] text-gray-600"
						range-start="2024-01-01"
						range-end="2024-12-31"
						activity-levels="0,1,2,3,5"
						activity-data={convertObjectToArray(activityData)}
					>
					</activity-graph>
				</div>
			</div>
		</div>
	</section>
	<section>
		<div class="*:my-4 *:text-2xl *:font-bold *:text-teal-400">
			<h2>9.999.999</h2>
			<h2>9.999.999</h2>
			<h2>9.999.999</h2>
		</div>

		<div class=" mt-8 rounded-3xl border-4 border-gray-600 p-8">
			<div class="flex justify-evenly *:text-2xl *:font-bold">
				<button class="">Followers</button>
				<button>Following</button>
			</div>
			<ul class="mt-4 *:my-2 *:text-lg *:text-gray-600">
				{#each Array(9)
					.fill(null)
					.map((_, i) => ({ id: i, name: `Follower ${i + 1}` })) as follower}
					<li class="">{follower.name}</li>
				{/each}
			</ul>
		</div>
	</section>
</main>

<style>
	activity-graph {
		color: #fff;
		--activity-graph-text-color: #fff;
		--activity-graph-rounded: 999px;
		--activity-graph-level-0-bg: #3f4853;
		--activity-graph-level-1-bg: rgba(13, 148, 136, 0.4);
		--activity-graph-level-2-bg: rgba(13, 148, 136, 0.6);
		--activity-graph-level-3-bg: rgba(13, 148, 136, 0.8);
		--activity-graph-level-4-bg: rgb(13, 148, 136);
	}
</style>

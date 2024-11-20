<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<main class="container mx-auto p-4">
	<h1 class="mb-4 text-4xl font-bold">Leaderboard</h1>
	<a href="/" class="mt-4 inline-block rounded bg-teal-500 px-4 py-2 text-white">Tilbage</a>
	<table class="min-w-full">
		<thead>
			<tr>
				<th class="border-b px-4 py-2">Rank</th>
				<th class="border-b px-4 py-2">Username</th>
				<th class="border-b px-4 py-2">XP</th>
			</tr>
		</thead>
		<tbody>
			{#each data.users as user, index}
				<tr class="text-center">
					<td class="border-b px-4 py-2">{index + 1}</td>
					<td class="border-b px-4 py-2">{user.username}</td>
					<td class="border-b px-4 py-2">{user.xp}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>

<style>
</style>

<script lang="ts">
	import type { User } from '$lib/server/db/schema';
	import { CircleUser, Trophy } from 'lucide-svelte';

	let { users } = $props();

	function leaderboardColorer(rank: number) {
		if (rank === 1) return 'bg-yellow-400/30';
		if (rank === 2) return 'bg-gray-400/30';
		if (rank === 3) return 'bg-yellow-800/30';
		return 'bg-gray-800';
	}
</script>

<h1 class="text-center font-feather text-2xl text-teal-400">Current Top 10</h1>
<table class="mt-4 min-w-full border-t-2">
	<thead>
		<tr>
			<th class="border-b px-4 py-2"><span class="sr-only">Profile picture</span></th>
			<th class="border-b px-4 py-2">Rank</th>
			<th class="border-b px-4 py-2">Username</th>
			<th class="border-b px-4 py-2">XP</th>
		</tr>
	</thead>
	<tbody>
		{#each users as user, index}
			{#if index < 10}
				<tr class={'text-center ' + leaderboardColorer(index + 1)}>
					<td class="border-b px-4 py-2">
						{#if user.pfpB64}
							<img
								src={'data:image/png;base64,' + user.pfpB64}
								alt=""
								class="h-8 w-8 rounded-full"
							/>
						{:else}
							<CircleUser class="h-8 w-8 opacity-50" />
						{/if}
					</td>
					<td class="border-b px-4 py-2">
						<div class="flex items-center justify-center gap-2">
							{#if index < 3}
								<Trophy class="h-5 w-5" />
								<!-- content here -->
							{/if}
							<span>{index + 1}</span>
						</div>
					</td>
					<td class="border-b px-4 py-2">{user.username}</td>
					<td class="border-b px-4 py-2">{user.xp}</td>
				</tr>
				<!-- content here -->
			{/if}
		{/each}
	</tbody>
</table>

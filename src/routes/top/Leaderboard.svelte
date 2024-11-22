<script lang="ts">
	import type { User } from '$lib/server/db/schema';

	let { users } = $props();
</script>

<table class="min-w-full">
	<thead>
		<tr>
			<th class="border-b px-4 py-2">Rank</th>
			<th class="border-b px-4 py-2">Username</th>
			<th class="border-b px-4 py-2">XP</th>
		</tr>
	</thead>
	<tbody>
		{#each users as user, index}
			<tr class="text-center">
				<td class="border-b px-4 py-2">{index + 1}</td>
				<td class="border-b px-4 py-2">{user.username}</td>
				<td class="border-b px-4 py-2">{user.xp}</td>
			</tr>
		{/each}
	</tbody>
</table>

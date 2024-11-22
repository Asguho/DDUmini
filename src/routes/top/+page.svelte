<script lang="ts">
	import Leaderboard from './Leaderboard.svelte';

	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<main class="container mx-auto p-4">
	<h1 class="mb-4 text-4xl font-bold">Leaderboard</h1>
	<a href="/" class="mt-4 inline-block rounded bg-teal-500 px-4 py-2 text-white">Tilbage</a>
	<Leaderboard users={data.users}></Leaderboard>
</main>

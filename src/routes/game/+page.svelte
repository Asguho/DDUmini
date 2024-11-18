<script lang="ts">
	import type { Sentence } from '$lib/types';
	import { getSentence } from '$lib/utils';
	import { flip } from 'svelte/animate';
	import SentenceRenderer from './SentenceRenderer.svelte';
	import { fade } from 'svelte/transition';

	let sentencesToSolve: Sentence[] = $state([]);
	let amount = 5;
	for (let i = 0; i < amount; i++) {
		sentencesToSolve.push({
			id: i,
			text: getSentence(),
			isSolved: false,
			totalAmountsOfIdsInSet: amount
		});
	}
</script>

<header class="absolute flex w-full flex-col items-center font-serif">
	<h1 class="m-3 mx-5 rounded-full bg-teal-500 p-3 px-5 text-5xl font-bold italic tracking-wider">
		Komma regler
	</h1>
	<div class="block h-0.5 w-full bg-black"></div>
</header>

<section class="flex min-h-screen w-full flex-col items-center font-serif *:w-full">
	{#each sentencesToSolve as sentence (sentence.id)}
		<div animate:flip={{ duration: 300 }} in:fade out:fade>
			<SentenceRenderer {sentence} />
		</div>
	{/each}
</section>

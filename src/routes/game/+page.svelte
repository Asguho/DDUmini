<script lang="ts">
	import type { Sentence } from '$lib/types';
	import { getSentence } from '$lib/utils';
	import { flip } from 'svelte/animate';
	import SentenceRenderer from './SentenceRenderer.svelte';
	import { fade } from 'svelte/transition';

	let sentencesToSolve: Sentence[] = $state([]);
	let amount = 5;
	newSentences();

	function newSentences() {
		sentencesToSolve = [];
		for (let i = 0; i < amount; i++) {
			sentencesToSolve.push({
				id: i,
				text: getSentence(),
				isSolved: false,
				totalAmountsOfIdsInSet: amount
			});
		}
	}

	let allSentencesSolved = $derived(sentencesToSolve.every((sentence) => sentence.isSolved));
</script>

<header class="absolute flex w-full flex-col items-center font-serif">
	<h1 class="m-3 mx-5 rounded-full bg-teal-500 p-3 px-5 text-5xl font-bold italic tracking-wider">
		Komma regler
	</h1>
	<div class="block h-0.5 w-full bg-black"></div>
</header>

<section class="flex min-h-screen flex-row items-center overflow-x-clip pt-44 font-serif">
	{#if !allSentencesSolved}
		{#each sentencesToSolve.filter((sentence) => !sentence.isSolved) as sentence (sentence.id)}
			<div
				class="min-w-full"
				animate:flip={{ duration: 500, delay: 1000 }}
				in:fade
				out:fade={{ delay: 1000, duration: 500 }}
			>
				<SentenceRenderer {sentence} />
			</div>
		{/each}
	{:else}
		<div class="w-full text-center">
			<h1 class="mb-6 text-2xl font-bold">Tillykke! Du har løst alle opgaverne</h1>
			<button
				onclick={newSentences}
				class="rounded-xl border-2 border-teal-900 bg-teal-200 p-4 text-2xl"
			>
				Nye opgaver
			</button>
		</div>
	{/if}
</section>

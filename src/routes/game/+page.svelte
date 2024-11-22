<script lang="ts">
	import type { Sentence } from '$lib/types';
	import { getSentence } from '$lib/utils';
	import { flip } from 'svelte/animate';
	import SentenceRenderer from './SentenceRenderer.svelte';
	import { fade } from 'svelte/transition';
	import { ArrowBigLeft, Heart } from 'lucide-svelte';
	import { enhance } from '$app/forms';

	import type { PageServerData } from './$types';
	import { goto } from '$app/navigation';
	let { data }: { data: PageServerData } = $props();

	let sentencesToSolve: Sentence[] = $state([]);
	const AMOUNT = 5;
	newSentences();

	function newSentences() {
		sentencesToSolve = [];
		for (let i = 0; i < AMOUNT; i++) {
			sentencesToSolve.push({
				id: i,
				text: getSentence(),
				isSolved: false,
				totalAmountsOfIdsInSet: AMOUNT
			});
		}
	}

	let allSentencesSolved = $derived(sentencesToSolve.every((sentence) => sentence.isSolved));
</script>

<header class=" absolute flex w-full flex-col items-center px-3 py-4">
	<div class="container mx-auto flex w-full flex-row items-center justify-between gap-10">
		<div class="flex flex-row items-center justify-start gap-5">
			<h1 class="text-6xl font-bold text-teal-400 2xl:text-8xl">Komma</h1>
		</div>
		<div class="flex w-full flex-row items-center justify-start gap-5">
			<a href="/">
				<ArrowBigLeft class="size-7 opacity-50" />
			</a>
			<progress
				class="w-full rounded-full"
				value={sentencesToSolve.filter((sentence) => sentence.isSolved).length}
				max={sentencesToSolve.length}
			></progress>
		</div>
		<div class="flex flex-row items-center justify-start gap-5">
			<span class="text-2xl text-red-400">{data.user.lifes}</span>
			<Heart class="size-7 text-red-400" />
		</div>
	</div>
	<div class="max-w-2xl rounded-2xl border-2 border-white p-3">
		Tutorial: indtast manglende kommaer i sætningen herunder, når alle kommaerne er korrekte, er
		opgaven løst, og du vil automatisk gå videre til næste opgave. Når alle opgaver er løst vil du
		modtage XP efter hvor liv du har tilbage såvel som 3 liv. Du mister liv ved at trykke på "Vis
		Svar" knappen.
		<button class="mt-3 block rounded-xl border-2 border-white p-2 px-4"> ok! </button>
	</div>
</header>

<section class="flex min-h-screen flex-row items-center overflow-x-clip font-serif">
	{#if !allSentencesSolved}
		{#each sentencesToSolve.filter((sentence) => !sentence.isSolved) as sentence (sentence.id)}
			<div
				class="min-w-full"
				animate:flip={{ duration: 500, delay: 1000 }}
				in:fade
				out:fade={{ delay: 1000, duration: 500 }}
			>
				<SentenceRenderer {sentence} user={data.user} />
			</div>
		{/each}
	{:else}
		<div class="w-full text-center">
			<h1 class="mb-6 font-feather text-2xl font-bold">Tillykke! Du har løst alle opgaverne</h1>
			<div class="flex w-full flex-row justify-center gap-4">
				<form
					action="?/finishGame"
					method="post"
					use:enhance={() => {
						return async ({ update }) => {
							newSentences();
							update();
						};
					}}
				>
					<button
						type="submit"
						class="rounded-xl border-2 border-teal-900 bg-teal-200 p-4 font-feather text-2xl text-black"
					>
						Nye opgaver
					</button>
				</form>
				<form
					action="?/finishGame"
					method="post"
					use:enhance={() => {
						return async ({ update }) => {
							update();
							goto('/');
						};
					}}
				>
					<button
						type="submit"
						class="rounded-xl border-2 border-teal-900 bg-teal-200 p-4 font-feather text-2xl text-black"
					>
						Færdig
					</button>
				</form>
			</div>
		</div>
	{/if}
</section>

<style>
	progress {
		border: 2px solid rgb(255, 255, 255);
		width: 100%;
		height: 25px;
		overflow: hidden;
	}
	progress::-webkit-progress-bar {
		background-color: rgba(185, 255, 198, 0.279);
	}
	progress::-webkit-progress-value {
		background-color: #04af2f;
		/* big bounce */
		transition: width 2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
	}
</style>

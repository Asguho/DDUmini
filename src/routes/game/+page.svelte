<script lang="ts">
	import type { Sentence } from '$lib/types';
	import { getSentence } from '$lib/utils';
	import { flip } from 'svelte/animate';
	import SentenceRenderer from './SentenceRenderer.svelte';
	import { fade } from 'svelte/transition';
	import { ArrowBigLeft, Heart } from 'lucide-svelte';
	import { enhance } from '$app/forms';

	import type { PageData, ActionData } from './$types';

	import { goto, invalidateAll } from '$app/navigation';
	let { data, form }: { data: PageData; form: ActionData } = $props();

	console.log(data);

	let gameId = data.gameId;

	let sentencesToSolve: Sentence[] = $state(
		data.sentences.map((sentence) => ({
			id: sentence.id,
			text: sentence.text,
			isSolved: false,
			totalAmountsOfIdsInSet: data.sentences.length
		}))
	);

	let newButtonElement: any;
	let finishedButtonElement: any;

	let allSentencesSolved = $derived(sentencesToSolve.every((sentence) => sentence.isSolved));

	function returnFormForIndex(index: number) {
		if (form && form.sentenceId === index) {
			return form;
		} else {
			return null;
		}
	}
</script>

<header class=" absolute flex w-full flex-col items-center px-3 py-4">
	<div class="container mx-auto flex w-full max-w-6xl flex-row items-center justify-between gap-10">
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
		<div class="relative flex flex-row items-center justify-start gap-5">
			<div class="absolute z-0 h-8 w-14 animate-ping bg-red-900/20 blur-md"></div>
			<span class="z-10 text-2xl text-red-400">{data.user.lifes}</span>
			<Heart class="z-10 size-7 text-red-400" />
		</div>
		<div class="relative flex flex-row items-baseline justify-start gap-2">
			<span class="z-10 text-2xl text-teal-400">{data.user.xp}</span>
			<span class="z-10 size-7 font-feather text-2xl font-extrabold italic text-teal-400">XP</span>
		</div>
	</div>
	{#if data.user.showTutorial}
		<div class="max-w-2xl rounded-2xl border-2 border-white p-3">
			Tutorial: Indtast de manglende kommaer i sætningen herunder. Når alle kommaerne er korrekte,
			er opgaven løst. bemærk at du IKKE vil blive automatisk viresendt, tryk på tjek svar knappen!!
			Når alle opgaver er løst, vil du modtage XP baseret på, hvor mange liv du har tilbage, samt 3
			nye liv. Du mister liv ved at svare forkert. Du kan altid se dine liv og XP i øverste højre
			hjørne. (27/11/2024) - Vi har lavet anti-cheat systemer, så derfor ser du denne besked igen.
			<form
				action="?/disableTutorial"
				method="post"
				use:enhance={() => {
					return async ({ update }) => {
						update();
					};
				}}
			>
				<button
					type="submit"
					class="mt-3 block rounded-xl border-2 border-teal-400 p-2 px-4 text-teal-400"
				>
					Ok!
				</button>
			</form>
		</div>
	{/if}
</header>

<section class="flex min-h-screen flex-row items-center overflow-x-clip font-serif">
	{#if !data.user.showTutorial}
		{#if !allSentencesSolved}
			{#each sentencesToSolve.filter((sentence) => !sentence.isSolved) as sentence (sentence.id)}
				<div
					class="min-w-full"
					animate:flip={{ duration: 500, delay: 1000 }}
					in:fade
					out:fade={{ delay: 1000, duration: 500 }}
				>
					<SentenceRenderer
						{sentence}
						user={data.user}
						{gameId}
						form={returnFormForIndex(sentence.id)}
					/>
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
							finishedButtonElement.disabled = true;
							return async ({ update }) => {
								await update();
								goto('/newGame');
							};
						}}
					>
						<input type="hidden" name="gameId" value={gameId} />
						<button
							type="submit"
							bind:this={finishedButtonElement}
							class="rounded-xl border-2 border-teal-900 bg-teal-200 p-4 font-feather text-2xl text-black"
						>
							Nye opgaver
						</button>
					</form>
					<form
						action="?/finishGame"
						method="post"
						use:enhance={() => {
							newButtonElement.disabled = true;
							return async ({ update }) => {
								await update();
								goto('/');
							};
						}}
					>
						<input type="hidden" name="gameId" value={gameId} />
						<button
							type="submit"
							bind:this={newButtonElement}
							class="rounded-xl border-2 border-teal-900 bg-teal-200 p-4 font-feather text-2xl text-black"
						>
							Færdig
						</button>
					</form>
				</div>
			</div>
		{/if}
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

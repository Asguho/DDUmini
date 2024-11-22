<script lang="ts">
	import type { Sentence } from '$lib/types';
	import { confetti } from '@neoconfetti/svelte';

	let { sentence, user }: { sentence: Sentence; user: User } = $props();

	import { enhance } from '$app/forms';
	import type { User } from '$lib/server/db/schema';
	const originalSentence = $derived(sentence.text);
	let userInputSentence = $state(sentence.text.replace(/,/g, ''));
	let checkSentence = $state(false);
	let lastInput = $state(sentence.text.replace(/,/g, ''));

	const amountOfMissingCommas = $derived(
		[...originalSentence.matchAll(/,/g)].filter((match) => userInputSentence[match.index] !== ',')
			.length
	);
	const amountOfWrongCommas = $derived(
		[...userInputSentence.matchAll(/,/g)]
			.map((match) => match.index)
			.reduce((count, index) => (originalSentence[index] !== ',' ? count + 1 : count), 0)
	);

	const feedbackHtml = $derived.by(() => {
		const createCommaSpan = (color: string) =>
			`<span style="background-color: ${color}; padding: 1px 3px; border-radius: 9999px; margin: 0px 1px;">,</span>`;

		const wordGT = originalSentence.split(' ');
		const wordUI = userInputSentence.split(' ');

		const html = wordGT
			.map((gtWord, i) => {
				const uiWord = wordUI[i] || '';
				if (gtWord.includes(',') && uiWord.includes(',')) {
					return gtWord.replace(',', '') + createCommaSpan('#2dd4bf');
				} else if (gtWord.includes(',') && !uiWord.includes(',')) {
					return gtWord.replace(',', '') + createCommaSpan('#ef4444');
				} else {
					return gtWord;
				}
			})
			.join(' ');

		return `<p>${html}</p>`;
	});

	const isCorrect = $derived(amountOfMissingCommas == 0 && amountOfWrongCommas == 0);

	$effect(() => {
		sentence.isSolved = isCorrect;
	});
</script>

<div class="flex h-fit w-full flex-col items-center justify-center">
	{#if isCorrect}
		<h2 class="font-feather text-2xl font-bold">
			Opgave {sentence.id + 1}/{sentence.totalAmountsOfIdsInSet} løst
		</h2>
		<div use:confetti={{ particleCount: 100, force: 0.1 }}></div>
	{:else}
		<h2 class="mb-3 w-full max-w-2xl text-left font-feather text-2xl">Indsæt manglende kommaer</h2>
		<textarea
			class="flex h-32 w-full max-w-2xl resize-none rounded-xl border-2 border-teal-300 bg-[#2e3a42] text-xl"
			bind:value={userInputSentence}
			oninput={() => {
				userInputSentence.replace(/,/g, '') == lastInput.replace(/,/g, '')
					? (lastInput = userInputSentence)
					: (userInputSentence = lastInput);
			}}
		></textarea>
		{#if checkSentence}
			<p class={amountOfMissingCommas != 0 ? 'text-red-400' : 'text-teal-400'}>
				Der mangler {amountOfMissingCommas} kommaer
			</p>
			<p class={amountOfWrongCommas != 0 ? 'text-red-400' : 'text-teal-400'}>
				Der er {amountOfWrongCommas} forkerte kommaer
			</p>
			{@html feedbackHtml}
		{:else if user.lifes > 0}
			<!-- content here -->
			<div class="mt-10 flex w-full max-w-2xl flex-row justify-between font-feather">
				<form
					action="?/deductLife"
					method="post"
					use:enhance={() => {
						return ({ update }) => {
							checkSentence = true;
							update();
						};
					}}
				>
					<button
						type="submit"
						class="rounded-xl bg-[#11161a] p-3 text-white opacity-10 transition-all duration-100 hover:opacity-50"
					>
						Vis Svar
					</button>
				</form>
			</div>
		{:else}
			<p class="text-red-400">Du har ikke flere liv</p>
		{/if}
	{/if}
</div>

<script lang="ts">
	import type { Sentence } from '$lib/types';
	import { confetti } from '@neoconfetti/svelte';

	let { sentence }: { sentence: Sentence } = $props();
	const originalSentence = $derived(sentence.text);
	let userInputSentence = $state(sentence.text.replace(/,/g, ''));
	let checkSentence = $state(false);
	let lastInput = userInputSentence;

	const amountOfMissingCommas = $derived(
		[...originalSentence.matchAll(/,/g)].filter((match) => userInputSentence[match.index] !== ',')
			.length
	);
	const amountOfWrongCommas = $derived(
		[...userInputSentence.matchAll(/,/g)]
			.map((match) => match.index)
			.reduce((count, index) => (originalSentence[index] !== ',' ? count + 1 : count), 0)
	);

	const feedbackHtml = $derived(() => {
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
		<h2 class="text-xl font-bold">
			Opgave {sentence.id + 1}/{sentence.totalAmountsOfIdsInSet} løst
		</h2>
		<div use:confetti={{ particleCount: 200, force: 0.3 }}></div>
	{:else}
		<h2>Set komma i sætningen under:</h2>
		<textarea
			class="flex h-32 w-full max-w-2xl resize-none rounded-xl border-2 border-teal-300 bg-[#2e3a42]"
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
		{:else}
			<button
				class="mt-5 rounded-xl bg-teal-500 p-3 text-white"
				onclick={() => (checkSentence = true)}
			>
				Vis Svar
			</button>
		{/if}
	{/if}
</div>

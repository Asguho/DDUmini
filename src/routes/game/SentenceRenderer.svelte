<script lang="ts">
	import type { Sentence } from '$lib/types';
	import {
		cleanCommas,
		getSentence,
		getAmountOfMissingCommas,
		getAmountOfWrongCommas,
		generateFeedbackHtml
	} from '$lib/utils';

	let { sentence }: { sentence: Sentence } = $props();
	const originalSentence = $state(sentence.text);
	let userInputSentence = $state(cleanCommas(originalSentence));
	let amountOfMissingCommas = $derived(
		getAmountOfMissingCommas(originalSentence, userInputSentence)
	);
	let amountOfWrongCommas = $derived(getAmountOfWrongCommas(originalSentence, userInputSentence));

	let feedbackHtml = $derived(generateFeedbackHtml(originalSentence, userInputSentence));

	let checkSentence = $state(false);

	// svelte-ignore state_referenced_locally
	let lastInput = userInputSentence;

	let isCorrect = $derived(amountOfMissingCommas == 0 && amountOfWrongCommas == 0);

	$effect(() => {
		sentence.isSolved = isCorrect;
	});
</script>

<div class="flex h-fit w-full flex-col items-center justify-center">
	{#if isCorrect}
		<h2>Opgave {sentence.id + 1}/{sentence.totalAmountsOfIdsInSet} løst</h2>
	{:else}
		<h2>Set komma i sætningen under:</h2>
		<textarea
			class="flex h-32 w-full max-w-2xl resize-none rounded-xl border-2 border-teal-300 bg-teal-50"
			bind:value={userInputSentence}
			oninput={() => {
				userInputSentence.replace(/,/g, '') == lastInput.replace(/,/g, '')
					? (lastInput = userInputSentence)
					: (userInputSentence = lastInput);
			}}
		></textarea>
		{#if checkSentence}
			<!-- content here -->
			<p class={amountOfMissingCommas != 0 ? 'text-red-500' : 'text-teal-800'}>
				Der mangler {amountOfMissingCommas} kommaer
			</p>
			<p class={amountOfWrongCommas != 0 ? 'text-red-500' : 'text-teal-800'}>
				Der er {amountOfWrongCommas} forkerte kommaer
			</p>

			{@html feedbackHtml}
		{:else}
			<!-- else content here -->
			<button
				class="mt-5 rounded-xl bg-teal-500 p-3 text-white"
				onclick={() => (checkSentence = true)}
			>
				Tjek sætning</button
			>
		{/if}
	{/if}
</div>

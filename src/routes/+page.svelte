<script lang="ts">
	import {
		cleanCommas,
		getSentence,
		getAmountOfMissingCommas,
		getAmountOfWrongCommas,
		generateFeedbackHtml
	} from '$lib/utils';
	const originalSentence = getSentence();
	let userInputSentence = $state(cleanCommas(originalSentence));
	let amountOfMissingCommas = $derived(
		getAmountOfMissingCommas(originalSentence, userInputSentence)
	);
	let amountOfWrongCommas = $derived(getAmountOfWrongCommas(originalSentence, userInputSentence));

	let feedbackHtml = $derived(generateFeedbackHtml(originalSentence, userInputSentence));

	let checkSentence = $state(false);
</script>

<header class="absolute flex w-full flex-col items-center font-serif">
	<h1 class="m-3 mx-5 rounded-full bg-teal-500 p-3 px-5 text-5xl font-bold italic tracking-wider">
		Komma regler
	</h1>
	<div class="block h-0.5 w-full bg-black"></div>
</header>

<section class="flex min-h-screen flex-col items-center font-serif">
	<div class="flex h-screen w-full flex-col items-center justify-center">
		<h2>Set komma i sætningen under:</h2>
		<textarea
			class="flex h-32 w-full max-w-2xl resize-none rounded-xl border-2 border-teal-300 bg-teal-50"
			bind:value={userInputSentence}
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
	</div>
</section>

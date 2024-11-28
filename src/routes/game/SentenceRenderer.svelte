<script lang="ts">
	import type { Sentence } from '$lib/types';
	import { confetti } from '@neoconfetti/svelte';

	import type { ActionData } from './$types';

	let showConfetti = $state(false);

	let {
		sentence,
		user,
		gameId,
		form,
		userinputedSentences
	}: {
		sentence: Sentence;
		user: User;
		gameId: string;
		form: ActionData;
		userinputedSentences: Sentence[];
	} = $props();

	import { enhance } from '$app/forms';
	import type { User } from '$lib/server/db/schema';
	const originalSentence = $derived(sentence.text);
	let userInputSentence = $state(sentence.text);
	let lastInput = $state(sentence.text.replace(/,/g, ''));

	$effect(() => {
		if (form) {
			console.log(sentence);
			userInputSentence = form.previousInput;
			console.log('form', form);
			if (form.sentenceId !== sentence.id) {
				return;
			}
			console.log(form);
			if (form.isCorrect) {
				console.log('isCorrect');
				showConfetti = true;

				//se the userinputedSentences to the new value at the correct index
				userinputedSentences[sentence.id] = {
					id: sentence.id,
					text: form.previousInput,
					isSolved: true,
					totalAmountsOfIdsInSet: userinputedSentences.length
				};

				//wait for 2 seconds
				setTimeout(() => {
					sentence.isSolved = true;
				}, 1000);
			}
		}
	});
</script>

<div class="flex h-fit w-full flex-col items-center justify-center font-sans">
	{#if showConfetti}
		<h2 class="font-feather text-2xl font-bold">
			Opgave {sentence.id + 1}/{sentence.totalAmountsOfIdsInSet} løst
		</h2>
		<div use:confetti={{ particleCount: 100, force: 0.1 }}></div>
	{:else}
		<h2 class="mb-3 w-full max-w-2xl text-left font-feather text-2xl">Indsæt manglende kommaer</h2>
		<!-- svelte-ignore event_directive_deprecated -->
		<form
			action="?/checkSentence"
			class="w-full max-w-2xl"
			method="post"
			use:enhance={() => {
				return async ({ update, formData }) => {
					await update();
				};
			}}
		>
			<textarea
				name="userInputSentence"
				id="userInputSentence"
				class="h-32 w-full resize-none rounded-xl border-2 border-teal-300 bg-[#2e3a42] text-xl"
				bind:value={userInputSentence}
				oninput={() => {
					userInputSentence.replace(/,/g, '') == lastInput.replace(/,/g, '')
						? (lastInput = userInputSentence)
						: (userInputSentence = lastInput);
				}}
			></textarea>
			<input type="hidden" name="sentenceId" value={sentence.id} />
			<input type="hidden" name="gameId" value={gameId} />
			<input type="hidden" name="originalSentence" value={originalSentence} />
			<div class="mt-4 flex justify-end">
				<button
					type="submit"
					class="rounded-xl border-2 border-teal-400 bg-[#222b33] p-3 text-white transition-all duration-100 hover:bg-teal-400 hover:text-black"
				>
					{#if form}
						Tjek Sætning / Næste
					{:else}
						Tjek Sætning
					{/if}
				</button>
			</div>
		</form>
		{#if form}
			{#if form.amountOfMissingCommas !== 0 || form.amountOfWrongCommas !== 0}
				<!-- content here -->
				{#if user.lifes > 0}
					<!-- content here -->
					<div class="mt-4 w-full max-w-2xl">
						<p>Ikke rigtigt</p>
						<p class={form.amountOfMissingCommas !== 0 ? 'text-red-400' : 'text-teal-400'}>
							Der mangler {form.amountOfMissingCommas} kommaer
						</p>
						<p class={form.amountOfWrongCommas !== 0 ? 'text-red-400' : 'text-teal-400'}>
							Der er {form.amountOfWrongCommas} forkerte kommaer
						</p>
						{@html form.feedbackHtml}
					</div>
				{:else}
					<!-- else content here -->
					<div class="mt-4 w-full max-w-2xl">
						<p>Ikke rigtigt</p>
						<p>
							Du har ikke flere liv tilbage, så du kan ikke se din feedback, men du kan prøve igen
						</p>
					</div>
				{/if}
			{/if}
		{/if}
	{/if}
</div>

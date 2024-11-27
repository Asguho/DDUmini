<script lang="ts">
	import { goto } from '$app/navigation';

	$effect(() => {
		console.log('newGame');
		//wait for 2 seconds
		setTimeout(() => {
			goto('/game');
		}, 100);
	});
</script>

<a href="/">tilbage</a>

<p>Vent mens vi indlæser spillet...</p>

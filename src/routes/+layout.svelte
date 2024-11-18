<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="font-feather min-h-screen bg-[#1c2429] text-white">
	{@render children()}
</div>

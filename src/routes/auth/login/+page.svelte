<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div class="flex min-h-screen min-w-full flex-col content-center items-center justify-center *:m-4">
	<h1>Login/Register</h1>

	<form method="post" action="?/login" class="flex flex-col" use:enhance>
		<div class="my-2 flex flex-col *:my-2">
			<label>
				Username
				<input name="username" class=" w-64 bg-[#2e3a42]" />
			</label>
			<label>
				Password
				<input type="password" name="password" class="w-64 bg-[#2e3a42]" />
			</label>
		</div>
		<div class="  flex justify-between *:rounded-lg *:bg-teal-400 *:p-2">
			<button class="">Login</button>
			<button formaction="?/register">Register</button>
		</div>
	</form>
	<p style="color: red">{form?.message ?? ''}</p>
</div>

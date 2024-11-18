<script>
	const user = {
		username: 'John Doe',
		tag: '@johndoe'
	};
</script>

<main
	class="flex min-h-screen flex-col justify-between bg-[#1c2429] text-white *:w-full *:p-8 md:flex-row"
>
	<section class="border-r-4 border-gray-600">
		<h1 class="text-9xl font-bold text-teal-400">Komma</h1>
		<ul class="mt-4 *:my-12 *:text-3xl *:font-bold">
			<li>Learn</li>
			<li>Practice</li>
			<li>leaderboard</li>
			<li>Quests</li>
			<li>Profile</li>
		</ul>
	</section>
	<section>
		<div class=" *:mb-8">
			<img
				src="/img_avatar.png"
				alt=""
				class="aspect-video w-full rounded-3xl bg-cover object-cover"
			/>
			<div>
				<h1 class="text-5xl font-bold">{user.username}</h1>
				<h2 class="text-lg text-gray-600">{user.tag}</h2>
			</div>

			<div class="flex justify-between text-lg *:w-full *:font-bold *:text-teal-400">
				<span class="">23 following</span>
				<span class="">23 followers</span>
			</div>
		</div>
		<div class=" border-t-4 border-gray-600 pt-8 *:mb-8">
			<div>
				<h1 class="text-5xl font-bold">Statistiks</h1>
				<h2 class="text-lg text-gray-600">Games played this year</h2>
			</div>

			<div class=" aspect-video w-full rounded-3xl bg-gray-600"></div>
		</div>
	</section>
	<section>
		<div class="*:my-4 *:text-2xl *:font-bold *:text-teal-400">
			<h2>9.999.999</h2>
			<h2>9.999.999</h2>
			<h2>9.999.999</h2>
		</div>

		<div class=" mt-8 rounded-3xl border-4 border-gray-600 p-8">
			<div class="flex justify-evenly *:text-2xl *:font-bold">
				<button class="">Followers</button>
				<button>Following</button>
			</div>
			<ul class="mt-4 *:my-2 *:text-lg *:text-gray-600">
				{#each Array(10)
					.fill()
					.map((_, i) => ({ id: i, name: `Follower ${i + 1}` })) as follower}
					<li class="">{follower.name}</li>
				{/each}
			</ul>
		</div>
	</section>
</main>

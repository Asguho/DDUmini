<script>
	const user = {
		username: 'John Doe',
		tag: '@johndoe'
	};
</script>

<main class="flex flex-col items-center justify-between *:m-4 *:w-full md:flex-row">
	<section class="border-r-4">
		<h1 class="text-7xl font-bold text-teal-500">Komma</h1>
		<ul class="*:text-2xl *:font-bold">
			<li>Learn</li>
			<li>Practice</li>
			<li>leaderboard</li>
			<li>Quests</li>
			<li>Profile</li>
		</ul>
	</section>
	<section>
		<div>
			<img src="" alt="" />
			<div>
				<h1 class="text-5xl font-bold">{user.username}</h1>
				<h2>{user.tag}</h2>
			</div>

			<div>
				<span class="text-teal-500">23 following</span>
				<span class="text-teal-500">23 followers</span>
			</div>
		</div>
		<div>
			<h1>Statistiks</h1>
			<h2>Games played this year</h2>
			<div class=""></div>
		</div>
	</section>
	<section>
		<h2 class="text-teal-500">999</h2>
		<h2 class="text-teal-500">999</h2>
		<h2 class="text-teal-500">999</h2>
		<div>
			<h2>Followers</h2>
			<h2>following</h2>
		</div>
	</section>
</main>

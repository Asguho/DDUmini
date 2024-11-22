<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section class=" container mx-auto max-w-2xl pt-32">
	<a class="rounded bg-teal-400 px-4 py-2 text-black" href="/">Tilbage</a>
</section>

<main class="container prose prose-invert mx-auto max-w-2xl pt-10">
	<h1>Danske Kommaregler</h1>

	<h2>Regel 1: Komma ved sideordnede sætninger</h2>
	<p>
		<strong
			>Når to hovedsætninger er forbundet med bindeord som <em>og</em>, <em>eller</em>,
			<em>men</em>, skal der sættes komma.</strong
		>
	</p>
	<p><strong>Eksempel:</strong></p>
	<ul>
		<li>Jeg gik en tur, og solen skinnede.</li>
		<li>Han ville ringe, men han glemte det.</li>
	</ul>
	<hr />

	<h2>Regel 2: Komma ved ledsætninger</h2>
	<p><strong>En ledsætning skal adskilles fra hovedsætningen med komma.</strong></p>
	<p><strong>Eksempel:</strong></p>
	<ul>
		<li>Jeg ved, at han kommer i morgen.</li>
		<li>De sagde, at de ville hjælpe os, når vi havde brug for det.</li>
	</ul>
	<hr />

	<h2>Regel 3: Startende ledsætning</h2>
	<p>
		<strong
			>Når en ledsætning står først, skal der være komma mellem ledsætningen og hovedsætningen.</strong
		>
	</p>
	<p><strong>Eksempel:</strong></p>
	<ul>
		<li>Hvis det regner, tager vi paraplyer med.</li>
		<li>Når jeg bliver 18, vil jeg tage kørekort.</li>
	</ul>
	<hr />

	<h2>Regel 4: Indskudte sætninger</h2>
	<p><strong>Indskudte sætninger skal omgives af kommaer.</strong></p>
	<p><strong>Eksempel:</strong></p>
	<ul>
		<li>Peter, som altid kommer for sent, blev forsinket igen.</li>
		<li>Huset, der blev bygget i 1800-tallet, er nu fredet.</li>
	</ul>
	<hr />

	<h2>Regel 5: Komma ved opremsninger</h2>
	<p>
		<strong
			>I opremsninger skal der være komma mellem de enkelte led, dog ikke før <em>og</em> eller
			<em>eller</em>.</strong
		>
	</p>
	<p><strong>Eksempel:</strong></p>
	<ul>
		<li>Jeg købte æbler, pærer, bananer og vindruer.</li>
		<li>Hun elsker at danse, synge og spille guitar.</li>
	</ul>
	<hr />

	<h2>Regel 6: Komma ved parentetiske indskud</h2>
	<p><strong>Parentetiske bemærkninger eller tilføjelser skal adskilles med komma.</strong></p>
	<p><strong>Eksempel:</strong></p>
	<ul>
		<li>Hunden, en stor schæfer, gøede højt.</li>
		<li>Jeg må indrømme, til alles overraskelse, at jeg ikke var forberedt.</li>
	</ul>
	<hr />

	<h2>Regel 7: Komma før <em>at</em>-sætninger</h2>
	<p><strong>Komma skal sættes foran <em>at</em>-sætninger.</strong></p>
	<p><strong>Eksempel:</strong></p>
	<ul>
		<li>Han sagde, at han ikke kunne komme.</li>
		<li>Vi forventer, at vejret bliver godt.</li>
	</ul>
	<hr />

	<h2>Regel 8: Komma før infinitiv (valgfrit)</h2>
	<p><strong>Ved infinitivskonstruktioner kan man vælge at sætte komma.</strong></p>
	<p><strong>Eksempel:</strong></p>
	<ul>
		<li>Han ønskede, at rejse væk. <em>(valgfrit)</em></li>
		<li>Jeg vil gerne prøve, at lave kage. <em>(valgfrit)</em></li>
	</ul>
	<hr />

	<h2>Regel 9: Komma ved udråb, tiltale eller svarord</h2>
	<p><strong>Komma skal bruges ved udråb, tiltale eller svarord.</strong></p>
	<p><strong>Eksempel:</strong></p>
	<ul>
		<li>Nej, det kan jeg ikke.</li>
		<li>Peter, kom herhen!</li>
		<li>Wow, det var fantastisk!</li>
	</ul>
	<hr />

	<h2>Regel 10: Komma ved citater</h2>
	<p><strong>Komma sættes foran et direkte citat.</strong></p>
	<p><strong>Eksempel:</strong></p>
	<ul>
		<li>Hun sagde, "Jeg kommer i morgen."</li>
		<li>"Er du sikker?", spurgte han.</li>
	</ul>
	<hr />

	<h2>Regel 11: Ingen komma før <em>og</em> ved ledsætninger</h2>
	<p>
		<strong
			>Hvis to ledsætninger er forbundet med <em>og</em>, sættes der ikke komma før
			<em>og</em>.</strong
		>
	</p>
	<p><strong>Eksempel:</strong></p>
	<ul>
		<li>Jeg håber, at du kommer i morgen og at vi får en god dag.</li>
		<li>Han vidste, at hun var sur og at hun ikke ville tale med ham.</li>
	</ul>
	<hr />
</main>

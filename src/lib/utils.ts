
export const getSentence = () => {
		while (true) {
			const selectedSentence = SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
			if (selectedSentence.includes(',')) {
				return selectedSentence;
			}
		}
	};

//text.split(".").map((i)=>i.trim()+".").filter((i)=>i.contains(","))
export const SENTENCES = [
    "Bob er en bemærkelsesværdig person, hvis liv og personlighed rummer en fascinerende kompleksitet og dybde, der kan fylde adskillige sider med historier, refleksioner og beskrivelser.",
    "Han er en person, som både har oplevet og gennemlevet mere, end de fleste mennesker kan forestille sig.",
    "Hans rejse gennem livet er fyldt med forskellige roller, interesser og eventyr, der alle bidrager til et rigt og nuanceret portræt af ham.",
    "Bob blev født i en lille by, hvor han tilbragte sine første år omgivet af en kærlig familie.",
    "Fra en tidlig alder udviste Bob en naturlig nysgerrighed og et ønske om at lære alt, hvad han kunne, om verden omkring ham.",
    "Hans forældre, der begge arbejdede inden for undervisningssektoren, opmuntrede hans videbegærlighed og introducerede ham for litteratur, musik og naturvidenskab.",
    "Familien tog ofte på udflugter til naturen, hvor Bob kunne udforske skovene, observere dyrelivet og stille sine mange spørgsmål om alt, hvad han så.",
    "Da Bob begyndte i skolen, blev det hurtigt klart, at han havde en ekstraordinær evne til at absorbere og forstå komplekse emner.",
    "Han udmærkede sig i fag som matematik, fysik og litteratur, men viste også en dyb interesse for kunst og historie.",
    "Bobs flittige natur og hans lyst til at fordybe sig gjorde ham til en af de bedste elever i sin klasse, og han opnåede ofte priser for sine akademiske præstationer.",
    "Dette var en tid, hvor computere og internettet begyndte at vinde frem, og Bob så en verden af muligheder åbne sig for hans fødder.",
    "Han lærte hurtigt at programmere og blev dygtig til at udvikle små programmer og spil, som han kunne dele med sine venner.",
    "Hans interesse for teknologi førte også til, at han lærte om innovation, iværksætteri og digital udvikling, hvilket skulle vise sig at blive vigtigt i hans senere karriere.",
    "Samtidig dyrkede han også sine kreative sider gennem musik og kunst, hvor han eksperimenterede med at skrive sange og male abstrakte malerier, der udtrykte hans følelser og tanker.",
    "Hans evner som programmør og hans forståelse for digital udvikling gav ham hurtigt en fordel, og han steg hurtigt i graderne.",
    "Bob blev kendt for sin evne til at løse komplekse problemer og tænke ud af boksen, hvilket gjorde ham til en eftertragtet medarbejder og rådgiver.",
    "Han arbejdede med flere store projekter, der havde en stor indflydelse på den teknologiske udvikling, og han var med til at udvikle software, der blev brugt over hele verden.",
    "Bobs engagement og dedikation til sit arbejde gjorde ham anerkendt blandt sine kolleger, og han opnåede en række priser og udmærkelser i branchen.",
    "Hans første bog, en samling af noveller, blev godt modtaget og gav ham anerkendelse som en dygtig og tankevækkende forfatter.",
    "Senere skrev han også essays om teknologiens indflydelse på samfundet, og hans værker blev læst og diskuteret af mange.",
    "Bob blev en stemme for dem, der ønskede en mere nuanceret forståelse af, hvordan teknologi påvirker vores liv og værdier.",
    "Som en person, der altid har været nysgerrig på verden, begyndte Bob også at rejse rundt i forskellige lande og kulturer.",
    "Han besøgte steder som Indien, Japan og Brasilien, hvor han lærte om lokale traditioner, sprog og kultur.",
    "Han skrev ofte dagbøger om sine oplevelser og reflekterede over, hvordan hans rejser ændrede hans syn på verden.",
    "Han engagerede sig i forskellige velgørenhedsprojekter og startede sin egen fond, der arbejdede med at støtte uddannelsesprojekter i udviklingslande.",
    "Bobs fond finansierede bygningen af skoler og uddannelsesprogrammer, der gav børn adgang til den uddannelse, han selv havde haft glæde af.",
    "Han besøgte også personligt flere af disse projekter og mødte børnene og de lokale lærere, som inspirerede ham til at gøre mere for at støtte deres drømme og håb for fremtiden.",
    "Nu, i en mere moden fase af sit liv, bruger Bob meget tid på at reflektere over sin rejse og de erfaringer, han har gjort sig.",
    "Han har udviklet en filosofi om, at livet handler om både at lære og give videre, og han ser tilbage på sit liv med en følelse af ydmyghed og taknemmelighed.",
    "Han fortsætter med at skrive og dele sine tanker om, hvordan teknologi, kreativitet og humanitært engagement kan kombineres for at skabe en bedre verden for alle."
]
export const getSentence = () => {
	while (true) {
		const selectedSentence = SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
		if (selectedSentence.includes(',')) {
			return selectedSentence;
		}
	}
};

export const convertObjectToArray = (obj: { [key: string]: number }) => {
	let arr = [];
	for (const [key, value] of Object.entries(obj)) {
		for (let i = 0; i < value; i++) {
			arr.push(key);
		}
	}
	return arr;
};

//text.split(".").map((i)=>i.trim()+".").filter((i)=>i.contains(","))
export const SENTENCES = [
	'Hvis det regner, tager jeg min paraply med.',
	'Hun sang, og han spillede guitar.',
	'Det var sent, men han ville stadig ud.',
	'Da solen stod op, gik vi en tur.',
	'Jeg elsker hunde, katte og fugle.',
	'Han kom, så, og sejrede.',
	'Selvom det var koldt, gik vi udenfor.',
	'Hun spurgte, om jeg havde tid i morgen.',
	'Peter, som altid kommer for sent, er her nu.',
	'De spiste hurtigt, så de kunne nå bussen.',
	'Når jeg har tid, ringer jeg til dig.',
	'Bogen, der lå på bordet, var spændende.',
	'Det er vigtigt, at du kommer i morgen.',
	'Han var træt, fordi han havde arbejdet hele natten.',
	'Vi glæder os, men vi er også nervøse.',
	'Selvom det er svært, giver vi ikke op.',
	'Da de ankom, var festen allerede i gang.',
	'Vi gik til stranden, men vi badede ikke.',
	'Jeg ved, at du har ret.',
	'Min bror, som bor i Aarhus, kommer i weekenden.',
	'Han skyndte sig, for toget var forsinket.',
	'Selvom han forsøgte at forklare, hvad der var sket, virkede det ikke troværdigt.',
	'Vi vidste, da vi gik ind i projektet, at det ville tage lang tid.',
	'Bogen, som lå på bordet, var fuld af spændende historier.',
	'Hvis du skal nå toget, hvilket jeg går ud fra, bør du skynde dig.',
	'Hun sagde, at hun ikke kunne komme, men at hun gerne ville mødes en anden dag.',
	'Pigen, der vandt konkurrencen, havde trænet hver dag i flere måneder.',
	'Da regnen begyndte at falde, og vinden tog til, søgte vi ly under et træ.',
	'Jeg ved ikke, om han kommer, eller om han har ændret planer.',
	'Vi har besluttet at tage af sted tidligt, så vi kan undgå trafikken, og så vi kan få en rolig start.',
	'Selvom han vidste, at han havde travlt, stoppede han alligevel op for at hjælpe.',
	'De havde pakket alt, hvad de skulle bruge, undtagen kameraet, som lå på bordet derhjemme.',
	'Det er vigtigt, at du, uanset hvad der sker, holder hovedet koldt.',
	'Han undrede sig over, hvorfor hun, der altid var punktlig, var forsinket i dag.',
	'Vi fandt hurtigt ud af, at vejret, som ellers var meldt fint, blev ret ustadigt.',
	'Efter mødet, der trak ud længere end forventet, skyndte vi os tilbage til kontoret.',
	'Fordi hun havde glemt nøglerne, måtte hun vente, til nogen kom hjem.',
	'Jeg ved, hvad du tænker, men det er altså ikke så nemt, som det ser ud.',
	'Han ringede til hende, da han hørte, at hun ikke var kommet hjem endnu.',
	'Det er sjovt, hvordan tiden, når man hygger sig, bare flyver af sted.',
	'Hvis vi tager af sted nu, og hvis vi holder et godt tempo, kan vi stadig nå det.',
	'Hvis du, når det bliver nødvendigt, har brug for hjælp, må du endelig sige til.',
	'Selvom han påstod, at han ikke vidste noget, og selvom vi pressede ham, holdt han fast i sin historie.',
	'Det er tydeligt, at hun, selv når hun er stresset, altid bevarer roen.',
	'Da han, som jo ellers aldrig er syg, meldte sig syg i dag, blev vi alle overraskede.',
	'Projektet, som både krævede tid, penge og tålmodighed, blev til sidst en stor succes.',
	'Vi spurgte ham, om han, når alt kom til alt, virkelig mente det, han sagde.',
	'Hvis du, uanset hvor presset du føler dig, stadig kan smile, er du virkelig stærk.',
	'Han indrømmede til sidst, at han, selvom han havde prøvet at skjule det, havde lavet en fejl.',
	'Jeg kan ikke beslutte mig for, om vi skal tage på ferie nu, hvor priserne er lave, eller vente til senere.',
	'Hun påstod, at hun havde set, hvad der skete, men at hun, af en eller anden grund, ikke kunne beskrive det.',
	'Når vi, hvilket jo er planen, starter projektet i morgen, bliver det spændende at se, hvordan det udvikler sig.',
	'De nåede frem til, at problemet, som ellers virkede uoverskueligt, faktisk var ret simpelt at løse.',
	'Da han endelig kom hjem, og da han, som altid, begyndte at fortælle sine mange historier, grinede vi alle sammen.',
	'Uanset hvad der sker, og uanset hvordan situationen udvikler sig, skal vi holde fast i vores værdier.',
	'Det var først, da vi, efter flere timer, fandt den rigtige vej, at vi begyndte at slappe af.',
	'Hvis du ikke ved, hvad du vil sige, eller hvis du ikke føler dig sikker, kan du bare vente lidt.',
	'Selvom vi, da vi startede, troede, at vi havde styr på det, endte det med at blive en udfordring.',
	'Han spurgte, om det, vi havde planlagt, stadig var aktuelt, eller om vi skulle ændre det.',
	'Det er ikke altid nemt at afgøre, hvad der, når det kommer til stykket, er det vigtigste.',
	'Når vi først har forstået, hvordan systemet, som virker lidt komplekst, fungerer, bliver det hele meget lettere.',
	'Bob er en bemærkelsesværdig person, hvis liv og personlighed rummer en fascinerende kompleksitet og dybde, der kan fylde adskillige sider med historier, refleksioner og beskrivelser.',
	'Han er en person, som både har oplevet og gennemlevet mere, end de fleste mennesker kan forestille sig.',
	'Hans rejse gennem livet er fyldt med forskellige roller, interesser og eventyr, der alle bidrager til et rigt og nuanceret portræt af ham.',
	'Bob blev født i en lille by, hvor han tilbragte sine første år omgivet af en kærlig familie.',
	'Fra en tidlig alder udviste Bob en naturlig nysgerrighed og et ønske om at lære alt, hvad han kunne, om verden omkring ham.',
	'Hans forældre, der begge arbejdede inden for undervisningssektoren, opmuntrede hans videbegærlighed og introducerede ham for litteratur, musik og naturvidenskab.',
	'Familien tog ofte på udflugter til naturen, hvor Bob kunne udforske skovene, observere dyrelivet og stille sine mange spørgsmål om alt, hvad han så.',
	'Da Bob begyndte i skolen, blev det hurtigt klart, at han havde en ekstraordinær evne til at absorbere og forstå komplekse emner.',
	'Han udmærkede sig i fag som matematik, fysik og litteratur, men viste også en dyb interesse for kunst og historie.',
	'Bobs flittige natur og hans lyst til at fordybe sig gjorde ham til en af de bedste elever i sin klasse, og han opnåede ofte priser for sine akademiske præstationer.',
	'Dette var en tid, hvor computere og internettet begyndte at vinde frem, og Bob så en verden af muligheder åbne sig for hans fødder.',
	'Han lærte hurtigt at programmere og blev dygtig til at udvikle små programmer og spil, som han kunne dele med sine venner.',
	'Hans interesse for teknologi førte også til, at han lærte om innovation, iværksætteri og digital udvikling, hvilket skulle vise sig at blive vigtigt i hans senere karriere.',
	'Samtidig dyrkede han også sine kreative sider gennem musik og kunst, hvor han eksperimenterede med at skrive sange og male abstrakte malerier, der udtrykte hans følelser og tanker.',
	'Hans evner som programmør og hans forståelse for digital udvikling gav ham hurtigt en fordel, og han steg hurtigt i graderne.',
	'Bob blev kendt for sin evne til at løse komplekse problemer og tænke ud af boksen, hvilket gjorde ham til en eftertragtet medarbejder og rådgiver.',
	'Han arbejdede med flere store projekter, der havde en stor indflydelse på den teknologiske udvikling, og han var med til at udvikle software, der blev brugt over hele verden.',
	'Bobs engagement og dedikation til sit arbejde gjorde ham anerkendt blandt sine kolleger, og han opnåede en række priser og udmærkelser i branchen.',
	'Hans første bog, en samling af noveller, blev godt modtaget og gav ham anerkendelse som en dygtig og tankevækkende forfatter.',
	'Senere skrev han også essays om teknologiens indflydelse på samfundet, og hans værker blev læst og diskuteret af mange.',
	'Bob blev en stemme for dem, der ønskede en mere nuanceret forståelse af, hvordan teknologi påvirker vores liv og værdier.',
	'Som en person, der altid har været nysgerrig på verden, begyndte Bob også at rejse rundt i forskellige lande og kulturer.',
	'Han besøgte steder som Indien, Japan og Brasilien, hvor han lærte om lokale traditioner, sprog og kultur.'
];

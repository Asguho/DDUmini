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
	'Han besøgte steder som Indien, Japan og Brasilien, hvor han lærte om lokale traditioner, sprog og kultur.',
	'Han skrev ofte dagbøger om sine oplevelser og reflekterede over, hvordan hans rejser ændrede hans syn på verden.',
	'Han engagerede sig i forskellige velgørenhedsprojekter og startede sin egen fond, der arbejdede med at støtte uddannelsesprojekter i udviklingslande.',
	'Bobs fond finansierede bygningen af skoler og uddannelsesprogrammer, der gav børn adgang til den uddannelse, han selv havde haft glæde af.',
	'Han besøgte også personligt flere af disse projekter og mødte børnene og de lokale lærere, som inspirerede ham til at gøre mere for at støtte deres drømme og håb for fremtiden.',
	'Nu, i en mere moden fase af sit liv, bruger Bob meget tid på at reflektere over sin rejse og de erfaringer, han har gjort sig.',
	'Han har udviklet en filosofi om, at livet handler om både at lære og give videre, og han ser tilbage på sit liv med en følelse af ydmyghed og taknemmelighed.',
	'Han fortsætter med at skrive og dele sine tanker om, hvordan teknologi, kreativitet og humanitært engagement kan kombineres for at skabe en bedre verden for alle.',
	'I en lille vindblæst landsby ved den norske kyst levede Anna, en ung kvinde med et usædvanligt liv og en endnu mere usædvanlig passion for bjørne.',
	'Hendes interesse var begyndt i barndommen, hvor hendes bedstefar, en erfaren naturforsker, havde fortalt hende historier om disse majestætiske dyr og deres rolle i økosystemet.',
	'Anna var ikke en traditionel bjørneekspert, men snarere en dedikeret naturformidler, hvis hjerte bankede for at beskytte og forstå disse komplekse væsener.',
	'Hendes daglige arbejde som biolog ved det lokale naturcenter gav hende mulighed for at kombinere sin videnskabelige baggrund med sin dybe kærlighed til vilde dyr, særligt bjørne.',
	'Hun tilbragte utallige timer med at studere bjørnenes adfærd, deres sociale strukturer og deres afgørende betydning for det skandinaviske økosystem.',
	'Hendes kolleger betragtede hende som excentrisk, men respekterede hendes utrolige viden og dedikation.',
	'I yearly rapporter og videnskabelige artikler dokumenterede hun bjørnenes vandremønstre, deres jagtstrategier og deres tilpasningsevne i et landskab, der konstant ændrede sig på grund af klimaforandringer og menneskelig indgriben.',
	'En særlig bjørn, som hun kaldte Magnus, havde fanget hendes særlige opmærksomhed.',
	'Hendes recherche viste, at Magnus var en usædvanlig intelligent bjørn, der formåede at overleve i et stadig mere udfordrende miljø, hvor skovene krympede og menneskelige bosættelser spredte sig.',
	'Magnus dukkede pludselig op i en lysning, ikke som et vildt og farligt rovdyr, men næsten som om han vidste, at Anna var der.',
	'De få minutter, hvor de iagttog hinanden på denne kølige morgenstund, føltes som et øjeblik af gensidig forståelse - et sjældent møde mellem menneske og vild natur, hvor gensidig respekt og nysgerrighed var de dominerende følelser.',
	'Hendes forskningsresultater blev efterhånden anerkendt internationalt, og hun begyndte at holde foredrag og skrive bøger, der ikke blot var tørre videnskabelige rapporter, men levende fortællinger om bjørnenes liv, deres intelligens og deres sårbarhed.',
	'Selvom Anna nu var blevet en anerkendt ekspert, bevarede hun stadig sin ydmyghed og passion for naturen.',
	'Hun fortsatte med at rejse rundt i de skandinaviske skove, altid på udkig efter Magnus og andre bjørne, always med et kamera, nogle noter og en dyb respekt for det vilde liv, der udfoldede sig omkring hende.',
	'I den fjerne nordvestlige del af Danmark, hvor havet banker mod klipperige kyster og marker strækker sig som bølgende grønne tæpper, begynder historien om Holck-slægten - en familie hvis skæbne var så tæt forbundet med landjorden, at deres rødder syntes mere permanente end de gamle stendigers mursten.',
	'Det hele startede med Jørgen Holck, en mand hvis livshistorie var vævet så tæt sammen med gården Strandholm, at man næsten kunne forestille sig, at hans blod indeholdt samme mineraler som den jord, han dyrkede med en næsten religiøs dedikation.',
	'Han var født i 1872, søn af en jordløs landarbejder og en tjenestepige, og hans liv var et testament om social mobilitet i en tid, hvor klasseskel var hårdere end de hårdeste vinterfrost.',
	'Hans morfar havde fortalt historier om de store landboreformer, om hvordan fæstebønder langsomt var begyndt at eje deres egen jord, og disse fortællinger havde næret Jørgens drøm om en dag at eje sit eget stykke land.',
	'Gennem utrolig flid, nøjsomhed og en næsten ubegribelig arbejdsevne lykkedes det ham i en alder af 35 år at købe de første 12 tønder land - et lille stykke af Danmark, som han kaldte sit eget.',
	'Hans kone, Ingrid, var en stille og stærk kvinde fra en familie af håndværkere fra Aalborg, hvis kunnen og udholdenhed matchede Jørgens egen.',
	'Sammen skabte de ikke blot en gård, men en familiehistorie, der ville strække sig gennem generationer.',
	'Deres første år var præget af hårdt arbejde, modgang og små sejre.',
	'Børnene kom - først sønnen Niels i 1905, dernæst datteren Marie i 1908 - og hver især blev de opdragede med en blanding af kærlighed, praktisk sans og en dyb respekt for jorden.',
	'Niels viste tidligt interesse for landbruget, mens Marie var mere intellektuelt anlagt og drømte om en uddannelse, noget der var usædvanligt for en kvinde på den tid.',
	'Fødevarerationering, usikkerhed og bekymring prægede hverdagen, men Holck-familien var skabt af et materiale, der var hårdere end de udfordringer, der ramte dem.',
	'Niels meldte sig som ung mand til krigen, ikke af patriotisk begejstring, men af en dyb følelse af pligt.',
	'Han vendte hjem i 1918 - fysisk såret, men med en indre styrke, der ville præge hele hans fremtidige liv.',
	'Hans oplevelser havde forandret ham, gjort ham mere eftertænksom, mere opmærksom på livets skrøbelighed.',
	'Hans søster Marie havde imens gennemført en uddannelse som lærer, et usædvanligt valg for en kvinde fra landbrugets verden.',
	'Hun underviste i landsbyens skole og blev en respekteret figur, hvis indflydelse rakte langt ud over klasseværelsets fire vægge.',
	'Han giftede sig med Else, en ung kvinde fra en anden landbrugsfamilie, og sammen fik de tre børn: Hans, Erik og Kirsten.',
	'Landbruget undergik store forandringer i disse år - mekanisering begyndte at erstatte manuel arbejdskraft, og nye dyrkningsmetoder revolutionerede produktionen.',
	'Niels var en af de landmænd, der hurtigt tog ved lære og investerede i nye teknologier, hvilket sikrede familiens økonomiske stabilitet gennem de vanskelige år under og efter anden verdenskrig.',
	'Hans ældste søn Hans viste tidligt interesse for moderne landbrugsteknikker, mens Erik var mere tiltrukket af de humanistiske fag og senere blev journalist i København.',
	'Kirsten valgte en karriere som sygeplejerske og bidrog på sin egen måde til familiens omdømme som folk, der tjente deres lokalsamfund.',
	'Generations- og arveafgifter, EU-regler og stigende konkurrence skabte et landskab, hvor kun de mest tilpasningsdygtige kunne overleve.',
	'Hans Holck, der nu havde overtaget gården, var netop sådan en type - innovativ, uddannet og med et skarpt forretningsblik.',
	'Han udvidede gradvist bedriften, diversificerede produktionen og begyndte også at eksperimentere med økologisk landbrug, længe før det blev en mainstream trend.',
	'Hans kone, Margrete, var selv uddannet agronom og spillede en afgørende rolle i gårdens videreudvikling.',
	'De fik to børn, Søren og Line, og selvom begge var opvokset med landbrugets rytmer, valgte de vidt forskellige karrierer.',
	'Søren overtog til sidst Strandholm, mens Line blev arkitekt i Berlin og kun sjældent vendte tilbage til de marker, hvor hendes forfædre havde levet og arbejdet gennem generationer.',
	'I dag fremstår Strandholm som et moderne landbrug, der balancerer teknologi, tradition og bæredygtighed.',
	'Søren har indført præcisionslandbrug med droner og satellitteknologi, mens han stadig holder fast i de grundlæggende værdier, som Jørgen Holck grundlagde for næsten 150 år siden: respekt for jorden, hårdt arbejde og en dyb forbundethed med landskabet.'
];

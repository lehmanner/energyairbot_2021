// ==UserScript==
// @name         Energy Air 2021 Game Bot
// @description  Win tickets for the Energy Air 2021 automatically
// @match        *game.energy.ch/*
// @run-at       document-end
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js
// ==/UserScript==

const questions = {
    "MIT WELCHEM ESC-HIT ROCKTE LUCA HÄNNI AM LETZTEN ENERGY AIR DIE BÜHNE?":"She Got Me",
    "WELCHER ACT FEIERTE AM LETZTEN ENERGY AIR MIT EINEM NEUEN SONG EINE WELTPREMIERE?":"Aloe Blacc",
    "WANN IST DIE TICKETVERLOSUNG FÜRS ENERGY AIR 2021 GESTARTET?":"Am 2. August 2021",
    "WIE KANNST DU DEINE GEWINNCHANCEN BEI TICKETVERLOSUNGEN FÜR ENERGY EVENTS VERDOPPELN?":"Mit einer Energy One Membership",
    "WIE HEISST DER OFFIZIELLE INSTAGRAM-ACCOUNT DES ENERGY AIR?":"@energyair_official",
    "IN WELCHER LOCATION FINDET DAS ENERGY AIR 2021 UNTER FREIEM HIMMEL STATT?":"Stadion Wankdorf",
    "MIT WELCHEM AUFBLASBAREN TIER KONNTEN ZWEI AUSERWÄHLTE AM LETZTEN ENERGY AIR ÜBER DIE GANZE MEUTE CROWDSURFEN?":"Einhorn",
    "UNTER WELCHEM MOTTO FEIERN WIR AM 4. SEPTEMBER 2021 DAS ENERGY AIR?":"We are back.",
    "WELCHEN KLEIDUNGSSTIL VERFOLGT TALLY WEIJL GRUNDSÄTZLICH?":"Just in time (voll im Trend)",
    "WAS IST DAS PERFEKTE OPENAIR-OUTFIT?":"Egal, hauptsache du kannst darin tanzen",
    "WIE WIRD TALLY WEIJL AUSGESPROCHEN?":"Talli Weil",
    "VON WELCHER MARKE WAR DAS MOTORRAD, MIT DEM LOCO ESCRITO AM LETZTEN ENERGY AIR ÜBER DIE BÜHNE FUHR?":"Harley-Davidson",
    "WAS FOLGT AM DIESJÄHRIGEN ENERGY AIR ALS KRÖNENDER ABSCHLUSS?":"Aftershowparty",
    "WER WAR DER ALLERERSTE ACT IN DER GESCHICHTE DES ENERGY AIR?":"Bastian Baker",
    "WIE HEISST DIE INITIATIVE FÜR MEHR RESPEKT IM INTERNET, WELCHE SWISSCOM MIT ENERGY LANCIERT HAT UND AM ENERGY AIR IHREN GROSSEN HÖHEPUNKT FEIERT?":"Stop the Hate",
    "IN WELCHER BELIEBTEN SERIE WAR TALLY WEIJL ZU SEHEN?":"Gossip Girl",
    "WAS WAR DAS ERSTE, WAS KÜNSTLER KNACKEBOUL NACH SEINEM AUFTRITT 2014 BACKSTAGE GEMACHT HAT?":"Mit seinem Mami ein kühles Bier getrunken",
    "IN WELCHEM SCHWEIZER KANTON ERÖFFNETE TALLY WEIJL 1987 DEN ERSTEN STORE?":"Fribourg",
    "MIT WELCHER ZUSATZOPTION HAST DU DIE MÖGLICHKEIT, DIREKT VOR DER BÜHNE ZU STEHEN?":"XTRA Circle",
    "MUSIKGRÖSSEN AUS WIE VIELEN LÄNDERN WAREN AM ENERGY AIR 2019 DABEI?":"Aus 7 Ländern",
    "WELCHES SCHWEIZER DJ-DUO SORGTE AM ENERGY AIR 2019 ZU BEGINN FÜR REICHLICH STIMMUNG?":"Averdeck",
    "WELCHE ZWEI ENERGY KULTFIGUREN MISCHTEN DAS ENERGY AIR 2017 RICHTIG AUF?":'Tinu &amp; Dänu',
    "WIE HEISST DIE TRAM- UND BUSHALTESTELLE, WELCHE SICH DIREKT NEBEN DEM STADION WANKDORF BEFINDET?":"Wankdorf Center",
    "WELCHE MUSIKERIN WURDE AM ENERGY AIR 2018 VON EINER 9-JÄHRIGE BESUCHERIN AUF DER BÜHNE GECOVERT?":"Namika",
    "IN WELCHEN FARBEN TRITT DAS ENERGY AIR LOGO JÄHRLICH FÜR DAS SOMMERFINALE AUF?":"Blau und Weiss",
    "WAS PASSIERT, WENN ES AM ENERGY AIR REGNET?":"Der Event findet trotzdem statt",
    "WIE ALT MUSS MAN SEIN, UM OHNE ERWACHSENE BEGLEITUNG AM ENERGY AIR TEILZUNEHMEN?":"16 Jahre",
    "WO KANNST DU, UNTER ANDEREM, ENERGY AIR TICKETS GEWINNEN?":"Am Sender bei Radio Energy",
    "WELCHER ACT WAR NOCH NIE AN EINEM ENERGY AIR DABEI?":"Dua Lipa",
    "NACH WELCHEM KRITERIUM WÄHLT DAS ENERGY TEAM DIE ACTS FÜR DAS ENERGY AIR AUS?":"Musiker*innen, welche einen grossen Bekanntheitsgrad haben",
    "WER WAR DER ÜBERRASCHUNGSACT AM ENERGY AIR 2018?":'Lo &amp; Leduc',
    "WIE LANGE DAUERTE DAS ENERGY AIR 2019?":"5 1/2 Stunden",
    "WOMIT ERSCHIENEN DIE ENERGY MEIN MORGEN MODERATOREN MOSER UND SCHELKER AUF DER ENERGY AIR BÜHNE 2019?":"Mit Spielzeug-Pferden",
    "IN WIE VIELEN LÄNDERN IST DAS KLEIDERGESCHÄFT TALLY WEIJL VERTRETEN?":"In 39 Ländern",
    "WELCHE STADT GEHÖRT SEIT AUGUST AUCH ZUR ENERGY FAMILIE UND WIRD AM ENERGY AIR VERTRETEN SEIN?":"Luzern",
    "WELCHER KÜNSTLER MUSSTE AM LETZTEN ENERGY AIR BACKSTAGE EINEN PART AUS DEM DIALEKTRAPSONG VON SANDRO VORRAPPEN?":"Stress"
}

function titleIs (title, selector = 'h1') {
	return document.getElementsByTagName(selector)[1].textContent === title
}

function currentQuestion () {
	if ($('h3.question-text').html() != null){
		return $('h3.question-text').html().toUpperCase()
	}
}

function nextQuestion () {
    $('button#next-question').trigger('click')
    setTimeout(makeAction, 200)
}

function answerQuestion () {
    let curr = currentQuestion()
    console.log(curr, questions[curr])
    $('#answers .answer-wrapper').each((i, el) => {
        if ($(el).children('label').html() === questions[curr]) {
            $(el).children('input').trigger('click')
        }
    })
    setTimeout(nextQuestion, 200) //speed
}

function makeAction () {
	if (document.getElementsByTagName('h1')[1] != null){
		if (titleIs('Hinter welchem Logo verstecken sich die Tickets?')) {
			console.log('STEP: Memory')
			var star = Math.floor(Math.random() * 12) + 2;
			document.getElementsByTagName('img') [star].click();
			setTimeout(makeAction, 1000)
		} else if (titleIs('Leider verloren')) {
			$('button.btn.btn-primary.game-button.btn-lg').trigger('click')
			setTimeout(makeAction, 200)
		}
	}
    else if (document.getElementsByTagName('h3')[0].textContent == "Du hast die erste Hürde geschafft.  Um welchen Preis möchtest du spielen?") {
        $('.tickets .button button').trigger('click')
        setTimeout(makeAction, 200)
    }
	else {
		answerQuestion()
	}

}

(function() {
    'use strict';

    console.log('starting...')
    makeAction()
})();

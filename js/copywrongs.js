
window.onload = function() {

	// if going to main domain: try to auto detect language
	if (document.location.pathname == '/') {
		var browserLang = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
		browserLang = browserLang.substr(0,2);
		if (browserLang != 'en') { // don't need to do anything there
			var oo = document.getElementById('langselect').options;
			for (var i=0; i<oo.length; i++) {
				if (oo[i].value == browserLang) { // if it exists in the language dropdown
					document.location.replace('/'+browserLang);
				}
			}
		}
	}

	// "don't call now, email instead" button
	var d = new Date();
	window.showEmailState = false;
	if (d.getUTCDay() === 0 || // if Sunday
		d.getUTCDay() === 6 || // or Saturday
		d.getUTCHours() < 7 || // or before 9AM Brussels Summer Time
		d.getUTCHours() > 15 // or after 6PM Brussels Summer Time
		) {
		showEmail(); // then => show email!
	}

	// countdown
	var targetDate = Date.parse("Jun 16, "+d.getFullYear()+" 12:00 GMT+0100");
	var daysLeft = (targetDate-Date.parse(d))/(1000*60*60*24);
	var daysLeftDisplay = (daysLeft < 0) ? 0 : Math.round(daysLeft);
	document.getElementById('days').innerHTML = daysLeftDisplay;
	document.getElementById('countdown').style.opacity = 1;

	// call to action
	window.onscroll = function() {
		//console.log(document.body.scrollTop, window.innerHeight);
		if (document.body.scrollTop >
			document.getElementById('call').offsetTop - window.innerHeight + 150) {
			addClass('state-atcall')
		} else {
			removeClass('state-atcall')
		}
	}

	// share links
	updateShareLinks();	
};

var meplist = [
	{name: "Pavel Svoboda",country: "CZ",group: "EPP",party: "Křesťanská a demokratická unie - Československá strana lidová",id: "16829",photoid: "96272",email: "pavel.svoboda@europarl.europa.eu"},
	{name: "Lidia Joanna Geringer de Oedenberg",country: "PL",group: "S&D",party: "Bezpartyjna",id: "16889", photoid: "28377", email: "lidiajoanna.geringerdeoedenberg@europarl.europa.eu"},
	{name: "Jean-Marie Cavada",country: "FR",group: "ALDE",party: "Nous Citoyens",id: "17057", photoid: "28206", weight: 2, email: "jean-marie.cavada@europarl.europa.eu"},
	{name: "Axel Voss",country: "DE",group: "EPP",party: "Christlich Demokratische Union Deutschlands",id: "16943", photoid: "96761", email: "axel.voss@europarl.europa.eu"},
	{name: "Mady Delvaux",country: "LU",group: "S&D",party: "Parti ouvrier socialiste luxembourgeois",id: "17056", photoid: "124776", email: "mady.delvaux-stehres@europarl.europa.eu"},
	{name: "Max Andersson",country: "SE",group: "Greens/EFA",party: "Miljöpartiet de gröna",id: "17280", photoid: "124994", email: "max.andersson@europarl.europa.eu"},
	{name: "Joëlle Bergeron",country: "FR",group: "EFDD",party: "Sans étiquette",id: "16807", photoid: "124740", email: "joelle.bergeron@europarl.europa.eu"},
	{name: "Marie-Christine Boutonnet",country: "FR",group: "NI",party: "Front national",id: "17279", photoid: "124753", email: "marie-christine.boutonnet@europarl.europa.eu"},
	{name: "Kostas Chrysogonos",country: "GR",group: "GUE/NGL",party: "SYRIZA",id: "16896", photoid: "125061", weight: 3, email: "kostas.chrysogonos@europarl.europa.eu"},
	{name: "Therese Comodini Cachia",country: "MT",group: "EPP",party: "Partit Nazzjonalista",id: "17125", photoid: "124968", weight: 10, email: "therese.comodinicachia@europarl.europa.eu"},
	//{name: "Andrzej Duda",country: "PL",group: "ECR",party: "Prawo i Sprawiedliwość",id: "17276", photoid: "124899"},
	{name: "Rosa Estaràs Ferragut",country: "ES",group: "EPP",party: "Partido Popular",id: "16862", photoid: "96811", email: "rosa.estaras@europarl.europa.eu"},
	{name: "Laura Ferrara",country: "IT",group: "EFDD",party: "Movimento 5 Stelle",id: "16935", photoid: "124833", email: "laura.ferrara@europarl.europa.eu"},
	{name: "Enrico Gasbarra",country: "IT",group: "S&D",party: "Partito Democratico",id: "18983", photoid: "124817", email: "enrico.gasbarra@europarl.europa.eu"},
	{name: "Mary Honeyball",country: "UK",group: "S&D",party: "Labour Party",id: "17002", photoid: "5846", weight: 2, email: "mary.honeyball@europarl.europa.eu"},
	{name: "Sajjad Karim",country: "UK",group: "ECR",party: "Conservative Party",id: "16853", photoid: "28481", email: "sajjad.karim@europarl.europa.eu"},
	{name: "Dietmar Köster",country: "DE",group: "S&D",party: "Sozialdemokratische Partei Deutschlands",id: "17277", photoid: "124822", email: "dietmar.koester@europarl.europa.eu"},
	{name: "Gilles Lebreton",country: "FR",group: "NI",party: "Front national/Rassemblement Bleu Marine",id: "17282", photoid: "124738", email: "gilles.lebreton@europarl.europa.eu"},
	{name: "António Marinho e Pinto",country: "PT",group: "ALDE",party: "Independente",id: "16934", photoid: "124742", email: "antonio.marinhoepinto@europarl.europa.eu"},
	{name: "Jiří Maštálka",country: "CZ",group: "GUE/NGL",party: "Komunistická strana Čech a Moravy",id: "17085", photoid: "23704", weight: 2, email: "jiri.mastalka@europarl.europa.eu"},
	{name: "Ignazio Corrao",country: "IT",group: "EFDD",party: "Movimento 5 Stelle",id: "16742", photoid: "124856", email: "ignazio.corrao@europarl.europa.eu"},
	{name: "Sergio Gaetano Cofferati",country: "IT",group: "S&D",party: "Partito Democratico",id: "17047", photoid: "96915", email: "sergio.cofferati@europarl.europa.eu"},
	{name: "Fabio Massimo Castaldo",country: "IT",group: "EFDD",party: "Movimento 5 Stelle",id: "16872", photoid: "124812", email: "fabiomassimo.castaldo@europarl.europa.eu"},
	{name: "Daniel Buda",country: "RO",group: "EPP",party: "Partidul Naţional Liberal",id: "17187", photoid: "125012", email: "daniel.buda@europarl.europa.eu"},
	{name: "Mario Borghezio",country: "IT",group: "NI",party: "Lega Nord",id: "17329", photoid: "21817", email: "mario.borghezio@europarl.europa.eu"},
	{name: "Tadeusz Zwiefka",country: "PL",group: "EPP",party: "Platforma Obywatelska",id: "17278", photoid: "28301", email: "tadeusz.zwiefka@europarl.europa.eu"},
	{name: "József Szájer",country: "HU",group: "EPP",party: "Fidesz-Magyar Polgári Szövetség-Keresztény Demokrata Néppárt",id: "16801", photoid: "23821", email: "jozsef.szajer@europarl.europa.eu"},
	{name: "Evelyn Regner",country: "AT",group: "S&D",party: "Sozialdemokratische Partei Österreichs",id: "16919", photoid: "96998", email: "evelyn.regner@europarl.europa.eu"},
//	{name: "Julia Reda",country: "DE",group: "Greens/EFA",party: "Piratenpartei Deutschland",id: "16776", photoid: "124816"},
	{name: "Emil Radev",country: "BG",group: "EPP",party: "Граждани за европейско развитие на България",id: "17281", photoid: "124850", email: "emil.radev@europarl.europa.eu"},
	{name: "Victor Negrescu",country: "RO",group: "S&D",party: "Partidul Social Democrat",id: "17183", photoid: "88882", email: "victor.negrescu@europarl.europa.eu"},
	{name: "Constance Le Grip",country: "FR",group: "EPP",party: "Union pour un Mouvement Populaire",id: "17170", photoid: "101580", email: "constance.legrip@europarl.europa.eu"},
	{name: "Sylvia-Yvonne Kaufmann",country: "DE",group: "S&D",party: "Sozialdemokratische Partei Deutschlands",id: "17175", photoid: "1849", email: "sylvia-yvonne.kaufmann@europarl.europa.eu"},
	{name: "Heidi Hautala",country: "FI",group: "Greens/EFA",party: "Vihreä liitto",id: "16740", photoid: "2054", email: "heidi.hautala@europarl.europa.eu"},
	{name: "Jytte Guteland",country: "SE",group: "S&D",party: "Arbetarepartiet – Socialdemokraterna",id: "17216", photoid: "124991", email: "jytte.guteland@europarl.europa.eu"},
	{name: "Luis de Grandes Pascual",country: "ES",group: "EPP",party: "Partido Popular",id: "16842", photoid: "28393", email: "luis.degrandespascual@europarl.europa.eu"},
	{name: "Evelyne Gebhardt",country: "DE",group: "S&D",party: "Sozialdemokratische Partei Deutschlands",id: "17193", photoid: "1913", email: "evelyne.gebhardt@europarl.europa.eu"},
	{name: "Angel Dzhambazki",country: "BG",group: "ECR",party: "VMRO",id: "17040", photoid: "124873", weight: 2, email: "angel.dzhambazki@europarl.europa.eu"},
	{name: "Pascal Durand",country: "FR",group: "Greens/EFA",party: "Europe Écologie",id: "16990", photoid: "124693", email: "pascal.durand@europarl.europa.eu"},
	{name: "Brian Crowley",country: "IE",group: "ECR",party: "Fianna Fáil Party",id: "16909", photoid: "2109", email: "brian.crowley@europarl.europa.eu"},
	{name: "Stanisław Żółtek",country: "PL",group: "NI",party: "Kongres Nowej Prawicy",id: "17422", photoid: "124902", email: "stanislawjozef.zoltek@europarl.europa.eu"},
	{name: "Cecilia Wikström",country: "SE",group: "ALDE",party: "Folkpartiet liberalerna",id: "16772", photoid: "96677", weight: 3, email: "cecilia.wikstrom@europarl.europa.eu"},
	{name: "Rainer Wieland",country: "DE",group: "EPP",party: "Christlich Demokratische Union Deutschlands",id: "16729", photoid: "2323", email: "rainer.wieland@europarl.europa.eu"},
	{name: "Viktor Uspaskich",country: "LT",group: "ALDE",party: "Darbo partija",id: "17262", photoid: "96698", email: "viktor.uspaskich@europarl.europa.eu"},
	{name: "Giovanni Toti",country: "IT",group: "EPP",party: "Forza Italia",id: "17391", photoid: "124764", email: "giovanni.toti@europarl.europa.eu"},
	{name: "Virginie Rozière",country: "FR",group: "S&D",party: "Parti radical de gauche",id: "17194", photoid: "103845", email: "virginie.roziere@europarl.europa.eu"},
	{name: "Angelika Niebler",country: "DE",group: "EPP",party: "Christlich-Soziale Union in Bayern e.V.",id: "17004", photoid: "4289", email: "angelika.niebler@europarl.europa.eu"}
];

function showMEP(fromButton) {
	var validCountryCodes = ['AT', 'BG', 'CZ', 'FI', 'FR', 'DE', 'HU', 'IE', 'IT', 'LT', 'LU', 'MT', 'PL', 'PT', 'RO', 'ES', 'SE', 'UK'];

    document.getElementById('thankyou').style.display = 'none';
    document.getElementById('showmepcontainer').style.display = 'block';
    if (window.showEmailState === true) {
	    document.getElementById('callinput').style.display = 'none';
	} else {
		document.getElementById('callinput').style.display = 'block';
	}

    var randomOrNot = Math.floor(Math.random() * 2);
    if (!fromButton && randomOrNot == 0) { // on page load, 50% of the case show special prioritised MEPs
    	var currWeight = -1;
    	for (var i=0;i<meplist.length;i++) {
    		if ((validCountryCodes.indexOf(window.countryCode) == -1 || // this MEP fits country selection
    				meplist[i].country == window.countryCode)) {
    			var weight = meplist[i].weight || 0;
    			if (weight > currWeight) { // select the one with the highest weight value (if any)
    				var mep = meplist[i];
    				currWeight = weight;
    			}
    		}
    	}
    } else {
		var randomMep = Math.floor(Math.random() * meplist.length);
		if (window.countryCode && validCountryCodes.indexOf(window.countryCode) > -1) {
			while ( meplist[randomMep].country !== window.countryCode || // wrong country?
					meplist[randomMep].id == window.lastShownMEP &&		 // same as last?
					mepsFromCertainCountry(window.countryCode) !== 1) {	 // AND more than one MEP from the selected country
				randomMep = Math.floor(Math.random() * meplist.length);  // => find another
			}
		}
		var mep = meplist[randomMep];
	}
	if(document.location.hash == '#debug') mep = {name: "Julia Reda",country: "DE",group: "Greens/EFA",party: "Piratenpartei Deutschland",id: "16776", photoid: "124816"};
	window.lastShownMEP = mep.id;

	document.getElementById('mep_name').innerHTML = mep.name;
	document.getElementById('mep_party').innerHTML = mep.party;
	document.getElementById('mep_group').innerHTML = mep.group;
	document.getElementById('mep_photo').setAttribute("src", "http://www.europarl.europa.eu/mepphoto/"+ mep.photoid +".jpg")
	document.getElementById('callform').setAttribute("action", "https://piphone.lqdn.fr/campaign/call2/rapport_reda/"+mep.id);
	document.getElementById('mailbutton').setAttribute("href", "mailto:"+mep.email);

	return false;
}

function ccChange(v) {
	var plh = (v === '') ? "+12 345 67 89" : "0123 456 789";
	document.getElementById('localnumber').setAttribute("placeholder", plh);
}

if (!Date.now) {
  Date.now = function now() {
    return new Date().getTime();
  };
}

function showEmail() {
	document.getElementById('email').setAttribute("style", "display:inline;");
	document.getElementById('callinput').setAttribute("style", "display:none;");
	window.showEmailState = true;
}

function stats(mepid) {
	var i = document.createElement('img');
	var d = new Date();
	var timestamp = Date.now();
	var timeOffset = d.getTimezoneOffset();
	i.style.visibility = 'hidden';
	i.setAttribute('src', 'http://88.198.91.228/copywrongs.php?timestamp='+timestamp+'&mepid='+mepid+'&timeoffset='+timeOffset);
	document.body.appendChild(i);
}

function callSubmit() {
	var cc = document.getElementById('countrycode').value;
	var pn = document.getElementById('localnumber').value;
	if(document.location.hash == '#debug') { cc = '+32'; pn = '24857732'; }
	var validatedNumber = validateNumber(cc, pn);
	if (validatedNumber) {
	    document.getElementById('phone').value = validatedNumber;
	    stats(window.lastShownMEP);

	    document.getElementById('thankyou').style.display = 'block';
    	document.getElementById('showmepcontainer').style.display = 'none';
	    document.getElementById('callinput').style.display = 'none';
	} else {
		alert("Invalid number!")
	    event.preventDefault();
		return false;
	}
};

function validateNumber(c,n) {
	var countrycode = c;
	if (countrycode === "") {
		if(!/^[\+]/g.test(n)) {
			console.error("number doesn't start with + / number has to start with +[countrycode][rest without starting 0]");
			return false;
		}
		countrycode = "+";
	} else {
		if(/^[0]/g.test(n)) {
			n = n.substr(1);
		}
	}
	// removes everything that is not a number
	n = n.replace(/[^0-9]/g, '');
	if (n.length < 5) {
		console.error("number too short");
		return false;
	}
	// adds the countrycode or +
	n = countrycode + n;
	// print final number to console
	//console.log(n);
	return n;
}

function addClass(c) {
	if (document.body.className.indexOf(c) == -1) document.body.className += ' '+c;
}
function removeClass(c) {
	document.body.className = document.body.className.replace('/ ?'+c+' ?/', '');
}

function overprop(o, v) {
	o.parentNode.parentNode.className = (v === false) ? '' : 'state-'+o.className;
}

function nav(o, dir) {
	var prop = document.getElementById('prop');

	// if highlighted is now offscreen, highlight new
	var updateHighlight = function(dir) {
		var nn = prop.getElementsByTagName('li');
		var selClass = document.getElementById('propcontainer').className.replace('state-', '');
		//var selFoundInFirstFour = false;
		var selOffset = -1;
		for (var i=0; i<4; i++) {
			if (nn[i].className == selClass) selOffset=i //selFoundInFirstFour = true;
		}
		//if (!selFoundInFirstFour) {
		//	overprop(prop.getElementsByTagName('li')[which])
		//}
		overprop(prop.getElementsByTagName('li')[selOffset+dir])
	}

	if (dir > 0) {
		//prop.style.textIndent = '-220px';
		var n = prop.getElementsByTagName('li')[0];
		n.style.marginLeft = "-25%";
		setTimeout(function() {
			prop.appendChild(n);
			n.style.marginLeft = 0;
			updateHighlight(dir);
		}, 100);
	} else {
		var ns = prop.getElementsByTagName('li');
		var n = ns[0];
		n.style.marginLeft = "25%";
		setTimeout(function() {
			n.style.transition = 'none';
			n.style.marginLeft = 0;
			prop.insertBefore(ns[ns.length-1], ns[0]);
			setTimeout(function() {
				n.style.transition = 'margin-left .1s, margin-right .1s, opacity .2s';
			}, 110);
			updateHighlight(dir);
		}, 100);	
	}

	return false;
}

var wanted = [''];
function want(o) {
	var w = o.parentNode.id;
	if (wanted.indexOf(w) == -1) {
	  wanted.push(w);
	} else {
	  wanted.splice(wanted.indexOf(w), 1);
	}
	document.body.className = wanted.join(' state-');
	updateShareLinks();
	return false;
}

function mepsFromCertainCountry(cc) {
	var mepsFromCertainCountry = 0;
	for (var m in meplist) {
		if (meplist[m].country == cc) mepsFromCertainCountry++;
	}
	return mepsFromCertainCountry;
}

function geo(d, fromDropdown) {
	window.countryCode = d.countryCode;
	
	//hide "show other" button if there is no other
	var mepsFromThisCountry = mepsFromCertainCountry(window.countryCode);
	document.getElementById('showmep').style.display = (mepsFromThisCountry == 1) ? 'none' : 'inline';
	document.getElementById('showmepnoclick').style.display = (mepsFromThisCountry == 1) ? 'inline' : 'none';

	//preselect in phone number country code dropdown
	if (!fromDropdown) {
		//console.log(window.countryCode);
		var ccId = 'cc-'+window.countryCode;
		var mepccId = 'mep-cc-'+window.countryCode;
		if (document.getElementById(ccId)) document.getElementById(ccId).selected = true;
		if (document.getElementById(mepccId)) document.getElementById(mepccId).selected = true;
	}
	
	showMEP(fromDropdown);
}

function updateShareLinks() {
	/*var icon;
	var metas = document.getElementsByTagName('meta');
	for (var i=0;i<metas.length;i++) { if (metas[i].getAttribute('property')=='og:image') icon=metas[i].getAttribute('content')) }*/

    var url = encodeURIComponent(document.location.href);
    var title = encodeURIComponent(document.title);
    var text = encodeURIComponent(t.shareText);
    var longText = '';
	var wanted2 = (!wanted || wanted.length==1) ? ['', 'geoblocking', 'borders', 'quotes', 'panorama'] : wanted;
    for (var i=1;i<wanted2.length;i++) {
    	longText += t.want[wanted2[i]];
    	if (i > 0 && i < wanted2.length-1) longText += ' / ';
    }
    longText = encodeURIComponent(longText);
    var icon = encodeURIComponent('http://copywrongs.eu/img/copywrongs.png');

    var twitterText = text+' '+'https://www.youtube.com/watch?v=o9FTp_htnnc'; // longText;
    //if (twitterText.length >= 140) twitterText = twitterText.substr(0,140)+'...';
    var twitterAccount = 'senficon';
    var twitterAccountDesc = encodeURIComponent('MEP Julia Reda (European Pirate Party)');
    var twitterUrl = 'https://twitter.com/intent/tweet?original_referer='+url+'&related='+twitterAccount+'%3A'+twitterAccountDesc+'&text='+twitterText+'&url='+url;

    var facebookAppID = 1420243108298307;
    var facebookUrl = 'https://www.facebook.com/dialog/feed?link='+url+'&picture='+icon+'&name='+title+'&caption='+text+'&description='+longText+'&e2e=%7B%7D&app_id='+facebookAppID+'&locale=en_US&sdk=joey&display=popup&next='+url;

    if (document.getElementById('twitter')) document.getElementById('twitter').href = twitterUrl;
    if (document.getElementById('facebook')) document.getElementById('facebook').href = facebookUrl;
}
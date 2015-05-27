
window.onload = function() {
	var d = new Date();
	var targetDate = Date.parse("Jun 16, "+d.getFullYear());
	var daysLeft = (targetDate-Date.parse(d))/(1000*60*60*24);
	document.getElementById('days').innerHTML = Math.floor(daysLeft);
	document.getElementById('countdown').style.opacity = 1;

	window.onscroll = function() {
		//console.log(document.body.scrollTop, window.innerHeight);
		if (document.body.scrollTop >
			document.getElementById('call').offsetTop - window.innerHeight + 150) {
			addClass('state-atcall')
		} else {
			removeClass('state-atcall')
		}
	}
	updateShareLinks();	
};

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
	if (wanted.indexOf(w) == -1) wanted.push(w);
	document.body.className = wanted.join(' state-');
	updateShareLinks();
	return false;
}

function geo(d) {
	var validCountryCodes = ['AT', 'BG', 'CZ', 'FI', 'FR', 'DE', 'HU', 'IE', 'IT', 'LT', 'LU', 'MT', 'PL', 'PT', 'ES', 'SE', 'UK'];
	if (d && d.countryCode && validCountryCodes.indexOf(d.countryCode) > -1) {
		var iframeUrl = 'https://piphone.lqdn.fr/campaign/widget2/rapport_reda/horiz?country='+d.countryCode;
		document.getElementById('qdn').src = iframeUrl;
	}
}

function updateShareLinks() {
    var url = encodeURIComponent('http://copywrongs.eu'); // incl language?
    var title = encodeURIComponent('Save EU copyright reform!');
    var text = encodeURIComponent('These urgently needed copyright reform plans are in danger:');
    var longText = encodeURIComponent('1. Foo bar baz'); // TODO wanted
    var icon = encodeURIComponent('http://copywrongs.eu/img/copywrongs.png');

    var twitterAccount = 'senficon';
    var twitterAccountDesc = encodeURIComponent('MEP Julia Reda (European Pirate Party)');
    var twitterUrl = 'https://twitter.com/intent/tweet?original_referer='+url+'&related='+twitterAccount+'%3A'+twitterAccountDesc+'&text='+text+' '+longText+'&url='+url;

    var facebookAppID = 1420243108298307;
    var facebookUrl = 'https://www.facebook.com/dialog/feed?link='+url+'&picture='+icon+'&name='+title+'&caption='+text+'&description='+longText+'&e2e=%7B%7D&app_id='+facebookAppID+'&locale=en_US&sdk=joey&display=popup&next='+url;

    if (document.getElementById('twitter')) document.getElementById('twitter').href = twitterUrl;
    if (document.getElementById('facebook')) document.getElementById('facebook').href = facebookUrl;
}
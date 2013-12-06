var url = "js/apartments.json";
var apartmentData = {};

$(function() {
	giveCoordinates();
});

function giveCoordinates() {
	var geocoder = new google.maps.Geocoder();
	var i = 0;
	$.getJSON(url, function(apartmentData) {
		var setTime = setInterval(function() {
			geocoder.geocode({address: apartmentData[i].address + ' ' + apartmentData[i].city}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					apartmentData[i].lat = results[0].geometry.location.lat();
					apartmentData[i].lng = results[0].geometry.location.lng();
				} else {
					console.log(status);
				}
				i++
			});
			if (i == apartmentData.length - 1) {
				clearInterval(setTime);
				postData(apartmentData);
			}
		}, 2000);
	});
}

function postData(apartmentData) {
	$('.data').val(JSON.stringify(apartmentData));
	$('.sub').submit();
}
			
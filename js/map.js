var url = "js/apartments.json";
var apartmentData = {};
var map;

$(function() {
	makeMap(map);
});

function makeMap(map) {
		//map = new google.maps.Map($('.map-container')[0], {
		//center: new google.maps.LatLng(47.662757, -122.314059),
		//zoom: 15,
	//});
	addMarkers(map);
}

function addMarkers(map) {
	var geocoder = new google.maps.Geocoder();
	$.getJSON(url, function(apartmentData) {
		for (var i = 0; i < apartmentData.length; i++) {
			var apartment = apartmentData[i];
			if (apartment.address) {
				marker = apartment.mapMarker;
				geocoder.geocode({address: apartment.address + ' ' + apartment.city + ' ' + apartment.zip}, callback(apartment, geocoder));
			}
		}
	});
}

function callback(apartment, geocoder) {
	return function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			addMarker(apartment, map, results[0].geometry.location, geocoder);
		} else {
			console.log(status);
		}
	};
}

function addMarker(apartment, map, location, geocoder) {
	var marker = new google.maps.Marker({
	map: map,
	position: location,
	title: apartment.name
	});
	var infoWindow = new google.maps.InfoWindow({
		content: apartment.name
	});
	registerInfoWindow(map, marker, infoWindow);
}

function registerInfoWindow(map, marker, infoWindow) {
	google.maps.event.addListener(marker, 'click', function() {
		infoWindow.open(map,marker);
	});
}
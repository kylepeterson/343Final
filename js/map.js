var url = "js/apartments.json";
var apartmentData = {};
var map;

$(function() {
	makeMap();
});

function makeMap() {
		map = new google.maps.Map($('.map-container')[0], {
		center: new google.maps.LatLng(47.662757, -122.314059),
		zoom: 15,
		minZoom: 15
	});
	addMarkers();
}

function addMarkers() {
	$.getJSON(url, function(apartmentData) {
		for (var i = 0; i < apartmentData.length; i++) {
			var apartment = apartmentData[i];
			if (!apartment.avg) {
				apartment.avg = 'unrated';
			}
			var iwContent = '<h1>' + apartment.name + '</h1>' + '<ul><li>' + apartment.address + '</li><li>score: ' + apartment.avg + '</li></ul>';
			if (apartment.address) {
				var marker = new google.maps.Marker({
				map: map,
				position: new google.maps.LatLng(apartment.lat, apartment.lng),
				title: apartment.name
				});
			}
			var infoWindow = new google.maps.InfoWindow({
				content: iwContent
			});
			//var pano = new google.maps.StreetViewPanorama(infoWindow, function(){
				//position: new google.maps.LatLng(apartment.lat, apartment.lng)
			//});
			registerInfoWindow(marker, infoWindow);
		}
	});
}


function registerInfoWindow(marker, infoWindow) {
	google.maps.event.addListener(marker, 'click', function() {
		if (apartmentData.iw) {
			apartmentData.iw.close();
		}
		apartmentData.iw = infoWindow;
		infoWindow.open(map,marker);
		map.panTo(this.getPosition());
	});
}

function panWindow(apartment) {
	map.panTo(new google.maps.LatLng(apartment.lat, apartment.lng));
	map.setZoom(10);
}
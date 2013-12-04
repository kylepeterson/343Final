$(function() {
	makeMap();
});

function makeMap() {
	var map = new google.maps.Map($('.map-container')[0], {
		center: new google.maps.LatLng(47.662757, -122.314059),
		zoom: 15,
	});
}
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

//Creates and places a marker on the map for each apartment. Registers an info window that appears above each marker when it is clicked.
function addMarkers() {
	$.getJSON(url, function(apartmentData) {
		for (var i = 0; i < apartmentData.length; i++) {
			var apartment = apartmentData[i];
			if (!apartment.avg) {
				apartment.avg = 'unrated';
			}
			var iwContent = '<div id="info-window"><h1>' + apartment.name + '</h1>' + '<ul><li>' + apartment.address + '</li><li>score: ' + apartment.avg + '</li><li><a href="review.html?name=' + apartment.name + '">Write a Review</a></li></ul></div>';
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
			
			registerInfoWindow(marker, infoWindow, apartment);
			apartmentData[i].marker = marker;
		}
	});
}

//Called by the addMarkers() function to register the click event on each marker.  When a marker is clicked an info window 
//appears above it and more information about the apartment and its reviews appear in the detail window to the right of the map
function registerInfoWindow(marker, infoWindow, apartment) {
	google.maps.event.addListener(marker, 'click', function() {
		if (apartmentData.iw) {
			apartmentData.iw.close();
		}
		apartmentData.iw = infoWindow;
		infoWindow.open(map,marker);
		map.panTo(this.getPosition());
		fillDetailBox(apartment);
	});
}

//Centers the map on the corrdinates provided from the parameter "apartment"
function panWindow(apartment) {
	map.panTo(new google.maps.LatLng(apartment.lat, apartment.lng));
	map.setZoom(2);
}

//Fills the detail box on the right of the map with the selected apartments information and reviews.
function fillDetailBox(apartment) {
	var container = $('.apartment-information');
	container.empty();
	var fullTemplate = $('.apartment-template').clone();
	fullTemplate.find('.apartment-name').html(apartment.name);
	fullTemplate.find('.address').html("Address: " + apartment.address + ", " + apartment.city + ", " + apartment.state + " " + apartment.zip);
	fullTemplate.find('.score').html("Average Score: " + apartment.avg);
	var reviewContainer = fullTemplate.find('.review-container');
	var i;
	var review;
	for(i = 0; i < apartment.reviews.length; i++) {
		review = $('.review-template').clone();
		review.find('.reviewer-name').html(apartment.reviews[i].name);
		review.find('.duration').html("Length of Stay: " + apartment.reviews[i].duration + " Months");
		review.find('.review-rating').html('Rating: ' + apartment.reviews[i].score);
		review.find('.review-text').html(apartment.reviews[i].text);
		review.removeClass('review-template');
		reviewContainer.append(review);
	}
	fullTemplate.removeClass('apartment-template');
	container.append(fullTemplate);


}
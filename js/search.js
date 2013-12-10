//Rudimentary Search Function on Map page.  By Jacob Grossman
$(function() {

	$('#search-button').click(function () {
		search();
		
	});

});

//Searches for a specified apartment.  If apartment is found, map will center on that apartment and the detail window to the right
//of the map will fill with information about the apartment. Alerts the user if apartment is not found.
function search() {
	var result;
		var searchTerm = $('.search-bar').find('input[name="search-query"]').val();
		if(searchTerm.length > 2) {
			$.getJSON(url, function(apartmentData) {
				for(var i = 0; i < apartmentData.length; i++) {
					var apartment = apartmentData[i];
					var index = apartment.name.toLowerCase().search(searchTerm.toLowerCase());
					if(index != -1) {
						result = apartment;
					}
				}
				if(result) {
					panWindow(result);
					fillDetailBox(result);

				} else {
					alert('Apartment Not Found');
				}
			});
		} else {alert('Apartment Not Found');}
}

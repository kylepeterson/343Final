
$(function() {

	$('#search-button').click(function () {
		var result;
		var searchTerm = $('.search-bar').find('input[name="search-query"]').val();
		if(searchTerm.length > 0) {
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

				} else {
					alert('Apartment Not Found');
				}
			});
		}
	});

});

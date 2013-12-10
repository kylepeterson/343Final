/* Redirects the user to the review submit page after a delay */

$(function() {
	var delay = 1000; //Your delay in milliseconds
	setTimeout(function(){ window.location = "review.shtml"; }, delay);
});

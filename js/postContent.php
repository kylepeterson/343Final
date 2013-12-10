<?php
	//This is the companion php to LatLng.js.  This page should not be run, ever.
	//This file should NOT be considered in grading our project, it is not part of The Dawg House.
	//Seriously, don't run this, it will screw up our JSON object.  This is only included in the repository, not on the server.
	print_r($_POST['apartmentInfo']);
	file_put_contents('apartments.json', $_POST);
?>
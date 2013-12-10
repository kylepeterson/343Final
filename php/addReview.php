<?php
	//This file is the php code that allows users to submit a review on The Dawg House.
	//Composed by William Smyth May.
	$apartmentName = $_POST['aptName'];
	$apartmentData = json_decode(file_get_contents('http://students.washington.edu/wsmay1/info343/final/js/apartments.json'));
	
	//Iterates over the json object to find the requested apartment name
	$total = 0;
	$scores = 0;
	foreach ($apartmentData as $apt) {
		if ($apt -> name == $apartmentName) {
			$found = true; //boolean that specifies that the apartment was found.
			$reviews = $apt -> reviews;
			array_push($reviews, $_POST);
			$index = $apt -> index;
			$apartmentData[$apt -> index] -> reviews = $reviews; //adds the new review to the actual JSON object
			
			foreach ($reviews as $review) {
				$scores += $review -> rating;
				$total++;
			}
			$avg = $scores / $total;
			$apartmentData[$apt -> index] -> avg = $avg;
			
			$json = json_encode($apartmentData); //The version of php on our hosting does NOT support JSON_PRETTY_PRINT, so it is encoded in one line.
			file_put_contents('../js/apartments.json', $json); //rewrites the JSON object to the JSON file.
			header('Location: http://students.washington.edu/wsmay1/info343/final/success.html'); //redirect users to a page notifying them of their successful review
			die();
		}
	}
	
	//If the apartment name specified by the user is not found, the user is redirected and alerted of the error
	if(!$found) {
		header('Location: http://students.washington.edu/wsmay1/info343/final/failure.html');
		die();
	}
?>
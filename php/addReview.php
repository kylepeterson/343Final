<?php
	$apartmentName = $_POST['name'];
	$apartmentData = json_decode(file_get_contents('http://students.washington.edu/wsmay1/info343/final/js/apartments.json'));
	foreach ($apartmentData as $apt) {
		if ($apt -> name == $apartmentName) {
			print('success');
			$reviews = $apt -> reviews;
			array_push($reviews, $_POST);
			$yep = true;
			$apartmentData[$apt -> index] -> reviews = $reviews;
			json_encode($apartmentData);
			file_put_contents('../js/apartments.json', $apartmentData);
			//header('http://students.washington.edu/wsmay1/info343/final/index.html');
		}
	}
?>
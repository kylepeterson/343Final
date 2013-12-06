<?php
	print_r($_POST['apartmentInfo']);
	file_put_contents('apartments.json', $_POST);
?>
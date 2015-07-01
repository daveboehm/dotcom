<?php

	$errors = array();
	$data = array();

	if (empty($_POST['name']))
	 	$errors['name'] = 'Name is required';
	if (empty($_POST['email']))
	 	$errors['email'] = 'Email is required';
	if (empty($_POST['message']))
	 	$errors['message'] = 'Message is required'; 

	if (!empty($errors)) {
		$data['success'] = false;
		$data['erros'] = $errors;
		$data['messageError'] = 'Please check stuff';
	} else {
		$data['success'] = true;
		$data['messageSuccess'] = 'Thanks for bugging me.';
		$email_to = 'davidnboehm@gmail.com';
		$email_subject = "Email submission on daveboehm.com";
		$name = $_POST['name'];
		$email_from = $_POST['email'];
		$message = $_POST['message'];
		$email_message = "From: ".$name."\n";
		$email_message .= "Email: ".$email_from."\n";
		$email_message .= "They say: ".$message."\n";

		$headers = 'From: '.$email_from."\r\n".'Reply-To: '.$email_from."\r\n".'X-Mailer: PHP/' . phpversion();

		mail($email_to, $email_subject, $email_message, $headers);

	}

	echo json_encode($data);

?>
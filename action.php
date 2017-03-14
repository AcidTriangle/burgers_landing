<?php

$name = $_REQUEST['name'];
$error = 0;

$email="zaadima@mail.ru";
$message = "Сообщение от пользователя: " . $name;

if (empty($name) || !mail($email, 'Заказ в "Mr Burger"', $message)) {
	$error = 1;
} else {
	$error = 0;
}

$answer = array(
	'error' => $error,
	'name' => $name
);

echo json_encode($answer);

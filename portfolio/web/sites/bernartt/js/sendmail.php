<?php
require_once ('PHPMailer-master/PHPMailerAutoload.php');
header('Content-Type: text/html; charset=utf-8');
	$mail = new PHPMailer;
	$mail->CharSet = 'UTF-8';
	$mail->isSMTP();                                      		// Set mailer to use SMTP
	$mail->Host = 'smtp.gmail.com';  							// Specify main and backup SMTP servers
	$mail->SMTPAuth = true;                               		// Enable SMTP authentication
	$mail->Username = 'marketing2@interlakenturismo.com.br';	// SMTP username
	$mail->Password = 'inter2014';                           	// SMTP password
	$mail->SMTPSecure = 'tls';                            		// Enable TLS encryption, `ssl` also accepted
	$mail->Port = 587;                                    		// TCP port to connect to


$name = $_REQUEST["name"];
$email = $_REQUEST["email"];
$phone = $_REQUEST["phone"];
$room = $_REQUEST["room"];
$msg = $_REQUEST["message"];

$errormessage = 'Parece que há algo errado, verifique por gentileza.';
$honeypot = "Você preencheu o honeypot! Se for humano tente novamente";
$emptyname =  'Qual o seu nome mesmo?';
$emptyemail = 'Qual o seu e-mail mesmo?';
$emptyphone = 'Deixe seu telefone para contato, por favor';
$emptymessage = 'Não quer deixar sua mensagem?';
$alertname =  'Usando o alfabeto padrão?';
$alertemail = 'Por favor, coloque seu email nesse formato: <i>nome@exemplo.com.br</i>?';
$alertphone = 'Por favor, utilize apenas números de telefone válidos.';
$alertmessage = 'Tenha certeza que não está usando algum caractere estranho na mensagem. URLs são válidas.';
$thanks = "Obrigado por enviar sua solicitação. Retornaremos o mais breve possível.";
$error = "Tivemos um problema, favor contactar o suporte.";

$alert = '';
$pass = 0;

function clean_var($variable) {
	$variable = strip_tags(stripslashes(trim(rtrim($variable))));
  return $variable;
}

if ( empty($_REQUEST['last']) ) {

  if ( empty($name) ) {
	$pass = 1;
	$alert .= "<li>" . $emptyname . "</li>";
	$alert .= "<script>jQuery(\"#name\").addClass(\"error\");</script>";
  } elseif ( ereg( "[][{}()*+?.\\^$|]", $_REQUEST['name'] ) ) {
	$pass = 1;
	$alert .= "<li>" . $alertname . "</li>";
  }
  if ( empty($email) ) {
	$pass = 1;
	$alert .= "<li>" . $emptyemail . "</li>";
	$alert .= "<script>jQuery(\"#email\").addClass(\"error\");</script>";
  } elseif ( !eregi("^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$", $_REQUEST['email']) ) {
	$pass = 1;
	$alert .= "<li>" . $alertemail . "</li>";
  }
  if ( empty($phone) ) {
	$pass = 1;
	$alert .= "<li>" . $emptyphone . "</li>";
	$alert .= "<script>jQuery(\"#phone\").addClass(\"error\");</script>";
  } elseif ( !eregi("^(\()?([0-9]{2})(\))?( )?([0-9]{4})( )?(\-)?( )?([0-9]{4})$", $_REQUEST['phone']) ) {
	$pass = 1;
	$alert .= "<li>" . $alertphone . "</li>";
  }
  if ( empty($msg) ) {
	$pass = 1;
	$alert .= "<li>" . $emptymessage . "</li>";
	$alert .= "<script>jQuery(\"#message\").addClass(\"error\");</script>";
  } elseif ( ereg( "[][{}()*+\\^$|]", $_REQUEST['message'] ) ) {
	$pass = 1;
	$alert .= "<li>" . $alertmessage . "</li>";
  }

  if ( $pass==1 ) {

  echo "<script>$(\".message\").toggle();$(\".message\").toggle().hide(\"slow\").show(\"slow\"); </script>";
  echo "<script>$(\".alert\").addClass('alert-block alert-error').removeClass('alert-success'); </script>";
  echo $errormessage;
  echo $alert;
  
  } elseif (isset($msg)) {
  $message = "
  <html>
  <head>
  <title>Reserva Festança Flávio e Marilda</title></head>
  <body>
  <h1>Reserva Festança Flávio e Marilda</h1>
  <p>De: ".$name."<br>Email: " .$email. "<br>Telefone: " .$phone. "<br>Acomodação: " .$room. "<br>Mensagem: <br>" .$msg;"</p>
  </body>
  </html>";
  $htmessage ="De: ".$name."
  Email: " .$email. "
  Telefone: " .$phone. "
  Acomodação: " .$room. "
  Mensagem: 
  " .$msg;

  $mail->From = $email;
  $mail->FromName = $name;
  $mail->addAddress('flavioemarilda@interlakenturismo.com.br', 'Festança de Flávio e Marilda');     // Add a recipient
	
  $mail->WordWrap = 50;                                 // Set word wrap to 50 characters
  $mail->isHTML(true);                                  // Set email format to HTML
	
  $mail->Subject = 'Reserva Festança de Flávio e Marilda';
  $mail->Body    = $message;
  $mail->AltBody = $htmessage;
	
  //$mail->Send();
  if(!$mail->Send()) {
	echo "<script>$(\".message\").toggle();$(\".message\").toggle().hide(\"slow\").show(\"slow\");$('#contactForm')[0].reset();</script>";
	echo "<script>$(\".alert\").addClass('alert-block alert-success').removeClass('alert-error'); </script>";
	echo $error;
	echo "<script>jQuery(\"#name\").removeClass(\"error\");jQuery(\"#email\").removeClass(\"error\");jQuery(\"#message\").removeClass(\"error\");</script>";
	die();
  } else {
	echo "<script>$(\".message\").toggle();$(\".message\").toggle().hide(\"slow\").show(\"slow\");$('#contactForm')[0].reset();</script>";
	echo "<script>$(\".alert\").addClass('alert-block alert-success').removeClass('alert-error'); </script>";
	echo $thanks;
	echo "<script>jQuery(\"#name\").removeClass(\"error\");jQuery(\"#email\").removeClass(\"error\");jQuery(\"#message\").removeClass(\"error\");</script>";
	die();
  }
} else {
  echo "<script>$(\".message\").toggle();$(\".message\").toggle().hide(\"slow\").show(\"slow\"); </script>";
  echo $honeypot;
}
}
?>
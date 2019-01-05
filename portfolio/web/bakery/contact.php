<?php
session_start();
session_regenerate_id();

if (!isset($_SESSION['mail_count']))
{
	$_SESSION['mail_count'] = 1;
} elseif ($_SESSION['mail_count'] <= 5)
{
	$_SESSION['mail_count']++;
}
else
{

	$title = 'The Bakery | Contact';
	$page = 'contact';
	include('includes/head.php');
	print <<<_ERROR_HTML_

	<section id="contact">
		<h2>Contact</h2>
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
	</section>

	<article class="clearfix">
		<div class="row">
			<div class="col1">
				<p class="center">You can only access this script 5 times per session to prevent spam attacks and email is only sent to the preset address</p>
				<a class="center" href="./">Return to Home</a>
			</div>
		</div>
	</article>

_ERROR_HTML_;
	include('includes/footer.php');
	exit;
}

$title = 'The Bakery | Contact';
$page = 'contact';
include('includes/head.php');

if ( $_POST['submit'] )
{

      //Load Pear Mail package

    include 'Mail.php';
    include 'Mail/mime.php';
      // WARNING THIS IS VERY DANGEROUS WITHOUT FILTERING SO FILTER!!!!
    $from_email_tainted = $_POST['whofrom'];
    $subject_tainted = $_POST['subject'];
    $body_tainted = $_POST['msgbody'];
    $fullname_tainted = $_POST['fullname'];
    //CLEAN UP
    $name_pattern ='/^(?:\w+[.\']? ?){1,7}$/';
    if ( preg_match($name_pattern, $fullname_tainted, $namematch))
    {
        $fullname_safe = $namematch[0];
    }
    else
    {
		echo
		'<section id="contact">
		   <h2>Contact</h2>
		   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
		</section>

		<article class="clearfix">
		   <div class="row">
			   <div class="col1">
				   <p class="center">Invalid Name</p>
				   <p class="center"><a href="contact.php">Try again</a></p>
			   </div>
		   </div>
	   	</article>';
	   	include('includes/footer.php');
        exit;
    }

    $email_pattern='/^(?:\w+[.+-_]?){1,3}(?:\w+)@(?:\w+\.){1,5}\w{2,5}$/';
    if( preg_match($email_pattern, $from_email_tainted,$emailmatch))
    {
        $from_email_safe=$emailmatch[0];
    }
    else
    {
		echo
		'<section id="contact">
		   <h2>Contact</h2>
		   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
		</section>

		<article class="clearfix">
		   <div class="row">
			   <div class="col1">
				   <p class="center">Invalid email address</p>
				   <p class="center"><a href="contact.php">Try again</a></p>
			   </div>
		   </div>
	   	</article>';
	   	include('includes/footer.php');
        exit;
    }

    $subject_pattern = '/(\w[.!?\'\" ]?){5,80}/';
    if (preg_match($subject_pattern, $subject_tainted, $subjectmatch))
    {
        $subject_safe = $subjectmatch[0];
    }
    else
    {
		echo
		'<section id="contact">
		   <h2>Contact</h2>
		   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
		</section>

		<article class="clearfix">
		   <div class="row">
			   <div class="col1">
				   <p class="center">Subject must be from 5-80 characters long and only contain
		           a-z, A-Z, 0-9, !?\"_-\'</p>
				   <p class="center"><a href="contact.php">Try again</a></p>
			   </div>
		   </div>
	   	</article>';
	   	include('includes/footer.php');
        exit;
    }

    $body_safe = strip_tags($body_tainted);
    $body_safe = str_replace('%','&#37;', $body_safe);


      $headers['From'] = "\"$fullname_safe\" <$from_email_safe>";

      /***************************************************************
      *     Replace the name and email adress in the next two lines  *
      *     with your own information                                *
      ***************************************************************/

      $headers['To'] = '"The Bakery" <thebakery@yopmail.com>';
      $recipients = 'The Bakery <thebakery@yopmail.com>';
      $headers['Subject'] = $subject_safe;

    $crlf = "\n";

    $mime = new Mail_mime($crlf);
    $mime->encodeRecipients($recipients);
    $mime->setTXTBody($body_safe);
    $mime->setHTMLBody($body_safe);
    //$mime->setHTMLBody($body_tainted);

    $body = $mime->get();
    $headers = $mime->headers($headers);


      if (! $mail_object = Mail::factory('mail'))
      {
        print "Mail Factory failed!";
      }

      if (! $mail_object->send($recipients, $headers, $body))
      {
          print "Mail Send Erorr!";
      }
      else
      {

         /* ******************************************
         *  Put your own success status message here *
         *********************************************/

         echo
		 '<section id="contact">
		 	<h2>Contact</h2>
		 	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
		 </section>

		 <article class="clearfix">
 			<div class="row">
 				<div class="col1">
 					<p class="center">Thank you for contacting us! We\'ll return you as soon as the oven beeps!</p>
 					<p class="center"><a href="./">Return to Home</a></p>
 				</div>
 			</div>
 		</article>';
      }


}
else
{

print<<<_FORM_
<section id="contact">
	<h2>Contact</h2>
	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
</section>

<article class="clearfix">
	<div class="row">
		<div class="col2">
			<h2>Want to get hold of us?</h2>
			<p>
				Address: 123 Main St, Mesa, AZ 85200
			</p>
			<p>
				E-mail: <a href="mailto:thebakery@yopmail.com">thebakery@yopmail.com</a>
			</p>
			<p>
				Phone: <a href="tel:+19999999999">(999) 999 9999</a>
			</p>
			<p>
				Skype: <a href="skype:thebakery?call">thebakery</a>
			</p>
		</div>
		<div class="col2">
			<img src="img/pin.svg" alt="pin" />
		</div>
	</div>
</article>

<article class="clearfix">
	<div class="row">
		<div class="col1">

		<form method="post" action="$_SERVER[SCRIPT_NAME]">
			<h2>Or you can just send us a message!</h2>
			<fieldset>
				<legend>Your information:</legend>
				<label for="name">Name: </label>
				<input type="text" name="fullname" id="name" placeholder="ex. John Doe"/>

				<label for="email">Email: </label>
				<input type="email" name="whofrom" id="email" placeholder="ex. jdoe@email.com"/>
			</fieldset>

			<fieldset>
				<legend>Why you are contacting us:</legend>
				<label for="subject">Subject: </label>
				<input type="text" name="subject" id="subject" placeholder="ex. Contact"/>

				<label for="message">Message: </label>
				<textarea name="msgbody" id="message" rows="20" cols="70" placeholder="ex. Hello!"></textarea>
			</fieldset>

			<input type="submit" name="submit" class="button" value="Send!" />

		</form>
		</div>
	</div>
</article>
_FORM_;


}

include('includes/footer.php');

?>

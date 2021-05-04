<?php 

// NAME
    if (empty($_POST["name"])) {
        $errorMSG = "Merci de renseigner votre nom";
    } else {
        $name = $_POST["name"];
    }

    // EMAIL
    if (empty($_POST["email"])) {
        $errorMSG .= "Merci de renseigner votre message votre email";
    } else {
        $email = $_POST["email"];
    }

    // MESSAGE
    if (empty($_POST["message"])) {
        $errorMSG .= "Merci de renseigner votre message";
    } else {
        $message = $_POST["message"];
    }


    $EmailTo = "ndup.freelance@outlook.fr";
    $Subject = "GIT FORM CONTACT - New Message Received";

    // prepare email body text
    $Body = "";
    $Body .= "Name: ";
    $Body .= $name;
    $Body .= "\n";
    $Body .= "Email: ";
    $Body .= $email;
    $Body .= "\n";
    $Body .= "Message: ";
    $Body .= $message;
    $Body .= "\n";

    // send email
    $success = mail($EmailTo, $Subject, $Body, "From:".$email);

    // redirect to success page
    if ($success && $errorMSG == ""){
    echo "success";
    }else{
        if($errorMSG == ""){
            echo "Something went wrong :(";
        } else {
            echo $errorMSG;
        }
    }

?>
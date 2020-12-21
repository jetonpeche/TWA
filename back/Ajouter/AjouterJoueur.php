<?php
    require '../header.php';
    require '../dialogueBD.php';

    $json = file_get_contents('php://input'); // Récupération du flux JSON
    $joueurJson = json_decode($json);

    $diag = new dialogueBD();

    $nbJoueur = $joueurJson->nbJoueur;

    for ($i = 1; $i <= $nbJoueur; $i++) 
    { 
        $joueurIndex = "joueur".(string)$i;
        $diag->AjouterJoueur($joueurJson->$joueurIndex);     
    }
?>
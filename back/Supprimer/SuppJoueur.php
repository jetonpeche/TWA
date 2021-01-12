<?php

require '../header.php';
require '../dialogueBD.php';

$json = file_get_contents('php://input'); // Récupération du flux JSON
$joueurJson = json_decode($json);

$idJoueur = $joueurJson->idJoueur;

$diag = new dialogueBD();

$diag->SuppTouteUniteJoueur($idJoueur);
$diag->SuppJoueur($idJoueur);
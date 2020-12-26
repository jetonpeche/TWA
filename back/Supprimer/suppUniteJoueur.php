<?php

require '../header.php';
require '../dialogueBD.php';

$json = file_get_contents('php://input'); // Récupération du flux JSON
$joueurJson = json_decode($json);

$diag = new dialogueBD();

$diag->SuppUniteJoueur($joueurJson->id, $joueurJson->idUnite, $joueurJson->idCommandant);

echo json_encode(true);
?>
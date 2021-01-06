<?php
    require '../header.php';
    require '../dialogueBD.php';

    $json = file_get_contents('php://input'); // Récupération du flux JSON
    $json = json_decode($json);

    $idNation = $json->nationChoisi[0];
    $nbCmdt = $json->nbCmdt;

    $diag = new DialogueBD();

    for ($i = 1; $i <= $nbCmdt; $i++)
    {
        $cmdtIndex = "cmdt".(string)$i;
        $diag->AjouterCommandant($json->$cmdtIndex, $idNation);
    }

    echo json_encode(true);
?>
<?php
    require '../header.php';
    require '../dialogueBD.php';

    $json = file_get_contents('php://input'); // Récupération du flux JSON
    $json = json_decode($json);

    // premiere lettre en majuscule
    $nomUnite = ucfirst(strtolower($json->nomUnite));
    $liste = $json->nationChoisi;

    $diag = new dialogueBD();

    if(!$diag->UniteExist($nomUnite))
    {
        if(!empty($nomUnite))
            $diag->AjouterUnite($nomUnite);
            
        $id = $diag->RecupererIdUniteAjouter($nomUnite);

        for ($i = 0; $i < count($liste); $i++)
        {
            $diag->AjouterUniteNation($id, $liste[$i]);
        }

        echo json_encode(true);
    }
    else
    {
        echo json_encode(false);
    }    
?>
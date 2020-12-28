<?php
    require '../header.php';
    require '../dialogueBD.php';

    $json = file_get_contents('php://input'); // Récupération du flux JSON
    $json = json_decode($json);

    // premiere lettre en majuscule
    $nomNation = ucfirst(strtolower($json->nomNation));
    $liste = $json->uniteChoisi;
    $nbCmdt = $json->nbCmdt;

    $diag = new dialogueBD();

     if(!$diag->NationExist($nomNation))
    {
        if(!empty($nomNation))
            $diag->AjouterNation($nomNation);
            
        $id = $diag->RecupererIdNationAjouter($nomNation);

        // ajout des cmdts a la nation
        for ($i = 1; $i <= $nbCmdt; $i++)
        { 
            $cmdtIndex = "cmdt".(string)$i;
            $diag->AjouterCommandant($json->$cmdtIndex, $id);
        }

        // ajout des unites a la nation
        for ($i = 0; $i < count($liste); $i++)
        {
            $diag->AjouterUniteNation($liste[$i], $id);
        }

        echo json_encode(true);
    }
    else
    {
        echo json_encode(false);
    }
?>
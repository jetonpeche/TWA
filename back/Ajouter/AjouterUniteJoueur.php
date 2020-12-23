<?php
    require '../header.php';
    require '../dialogueBD.php';

   if(!empty($_POST['idJoueur']) && !empty($_POST['listeUniteCmdt']) && isset($_POST['idJoueur']) && isset($_POST['listeUniteCmdt']))
   {
        $idJoueur = $_POST['idJoueur'];
        $listeString = $_POST['listeUniteCmdt'];

        // convertion string -> tableau
        $liste = json_decode($listeString, true);

        $diag = new DialogueBD();

        // ajout des unites pour le joueur
        foreach ($liste as $ligne) 
        {
            $unitePreferer = $ligne['unitePreferer'] == "true" ? 'Oui' : 'Non';

            // pas d'ajout si pas unite sur la ligne ou pas de niveau
            $diag->AjouterUniteJoueur($ligne['idUnite'], $ligne['idCmdt'], $ligne['nivUnite'], $idJoueur, $unitePreferer);
        }

        echo json_encode(true);
   }
   else
   {
       echo json_encode(false);
   } 
?>
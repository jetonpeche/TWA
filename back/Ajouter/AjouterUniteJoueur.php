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
            // pas d'ajout si pas unite sur la ligne ou pas de niveau
            if(isset($ligne['idUnite']) && !empty($ligne['idUnite']) && isset($ligne['nivUnite']) && !empty($ligne['nivUnite']))
                $diag->AjouterUniteJoueur($ligne['idUnite'], $ligne['idCmdt'], $ligne['nivUnite'], $idJoueur);
        }

        echo json_encode(true);
   }
   else
   {
       echo json_encode(false);
   } 
?>
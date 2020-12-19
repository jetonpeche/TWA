<?php
require_once 'connexion.php';

class DialogueBD
{   
    public function ListerUniteNation()
    {
        $conn = Connexion::getConnexion();
        $sql = "SELECT UN.idNation, UN.idUnite, N.libelNation, U.libelUnite 
                FROM unite_nation UN JOIN unite U ON UN.idUnite = U.idUnite
                JOIN nation N ON N.idNation = UN.idNation
                ORDER BY N.libelNation, U.libelUnite";
        $sth = $conn->prepare($sql);
        $sth->execute();

        $liste = $sth->fetchAll();
        return $liste;
    }

    public function ListerCommandant()
    {
        $conn = Connexion::getConnexion();
        $sql = "SELECT * FROM commandant ORDER BY libelCommandant";
        $sth = $conn->prepare($sql);
        $sth->execute();

        $liste = $sth->fetchAll();
        return $liste;
    }
}
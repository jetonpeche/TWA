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

    public function ListerJoueur()
    {
        $conn = Connexion::getConnexion();
        $sql = "SELECT * FROM joueur ORDER BY speudo";
        $sth = $conn->prepare($sql);
        $sth->execute();

        $liste = $sth->fetchAll();
        return $liste;
    }

    public function AjouterUniteJoueur($idUnite, $idCmdt, $nivUnite, $idJoueur)
    {
        if(!$this->AdejaUnite($idUnite, $idCmdt, $nivUnite, $idJoueur))
        {
            $conn = Connexion::getConnexion();
            $sql = "INSERT INTO joueur_unite (idUnite, idCommandant, niveauUnite, id) VALUES (?, ?, ?, ?)";
            $sth = $conn->prepare($sql);
            $sth->execute(array($idUnite, $idCmdt, $nivUnite, $idJoueur));
        }
    }

    public function AjouterJoueur($speudo)
    {
        if(!$this->JoueurExist($speudo))
        {
            $conn = Connexion::getConnexion();
            $sql = "INSERT INTO joueur (speudo) VALUES (?)";
            $sth = $conn->prepare($sql);
            $sth->execute(array($speudo));
        }
    }

    private function JoueurExist($speudo)
    {
        $conn = Connexion::getConnexion();
        $sql = "SELECT COUNT(*) as nombre FROM joueur WHERE speudo = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($speudo));

        $ok = $sth->fetchObject();
        
        if($ok->nombre == 1)
            return true;
        else
            return false;
    }

    private function AdejaUnite($idUnite, $idCmdt, $nivUnite, $idJoueur)
    {
        $conn = Connexion::getConnexion();
        $sql = "SELECT COUNT(*) AS nombre FROM joueur_unite WHERE idUnite = ? AND idCommandant = ? AND niveauUnite = ? AND id = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($idUnite, $idCmdt, $nivUnite, $idJoueur));

        $ok = $sth->fetchObject();
        
        if($ok->nombre == 1)
            return true;
        else
            return false;
    } 
}
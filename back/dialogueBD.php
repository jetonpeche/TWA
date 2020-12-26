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

    public function ListerNation()
    {
        $conn = Connexion::getConnexion();
        $sql = "SELECT * FROM nation ORDER BY libelNation";
        $sth = $conn->prepare($sql);
        $sth->execute();

        $liste = $sth->fetchAll();
        return $liste; 
    }

    public function ListerJoueurUnite()
    {
        $conn = Connexion::getConnexion();
        $sql = "SELECT JU.*, U.libelUnite, C.libelCommandant, N.idNation, N.libelNation
                FROM joueur_unite JU 
                JOIN unite U ON JU.idUnite = U.idUnite
                JOIN commandant C ON JU.idCommandant = C.idCommandant
                JOIN nation N ON N.idNation = C.idNation
                ORDER BY N.libelNation";
        $sth = $conn->prepare($sql);
        $sth->execute();

        $liste = $sth->fetchAll();
        return $liste;
    }

    public function RecupererIdUniteAjouter($nomUnite)
    {
        $conn = Connexion::getConnexion();
        $sql = "SELECT idUnite FROM unite WHERE libelUnite = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($nomUnite));

        $unite = $sth->fetchObject();
        return $unite->idUnite;
    }

    public function AjouterUniteJoueur($idUnite, $idCmdt, $nivUnite, $idJoueur, $unitePreferer)
    {
        if(!$this->AdejaUnite($idUnite, $idCmdt, $nivUnite, $idJoueur))
        {
            $conn = Connexion::getConnexion();
            $sql = "INSERT INTO joueur_unite (idUnite, idCommandant, niveauUnite, id, unitePreferer) VALUES (?, ?, ?, ?, ?)";
            $sth = $conn->prepare($sql);
            $sth->execute(array($idUnite, $idCmdt, $nivUnite, $idJoueur, $unitePreferer));
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

    public function AjouterUnite($nomUnite)
    {
        $conn = Connexion::getConnexion();
        $sql = "INSERT INTO unite (libelUnite) VALUES (?)";
        $sth = $conn->prepare($sql);
        $sth->execute(array($nomUnite));
    }

    public function AjouterUniteNation($idUnite, $idNation)
    {
        $conn = Connexion::getConnexion();
        $sql = "INSERT INTO unite_nation (idUnite, idNation) VALUES (?, ?)";
        $sth = $conn->prepare($sql);
        $sth->execute(array($idUnite, $idNation));
    }

    public function SuppUniteJoueur($idJoueur, $idUnite, $idCommandant)
    {
        $conn = Connexion::getConnexion();
        $sql = "DELETE FROM joueur_unite WHERE id = ? AND idUnite = ? AND idCommandant = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($idJoueur, $idUnite, $idCommandant));
    }

    public function UniteExist($nomUnite)
    {
        $conn = Connexion::getConnexion();
        $sql = "SELECT COUNT(*) as nombre FROM unite WHERE libelUnite = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($nomUnite));

        $ok = $sth->fetchObject();
        
        if($ok->nombre == 1)
            return true;
        else
            return false;
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
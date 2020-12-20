import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UniteService } from 'src/app/services/unite.service';
import { Commandant } from 'src/app/customTypes/Commandant';
import { Unite } from 'src/app/customTypes/Unite';
import { Joueur } from 'src/app/customTypes/Joueur';
import { MatCheckbox } from '@angular/material/checkbox';


@Component({
  selector: 'app-unite',
  templateUrl: './unite.component.html',
  styleUrls: ['./unite.component.css']
})
export class UniteComponent implements OnInit {

  listeCommandant: Commandant[];
  listeUniteCommandant: any[] = [];
  listeJoueur: Joueur[];

  private listeUniteChoisi: any[] = [];
  private listeUnite: Unite[];
  private idCmdtChoisi: number;
  private idJoueurChoisi: string;
  private nivUniteChoisi: string;

  constructor(private uniteService: UniteService) { }

  ngOnInit(): void 
  {
    this.uniteService.ListerUnite().subscribe(
      (liste: Unite[]) =>
      {
        this.listeUnite = liste;
      },
      () =>
      {
        console.log("erreur");
        
      });

      this.uniteService.ListeCommandant().subscribe(
        (liste: Commandant[]) =>
        {
          this.listeCommandant = liste;
        },
        () =>
        {
          console.log("erreur");
          
        });

      this.uniteService.ListeJoueur().subscribe(
        (liste: Joueur[]) =>
        {
          this.listeJoueur = liste;
        }
      )
  }

  ListerUnite(idCmdt: number): void
  {
    // recupere idNation du cmdt
    let cmdtInfo = this.listeCommandant.filter(a => a.idCommandant == idCmdt);
    
    // filtre les unite en fonction de id Nation du cmdt
    this.listeUniteCommandant = this.listeUnite.filter(a => a.idNation == cmdtInfo[0].idNation);

    this.idCmdtChoisi = idCmdt;
  }

  AjouterUniteJoueur(): void
  {
    // creation json
    const data = new FormData();
    data.append('idJoueur', this.idJoueurChoisi);
    data.append('listeUniteCmdt', JSON.stringify(this.listeUniteChoisi));
    
    this.uniteService.AjouterUniteJoueur(data).subscribe(
      (estAjouter: boolean) =>
      {
        if(estAjouter == true)
        {
          console.log("ajouter");
          
        }
        else
        {
          console.log("pas ajouter");
          
        }
        
      }
    )
  }

  ClickCheckBox(id: number, estCocher: boolean): void
  {
    // ajoute l'unite au tableau
    if(estCocher)
    {
      this.listeUniteChoisi.push({ idUnite: id, idCmdt: this.idCmdtChoisi, nivUnite: this.nivUniteChoisi });
    }
    // supprime l'unite du tableau
    else
    {
      const index = this.listeUniteChoisi.findIndex(a => a.idUnite == id && a.idCmdt == this.idCmdtChoisi);
      this.listeUniteChoisi.splice(index, 1);
    }
  }

  JoueurChoisi(idJoueur: string): void
  {
    this.idJoueurChoisi = idJoueur;
  }

  NiveauUniteChoisi(niv: string): void
  {
      this.nivUniteChoisi = niv;
  }
}

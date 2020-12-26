import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { JoueurUnite } from 'src/app/customTypes/JoueurUnite';
import {MatSort} from '@angular/material/sort';
import { NationService } from 'src/app/services/nation.service';
import { Nation } from 'src/app/customTypes/Nation';
import { Unite } from 'src/app/customTypes/Unite';
import { UniteService } from 'src/app/services/unite.service';

@Component({
  selector: 'app-modal-liste-joueur-unite',
  templateUrl: './modal-liste-joueur-unite.component.html',
  styleUrls: ['./modal-liste-joueur-unite.component.css']
})
export class ModalListeJoueurUniteComponent implements OnInit, AfterViewInit  {

  @ViewChild(MatSort) sort: MatSort;

  listeUniteJoueur: MatTableDataSource<JoueurUnite>;
  listeNation: Nation[] = [];
  listeUnite: Unite[] = [];

  listeUniteSupp: any[] = [];

  private idNationChoisi: number;

  // recupere les données envoyer par le btn qui appel le modal
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private uniteService: UniteService) { }

  displayedColumns: string[] = ['niveauUnite', 'libelUnite', 'libelCommandant', 'libelNation', 'supprimer'];

  ngOnInit(): void 
  {
    let idNation: string;
    let listeIdUnite: any[] = [];

    this.listeUniteJoueur = new MatTableDataSource(this.data.liste);
    
    // creer une liste des nations du joueur
    for (const element of this.data.liste) 
    {
      if(idNation != element.idNation) 
        this.listeNation.push({ idNation: element.idNation, libelNation: element.libelNation });
      
      idNation = element.idNation;
    }

    // creer une liste des types d'unite du joueur
    for(const element of this.data.liste)
    {
      const idUnite = listeIdUnite.filter(a => a == element.idUnite);
      
      if(idUnite.length == 0)
      {
        this.listeUnite.push({ idUnite: element.idUnite, libelUnite: element.libelUnite, idNation: null });
        listeIdUnite.push(idUnite);
      }
    }
  }

  ngAfterViewInit(): void
  {
    this.listeUniteJoueur.sort = this.sort;
  }

  applyFilter(event: Event): void
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listeUniteJoueur.filter = filterValue.trim().toLowerCase();
  }

  SuppUniteJoueur(infosUnite: JoueurUnite)
  {
    if(confirm("Confirmation de la suppression de l'unité"))
    {
      this.uniteService.SuppUniteJoueur(infosUnite).subscribe(
        () =>
        {
          // recupere la ligne supp
          const uniteSupp: JoueurUnite[] = this.data.liste.filter( a => a.idUnite == infosUnite.idUnite && a.idNation == infosUnite.idNation && a.idCommandant == infosUnite.idCommandant);
          

          this.listeUniteSupp.push({ id: uniteSupp[0].id, idUnite: uniteSupp[0].idUnite, idNation: uniteSupp[0].idNation, idCommandant: uniteSupp[0].idCommandant });

          // supp l'unite de la liste
          const index = this.data.liste.findIndex(a => a.idUnite == infosUnite.idUnite && a.idNation == infosUnite.idNation && a.idCommandant == infosUnite.idCommandant);
          this.data.liste.splice(index, 1);

          this.listeUniteJoueur.data = this.data.liste;
        }
      ) 
    }
  }

  FiltreNation(idNation: number): void
  {
    this.listeUniteJoueur.data = (idNation == 0)? this.data.liste : this.data.liste.filter(a => a.idNation == idNation);
    this.idNationChoisi = idNation;
  }

  FiltreUnite(idUnite: number): void
  {
    this.listeUniteJoueur.data = (idUnite == 0)? this.data.liste : this.data.liste.filter(a => a.idUnite == idUnite);
  }

  FiltreUnitePreferer(check: boolean): void
  {
    if(this.idNationChoisi != null && this.idNationChoisi != 0 && !check)
      this.FiltreNation(this.idNationChoisi);
    else
      this.listeUniteJoueur.data = (!check)? this.data.liste : this.listeUniteJoueur.data.filter(a => a.unitePreferer == 'Oui');
  }

  UnitePreferer(unitePreferer: string): boolean
  {
    return unitePreferer == 'Oui';
  }
}

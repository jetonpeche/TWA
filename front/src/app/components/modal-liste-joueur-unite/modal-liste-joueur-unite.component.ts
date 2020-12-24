import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { JoueurUnite } from 'src/app/customTypes/JoueurUnite';
import {MatSort} from '@angular/material/sort';
import { NationService } from 'src/app/services/nation.service';
import { Nation } from 'src/app/customTypes/Nation';
import { Unite } from 'src/app/customTypes/Unite';

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

  private idNationChoisi: number;

  // recupere les données envoyer par le btn qui appel le modal
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private nationService: NationService) { }

  displayedColumns: string[] = ['niveauUnite', 'libelUnite', 'libelCommandant', 'libelNation'];

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
      console.log(idUnite);
      

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

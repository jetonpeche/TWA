import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Joueur } from 'src/app/customTypes/Joueur';
import { JoueurService } from 'src/app/services/joueur.service';
import {MatDialog} from '@angular/material/dialog';
import { ModalListeJoueurUniteComponent } from '../modal-liste-joueur-unite/modal-liste-joueur-unite.component';
import { UniteService } from 'src/app/services/unite.service';
import { JoueurUnite } from 'src/app/customTypes/JoueurUnite';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-liste-joueur-unite',
  templateUrl: './liste-joueur-unite.component.html',
  styleUrls: ['./liste-joueur-unite.component.css']
})
export class ListeJoueurUniteComponent implements OnInit, AfterViewInit {

  listeJoueur: MatTableDataSource<Joueur>;
  private listeJoueurUnite: JoueurUnite[];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private joueurService: JoueurService, private uniteService: UniteService, public dialog: MatDialog) { }

  displayedColumns: string[] = ['speudo', 'id'];

  ngOnInit(): void 
  {
    this.listeJoueur = new MatTableDataSource();

    this.joueurService.ListeJoueur().subscribe(
      (liste: Joueur[]) =>
      {
        this.listeJoueur.data = liste;
      },
      () => console.log("erreur")
    );

    this.uniteService.ListeJoueurUnite().subscribe(
      (liste: JoueurUnite[]) =>
      {
        this.listeJoueurUnite = liste;
      },
      () => console.log("erreur") 
    )
  }

  ngAfterViewInit(): void
  {
    this.listeJoueur.sort = this.sort;
  }

  applyFilter(event: Event): void
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listeJoueur.filter = filterValue.trim().toLowerCase();
  }

  VoirListeUnite(joueur: Joueur): void 
  {
    // ouvre le modal avec la liste des unites du joueur
    const liste = this.listeJoueurUnite.filter(a => a.id == joueur.id);
    const dialogRef = this.dialog.open(ModalListeJoueurUniteComponent, {data: { liste: liste, joueur: joueur }});
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Nation } from 'src/app/customTypes/Nation';
import { NationService } from 'src/app/services/nation.service';
import { UniteService } from 'src/app/services/unite.service';

@Component({
  selector: 'app-ajout-unite',
  templateUrl: './ajout-unite.component.html',
  styleUrls: ['./ajout-unite.component.css']
})
export class AjoutUniteComponent implements OnInit {

  listeNation: Nation[];

  constructor(private nationService: NationService, private uniteService: UniteService) { }

  ngOnInit(): void
  {
    this.nationService.ListerNation().subscribe(
      (liste: Nation[]) =>
      {
        this.listeNation = liste;
      }
    );
  }

  AjouterUnite(form: NgForm): void
  {
    this.uniteService.AjouterUnite(form.value).subscribe(
      (ok: boolean) =>
      {
        if(ok)
          console.log("ajouter");
        else
          console.log("l'unite existe deja");
      },
      () => console.log("erreur")
    );
  }
}

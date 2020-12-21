import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JoueurService } from 'src/app/services/joueur.service';

@Component({
  selector: 'app-joueur',
  templateUrl: './joueur.component.html',
  styleUrls: ['./joueur.component.css']
})
export class JoueurComponent implements OnInit {

  listeInput: any[] = [];
  nbJoueur: number = 0;

  constructor(private joueurService: JoueurService) { }

  ngOnInit(): void {
  }

  AjouterInput(nb: number): void
  {
    this.listeInput = [];

    for (let index = 1; index <= nb; index++) 
    {
      this.listeInput.push({ name: `joueur${index}` });
    }

    this.nbJoueur = nb;
  }

  AjouterJoueur(form: NgForm): void
  {
    console.log(form.value);
    
    this.joueurService.AjouterJoueur(form.value).subscribe(
      () =>
      {
        console.log("Ajouter");
      },
      () =>
      {
        console.log("erreur");
        
      });   
  }
}

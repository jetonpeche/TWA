import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Unite } from 'src/app/customTypes/Unite';
import { NationService } from 'src/app/services/nation.service';
import { UniteService } from 'src/app/services/unite.service';

@Component({
  selector: 'app-ajout-nation',
  templateUrl: './ajout-nation.component.html',
  styleUrls: ['./ajout-nation.component.css']
})
export class AjoutNationComponent implements OnInit {

  listeUnite: Unite[];
  listeInput: any[] = [];

  constructor(private uniteService: UniteService, private nationService: NationService) { }

  ngOnInit(): void 
  {
    this.uniteService.ListerUnite().subscribe(
      (liste: Unite[]) =>
      {
        this.listeUnite = liste;
      },
      () => console.log("erreur")
    );
  }

  AjouterInput(nb: number): void
  {
    this.listeInput = [];
    
    for (let index = 1; index <= nb; index++) 
    {
      this.listeInput.push({ name: `cmdt${index}` });
    }
  }

  AjouterNation(form: NgForm): void
  {
    this.nationService.AjouterNation(form.value).subscribe(
      (ok) =>
      {
        console.log(ok);
      },
      () => console.log("erreur")
    );
  }

}

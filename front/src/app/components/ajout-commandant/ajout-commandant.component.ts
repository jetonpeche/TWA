import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Nation } from 'src/app/customTypes/Nation';
import { NationService } from 'src/app/services/nation.service';
import { UniteService } from 'src/app/services/unite.service';

@Component({
  selector: 'app-ajout-commandant',
  templateUrl: './ajout-commandant.component.html',
  styleUrls: ['./ajout-commandant.component.css']
})
export class AjoutCommandantComponent implements OnInit {

  listeNation: Nation[];
  listeInput: any[] = [];

  constructor(private nationService: NationService, private uniteService: UniteService) { }

  ngOnInit(): void 
  {
    this.nationService.ListerNation().subscribe(
      (liste: Nation[]) =>
      {
        this.listeNation = liste;
      },
      () => console.log("erreur")
    );
  }

  AjouterCmdt(form: NgForm): void
  {
    this.uniteService.AjouterCommandant(form.value).subscribe(
      (ok: boolean) =>
      {
        console.log(ok);  
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

}

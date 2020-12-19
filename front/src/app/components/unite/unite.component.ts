import { Component, OnInit } from '@angular/core';
import { UniteService } from 'src/app/services/unite.service';


@Component({
  selector: 'app-unite',
  templateUrl: './unite.component.html',
  styleUrls: ['./unite.component.css']
})
export class UniteComponent implements OnInit {

  listeUnite: any[];
  listeCommandant: any[];

  constructor(private uniteService: UniteService) { }

  ngOnInit(): void 
  {
    this.uniteService.ListerUnite().subscribe(
      (liste: string[]) =>
      {
        this.listeUnite = liste;
      },
      () =>
      {
        console.log("erreur");
        
      });

      this.uniteService.ListeCommandant().subscribe(
        (liste: string[]) =>
        {
          this.listeCommandant = liste;
        },
        () =>
        {
          console.log("erreur");
          
        });
  }

  ListeUnite(cmdt)
  {
    this.listeUnite = this.listeCommandant.filter(a => a.idNation == cmdt.idNation);
  }

}

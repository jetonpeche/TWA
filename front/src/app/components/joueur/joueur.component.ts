import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-joueur',
  templateUrl: './joueur.component.html',
  styleUrls: ['./joueur.component.css']
})
export class JoueurComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  AjouterInput(nb: number)
  {
    let inputs;

    for (let index = 0; index < nb; index++) 
    {
      inputs += `<input type="text" class="form-control" placeholder="unité ${index + 1}">`
      
    }

    return document.getElementById('input').innerHTML = inputs;
    
  }

}

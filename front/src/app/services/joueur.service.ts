import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Joueur } from 'src/app/customTypes/Joueur';

@Injectable({
  providedIn: 'root'
})
export class JoueurService 
{

  constructor(private http: HttpClient) { }

  ListeJoueur(): Observable<Joueur[]>
  {
    return this.http.get<Joueur[]>(`${environment.URL_PHP}listing/ListeJoueur.php`);
  }

  AjouterJoueur(info: JSON): Observable<any>
  {
    return this.http.post<any>(`${environment.URL_PHP}Ajouter/AjouterJoueur.php`, info);
  }

  SupprimerJoueur(info: JSON): Observable<any>
  {
    return this.http.post<any>(`${environment.URL_PHP}Supprimer/SuppJoueur.php`, info);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Commandant } from 'src/app/customTypes/Commandant';
import { Unite } from 'src/app/customTypes/Unite';
import { JoueurUnite } from '../customTypes/JoueurUnite';
@Injectable({
  providedIn: 'root'
})
export class UniteService {

  constructor(private http: HttpClient) { }

  ListerUnite(): Observable<Unite[]>
  {
    return this.http.get<Unite[]>(`${environment.URL_PHP}listing/listeUnite.php`);
  }

  ListerUniteNation(): Observable<Unite[]>
  {
    return this.http.get<Unite[]>(`${environment.URL_PHP}listing/listeUniteNation.php`);
  }

  ListeCommandant(): Observable<Commandant[]>
  {
    return this.http.get<Commandant[]>(`${environment.URL_PHP}listing/listeCommandant.php`);
  }

  ListeJoueurUnite(): Observable<JoueurUnite[]>
  {
    return this.http.get<JoueurUnite[]>(`${environment.URL_PHP}listing/listeJoueurUnite.php`);
  }

  AjouterUniteJoueur(info: FormData): Observable<boolean>
  {
    return this.http.post<boolean>(`${environment.URL_PHP}Ajouter/AjouterUniteJoueur.php`, info);
  }

  AjouterUnite(info: JSON): Observable<boolean>
  {
    return this.http.post<boolean>(`${environment.URL_PHP}Ajouter/AjouterUnite.php`, info);
  }

  SuppUniteJoueur(info: JoueurUnite): Observable<boolean>
  {
    return this.http.post<boolean>(`${environment.URL_PHP}Supprimer/suppUniteJoueur.php`, info);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nation } from 'src/app/customTypes/Nation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NationService {

  constructor(private http: HttpClient) { }

  ListerNation(): Observable<Nation[]>
  {
    return this.http.get<Nation[]>(`${environment.URL_PHP}listing/listeNation.php`);
  }
}

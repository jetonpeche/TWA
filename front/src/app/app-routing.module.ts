import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AjoutCommandantComponent } from './components/ajout-commandant/ajout-commandant.component';
import { AjoutNationComponent } from './components/ajout-nation/ajout-nation.component';
import { AjoutUniteComponent } from './components/ajout-unite/ajout-unite.component';
import { JoueurComponent } from './components/joueur/joueur.component';
import { ListeJoueurUniteComponent } from './components/liste-joueur-unite/liste-joueur-unite.component';
import { UniteComponent } from './components/unite/unite.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'Ajouter-joueur', component: JoueurComponent },
  { path: 'Ajouter-unite-Joueur', component: UniteComponent },
  { path: 'joueur-unite', component: ListeJoueurUniteComponent },
  { path: 'Ajouter-unite', component: AjoutUniteComponent },
  { path: 'Ajouter-nation', component: AjoutNationComponent },
  { path: 'Ajouter-commandant', component: AjoutCommandantComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
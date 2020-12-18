import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { JoueurComponent } from './components/joueur/joueur.component';
import { UniteComponent } from './components/unite/unite.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'Ajouter-joueur', component: JoueurComponent },
  { path: 'Ajouter-unite', component: UniteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
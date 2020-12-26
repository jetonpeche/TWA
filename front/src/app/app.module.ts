import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// components
import { AppComponent } from './app.component';
import { JoueurComponent } from './components/joueur/joueur.component';
import { UniteComponent } from './components/unite/unite.component';
import { ListeJoueurUniteComponent } from './components/liste-joueur-unite/liste-joueur-unite.component';
import { ModalListeJoueurUniteComponent } from './components/modal-liste-joueur-unite/modal-liste-joueur-unite.component';
import { AjoutUniteComponent } from './components/ajout-unite/ajout-unite.component';


// angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatRadioModule } from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';

// services
import { UniteService } from './services/unite.service';
import { JoueurService } from './services/joueur.service';
import { NationService } from './services/nation.service';

@NgModule({
  declarations: [
    AppComponent,
    JoueurComponent,
    UniteComponent,
    ListeJoueurUniteComponent,
    ModalListeJoueurUniteComponent,
    AjoutUniteComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTableModule,
    MatDialogModule,
    MatSortModule
  ],
  entryComponents: [ModalListeJoueurUniteComponent],
  
  providers: [UniteService, JoueurService, NationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

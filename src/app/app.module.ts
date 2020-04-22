/* Angular Modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Routing Module */
import { AppRoutingModule } from './app-routing.module';

/* Material and Flex Modules*/
import { AngularMaterialModule } from "./modules/angular.material.module";
import { FlexLayoutModule } from '@angular/flex-layout';

/*Components*/
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DatosLoteComponent } from './components/datos-lote/datos-lote.component';
import { TablaImpresionComponent } from './components/tabla-impresion/tabla-impresion.component';
import { LotesModalComponent } from './components/lotes-modal/lotes-modal.component';
import { LotesModalArrayComponent } from './components/lotes-modal-array/lotes-modal-array.component';
import { LoteCardComponent } from './components/tabla-impresion/lote-card/lote-card.component';
import { DialogoComponent } from './components/dialogo/dialogo.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    DatosLoteComponent,
    TablaImpresionComponent,
    LotesModalComponent,
    LotesModalArrayComponent,
    LoteCardComponent,
    DialogoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    AppRoutingModule,  
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  entryComponents: [
    LotesModalComponent,
    LotesModalArrayComponent,
    DialogoComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

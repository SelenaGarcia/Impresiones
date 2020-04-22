import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { LotesModalComponent } from '../../components/lotes-modal/lotes-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { LotesService } from '../../services/lotes.service';
import { ImpresorasService } from '../../services/impresoras.service';
import { LoteImpresion } from '../../models/LoteImpresion';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ ImpresorasService ]
})
export class HomeComponent implements OnInit {
 
   lotesAImprimir: [] = []; 

   constructor(public dialog: MatDialog) {}

  ngOnInit() {
  
  }

  openDialogAgregar(){
    const dialogRef = this.dialog.open(LotesModalComponent, {});
    

    dialogRef.afterClosed().subscribe(result => {     
    });
  }  
}

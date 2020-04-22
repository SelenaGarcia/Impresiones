import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Lote } from '../../models/Lote';
import { LotesService } from 'src/app/services/lotes.service';
import { Observable } from 'rxjs';
import { LoteImpresion } from 'src/app/models/LoteImpresion';


@Component({
  selector: 'app-tabla-impresion',
  templateUrl: './tabla-impresion.component.html',
  styleUrls: ['./tabla-impresion.component.css']
})
export class TablaImpresionComponent implements OnInit {
  
  lotesConfigurados$: Observable<LoteImpresion[]>;

  constructor(private lotesService: LotesService) { }

  ngOnInit() {
    this.lotesService.triggerGetConfiguracionLotes$.subscribe(result =>{
      if(result){
        this.lotesConfigurados$ = this.lotesService.getConfiguracionLotes();
      }
    })
    
  }    
  
}

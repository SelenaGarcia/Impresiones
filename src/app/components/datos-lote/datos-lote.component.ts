import { LotesService } from '../../services/lotes.service';
import { ImpresorasService } from '../../services/impresoras.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Impresora } from '../../models/Impresora';
import { LotesModalArrayComponent } from '../lotes-modal-array/lotes-modal-array.component';
import { DialogoComponent } from '../dialogo/dialogo.component';


@Component({
  selector: 'app-datos-lote',
  templateUrl: './datos-lote.component.html',
  styleUrls: ['./datos-lote.component.css']
})
export class DatosLoteComponent implements OnInit {
  saltoLimitadoVariable: number;
  impresoras$: Observable<Impresora[]>  
  cantidadValida: number;
  loteId: string;
  
  loteForm = new FormGroup({
    'datosLote': new FormGroup({
      'numeroLote': new FormControl('', [Validators.required]),
      'impuesto': new FormControl('', [Validators.required]),
      'cantidad': new FormControl('', [Validators.required]),
      'tipoGeneracion': new FormControl('', [Validators.required]),
      'periodoFiscal': new FormControl('', [Validators.required]),

    }),
    'salto': new FormControl('', [Validators.required]),
    'impresora': new FormControl('', [Validators.required]),
  });

  constructor(
    public lotesDialog: MatDialog,
    public dialog: MatDialog,
    private impresorasService: ImpresorasService,
    private lotesService: LotesService) {
  }

  ngOnInit() {
    this.impresoras$ = this.impresorasService.fetchImpresoras();   
  }

  openDialog(): void {
    this.loteForm.reset();

    const lotesDialogRef = this.lotesDialog.open(LotesModalArrayComponent, {});


    lotesDialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.loteForm.get('datosLote.numeroLote').setValue(data.numeroLote);
        this.loteForm.get('datosLote.impuesto').setValue(data.impuesto);
        this.loteForm.get('datosLote.cantidad').setValue(data.cantidad);
        this.loteForm.get('datosLote.tipoGeneracion').setValue(data.tipoGeneracion);
        this.loteForm.get('datosLote.periodoFiscal').setValue(data.periodoFiscal);
        this.loteForm.get('salto').setValue(data.cantidad);
        this.loteId = data.id;
        this.cantidadValida = data.cantidad;
      }

    });
  }


  onSubmit() {
    if (this.loteForm.valid) {
      this.lotesService.generarLotes(
        +this.loteId,
        this.loteForm.get('impresora').value,
        this.loteForm.get('salto').value
      ).subscribe(result => {
        const dialogRef = this.dialog.open(DialogoComponent, {
          data: result
        });

        dialogRef.afterClosed().subscribe(() => {
          this.loteForm.reset();
          this.lotesService.triggerGetConfiguracionLotesSubject.next(true);
        });
      },
        (err) => { console.log(err) }
      );
    }
  }


  onChange(value: any) {
    if (value > this.cantidadValida) {
      this.loteForm.get('salto').setValue(this.cantidadValida);
    }
  }

}

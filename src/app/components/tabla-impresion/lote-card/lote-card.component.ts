import { Component, OnInit, Input } from '@angular/core';
import { LoteImpresion } from 'src/app/models/LoteImpresion';

@Component({
  selector: 'app-lote-card',
  templateUrl: './lote-card.component.html',
  styleUrls: ['./lote-card.component.css']
})
export class LoteCardComponent implements OnInit {

  @Input('lote') lote: LoteImpresion;

  constructor() { }

  ngOnInit() {
    console.log('card: ' + this.lote.cantidad);
  }

}

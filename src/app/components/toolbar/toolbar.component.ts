import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  titulo: string = "Sistema de Impresión Masiva de Boletas CISI" ; 
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialogRef } from '@angular/material/dialog';
import { LotesService } from 'src/app/services/lotes.service';
import { Lote } from 'src/app/models/Lote';

@Component({
  selector: 'app-lotes-modal-array',
  templateUrl: './lotes-modal-array.component.html',
  styleUrls: ['./lotes-modal-array.component.css']
})
export class LotesModalArrayComponent implements OnInit {

  displayedColumns: string[] = ['numeroLote','impuesto','tipoGeneracion','periodoFiscal','estadoLote', 'cantidad'];
  dataSource: MatTableDataSource<Lote>;
  lotes: Lote[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor( public dialogRef: MatDialogRef<LotesModalArrayComponent>,
    private lotesService: LotesService  ) { }

  ngOnInit() {
    this.lotesService.getLotes().subscribe(lotes => {
      this.lotes = lotes;      
      this.dataSource = new MatTableDataSource(this.lotes);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.dataSource.filterPredicate = function (data, filterValue: string): boolean {
        return data.numeroLote.toLowerCase().includes(filterValue) || data.cantidad === +filterValue || data.estadoLote.toLowerCase().includes(filterValue);
      };
    });   
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSelectRow(row){
    this.dialogRef.close(row);
  }
}

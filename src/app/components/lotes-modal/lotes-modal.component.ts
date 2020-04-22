import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LotesService } from '../../services/lotes.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LotesDataSource } from 'src/app/classes/LotesDataSource';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent, merge } from 'rxjs';

@Component({
  selector: 'app-lotes-modal',
  templateUrl: './lotes-modal.component.html',
  styleUrls: ['./lotes-modal.component.css'], 
  providers: [ LotesService ]
})
export class LotesModalComponent implements OnInit, AfterViewInit {

  dataSource: LotesDataSource;
  displayedColumns: string[] = ['numeroLote','impuesto','tipoGeneracion','periodoFiscal','estadoLote', 'cantidad'];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild('search', {static: false}) search: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<LotesModalComponent>,
    private lotesService: LotesService   
    ) {}
  
  ngAfterViewInit() {

    /*Server side search*/
    fromEvent(this.search.nativeElement, 'keyup')
    .pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap(() => {        
        this.paginator.pageIndex = 0;
        this.loadLotesPage();
      })
    ).subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.paginator.page, this.sort.sortChange)
    .pipe(
      tap(() => this.loadLotesPage())
    ).subscribe();
  }

  ngOnInit() {   
    this.dataSource = new LotesDataSource(this.lotesService);
    this.dataSource.loadLotes('','numeroLote','asc',0,5);
  }

  onSelectRow(row){
    this.dialogRef.close(row);
  }

  onClose(){
    this.dialogRef.close();
  } 

  private loadLotesPage(){
    this.dataSource.loadLotes(this.search.nativeElement.value, this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize)
  }
}




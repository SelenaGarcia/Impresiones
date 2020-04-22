import { Lote, LoteDataTable } from '../models/Lote';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { LotesService } from '../services/lotes.service';
import { catchError, finalize } from 'rxjs/operators';

export class LotesDataSource implements DataSource<Lote>{

    private lotesSubject: BehaviorSubject<Lote[]> = new BehaviorSubject<Lote[]>([]);
    private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private rowCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();
    public rowCount$ = this.rowCountSubject.asObservable();

    constructor(private lotesService: LotesService) {}


    connect(collectionViewer: CollectionViewer): Observable<Lote[]> {
        return this.lotesSubject.asObservable();
    }    
    
    disconnect(collectionViewer: CollectionViewer): void {
        this.lotesSubject.complete();
        this.loadingSubject.complete();
    }

    loadLotes(query: string, sort: string, order: string, page: number, take: number){
        // this.loadingSubject.next(true);

        // this.lotesService.getLotesServerSide(query,sort,order,page,take).pipe(
        //     catchError(() => of([])),
        //     finalize(() => this.loadingSubject.next(false))
        // ).subscribe((loteDataTable: LoteDataTable) => {
        //     this.rowCountSubject.next(loteDataTable.rowCount)
        //     this.lotesSubject.next(loteDataTable.objeto)
        // });
    }

    
}
import { BASEURL } from './../url/connection-url';
import { Lote } from './../models/Lote';
import { Injectable, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError, finalize } from 'rxjs/operators';
import { Dialogo } from '../models/dialogo';
import { LoteImpresion } from '../models/LoteImpresion';

@Injectable({
  providedIn: 'root'
})
export class LotesService implements OnInit {


  getLotesEndPoint: string = 'api/LoteImpresion/GetLoteImpresionAll';
  getConfiguracionLotesEndPoint: string = 'api/LoteImpresion/GetConfiguracionLotes';
  generarLotesEndPoint: string = 'api/LoteImpresion/PostGenerarLotes';

  loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isLoading$ = this.loadingSubject.asObservable();

  triggerGetConfiguracionLotesSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  triggerGetConfiguracionLotes$ = this.triggerGetConfiguracionLotesSubject.asObservable();

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  /*Obtiene los lotes con paginado, filtro y ordenamiento del lado del server */
  // getLotesServerSide(query: string, sort: string, order: string, page: number, take: number): Observable<LoteDataTable> {

  //   let params: HttpParams = new HttpParams();
  //   params = params.append('queryString', query);
  //   params = params.append('sort', sort);
  //   params = params.append('order', order);
  //   params = params.append('page', (page += 1).toString());
  //   params = params.append('take', take.toString());

  //   return this.http.get<LoteDataTable>(BASEURL + this.getLotesEndPoint, {
  //     params: params
  //   });
  // }

  getLotes(): Observable<Lote[]> {
    this.loadingSubject.next(true);
    return this.http.get<Lote[]>(BASEURL + this.getLotesEndPoint)
      .pipe(
        map(data => {
          return data['payLoad'];
        }),
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      );
  }

  getConfiguracionLotes(): Observable<LoteImpresion[]>{
    this.loadingSubject.next(true);
    return this.http.get<any>(BASEURL + this.getConfiguracionLotesEndPoint).pipe(      
      map(data => {
        return data.payLoad.objeto as LoteImpresion[]}),
      catchError(() => of([])),
      finalize(() => {
        this.loadingSubject.next(false)
        this.triggerGetConfiguracionLotesSubject.next(false)
      })
    );
  }

  generarLotes(loteimpresionId: number, impresora: string, salto: number): Observable<Dialogo> {
    this.loadingSubject.next(true);
    return this.http.post<Dialogo>(BASEURL + this.generarLotesEndPoint, { loteimpresionId, impresora, salto })
      .pipe(        
        map(resp => {
            var dialogo: Dialogo = {
              estado: resp['estado'],
              mensaje: resp['mensaje'],
              icono: resp['estado'] ? 'done' : 'error',
              titulo: resp['estado'] ? 'Mensaje' : 'Error'
            }
            return dialogo;
        }),
        catchError((err) => {
          of([])         
          throw err
        }),
        finalize(() => this.loadingSubject.next(false))
      )
  }
}

import { Impresora } from './../models/Impresora';
import { BASEURL } from './../url/connection-url';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";




@Injectable()
export class ImpresorasService{
    impresoraEndPoint: string = 'api/Impresora'; 
    constructor(private http: HttpClient){}
 

    fetchImpresoras(): Observable<Impresora[]>{  
        return this.http.get<Impresora[]>(BASEURL + this.impresoraEndPoint).pipe(
            tap(result => {})        
        );        
    }
}
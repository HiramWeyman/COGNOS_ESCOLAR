import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class Semestres_Service {
    constructor(private http: HttpClient) { }
    public urlEndPoint = `${environment.rutaAPI}`;

    GetListaSemestres(): Observable<any> {
        return this.http.get(`${environment.rutaAPI}` + 'getListaSemestres');
      }
  }

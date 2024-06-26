import { Generacion } from '@/models/Generacion';
import { GeneracionIns } from '@/models/GeneracionIns';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GeneracionesService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;

  GetGeneraciones(): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'getGeneraciones');
  }

  GetGeneracionID(id:number): Observable<Generacion> {
    return this.http.get<Generacion>(`${environment.rutaAPI}` + 'getGeneracion/'+id);
  }

  UpdateGeneracion(Generacion: Generacion): Observable<Generacion> {
    console.log("PRUENa",Generacion);
    return this.http.patch<Generacion>(`${environment.rutaAPI}` + 'updateGeneracion/'+Generacion.generacionID, Generacion);
  }

  GuardarGeneracion(Generacion: GeneracionIns): Observable<GeneracionIns> {
    
    Generacion.GeneracionID=0;
    return this.http.post<GeneracionIns>(`${environment.rutaAPI}`+'insertGeneracion', Generacion);
  }

  DeleteGeneracion(id: number): Observable<Generacion> {
    return this.http.patch<Generacion>(`${environment.rutaAPI}` + 'deleteGeneracion/'+id,"");
  }

}

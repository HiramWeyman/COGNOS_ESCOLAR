
import { Asigna } from '@/models/Asignadocgpo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CalificacionService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;
  
  GetAsignacionProfesor(id:number): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'getAsignacionesDocProfesor/'+id);
  }

  GetAlumnosPorAsignacion(id:number): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'getAlumnosPorasignacion/'+id);
  }




  GetAsignacionGpo(id:number): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'getAsignacionesDocGpo/'+id);
  }

  GetAsignacionMat(id:number): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'getAsignacionesDocMat/'+id);
  }

  GetAsignaID(id:number): Observable<Asigna> {
    return this.http.get<Asigna>(`${environment.rutaAPI}` + 'getAsignacionesDocID/'+id);
  }

  UpdateAsigna(asigna: Asigna): Observable<Asigna> {
    return this.http.patch<Asigna>(`${environment.rutaAPI}` + 'updateAsignacion/'+asigna.asignacionID, asigna);
  }

  GuardarAsigna(asigna: Asigna): Observable<Asigna> {
    asigna.asignacionID=0;
    return this.http.post<Asigna>(`${environment.rutaAPI}`+'asignacionregistro', asigna);
  }

 DeleteAsigna(id:number): Observable<Asigna> {
    return this.http.patch<Asigna>(`${environment.rutaAPI}` + 'deleteAsignacion/'+id, "");
  } 

}

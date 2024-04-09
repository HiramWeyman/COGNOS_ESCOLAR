
import { Asigna } from '@/models/Asignadocgpo';
import { Calificacion } from '@/models/Calificacion';
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

/*   GetAlumnosPorAsignacion(id:number): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'getAlumnosPorasignacion/'+id);
  } */

  GetAlumnosPorAsignacion(id:number): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'getAlumnosPorMateria/'+id);
  }

  getAlumnosPorIdUsuario(id:number,usuario:number): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'getAlumnosPorIdUsuario/'+id+'/'+usuario);
  }

  

  GetMateriasAlumno(id:number,usuario:number): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'getMateriasAlumno/'+id+'/'+usuario);
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

  UpdateCalificacion(cal: Calificacion): Observable<Calificacion> {
    return this.http.patch<Calificacion>(`${environment.rutaAPI}` + 'updateCalificacion/'+cal.CalificacionID, cal);
  }

  GuardarAsigna(asigna: Asigna): Observable<Asigna> {
    asigna.asignacionID=0;
    return this.http.post<Asigna>(`${environment.rutaAPI}`+'asignacionregistro', asigna);
  }

 DeleteAsigna(id:number): Observable<Asigna> {
    return this.http.patch<Asigna>(`${environment.rutaAPI}` + 'deleteAsignacion/'+id, "");
  } 

}


import { AlumnoGpo } from '@/models/AlumnoGpo';
import { Asigna } from '@/models/Asignadocgpo';
import { Calificacion } from '@/models/Calificacion';
import { GeneracionGpo } from '@/models/GeneracionGpo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AlumnoGpoService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;
  
/*   GetAsignacionAlGpo(): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'api/AlumnoGpo/getAsignacioneAlumnoGpo');
  } */
  
  GetAsignacionGpo(id:number): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'getAsignacionesDocGpo/'+id);
  }

  GetAsignacionMat(id:number): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'getAsignacionesDocMat/'+id);
  }

  GetAsignaID(id:number): Observable<Asigna> {
    return this.http.get<Asigna>(`${environment.rutaAPI}` + 'getAsignacionesDocID/'+id);
  }

  GetListaAlumnos(id:number): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'api/AlumnoGpo/getAsignacioneAlumnoGpo/'+id);
  }

  GetTpoExamen(): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'api/AlumnoGpo/getTipoExamen');
  }

  UpdateAsigna(asigna: Asigna): Observable<Asigna> {
    return this.http.patch<Asigna>(`${environment.rutaAPI}` + 'updateAsignacion/'+asigna.asignacionID, asigna);
  }

  GuardarAlumnoGpo(asigna: AlumnoGpo): Observable<AlumnoGpo> {
   /*  asigna.asignacionID=0; */
    return this.http.post<AlumnoGpo>(`${environment.rutaAPI}`+'api/AlumnoGpo/alumnoGporegistro', asigna);
  }

  GuardarGeneracionGpo(asigna: GeneracionGpo): Observable<GeneracionGpo> {
    /*  asigna.asignacionID=0; */
     return this.http.post<GeneracionGpo>(`${environment.rutaAPI}`+'api/AlumnoGpo/generacionGporegistro', asigna);
   }

  GuardarCalificacionTemp(califica: Calificacion): Observable<Calificacion> {
     califica.CalificacionID=0;
     return this.http.post<Calificacion>(`${environment.rutaAPI}`+'calificacionregistro', califica);
   }

 DeleteAsigna(id:number): Observable<Asigna> {
    return this.http.patch<Asigna>(`${environment.rutaAPI}` + 'deleteAsignacion/'+id, "");
  } 

}

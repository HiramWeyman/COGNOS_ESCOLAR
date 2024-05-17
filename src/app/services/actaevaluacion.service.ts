
import { ActaEvaluacion } from '@/models/ActaEvaluacion';
import { ActaEvaluacionDto } from '@/models/ActaEvaluacionDTO';
import { Alumno } from '@/models/Alumno';
import { AlumnoIns } from '@/models/AlumnoIns';
/* import { AlumnoIns } from '@/models/AlumnoIns'; */
import { Materia } from '@/models/Materia';
import { Perfil } from '@/models/Perfil';
import { PerfilIns } from '@/models/PerfilIns';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ActaEvaService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;
  
  GetActas(id:number): Observable<any> {
    console.log(id);
    return this.http.get(`${environment.rutaAPI}` + 'getListaActa/'+id);
  }

  GetActaID(id:number): Observable<any> {
    console.log(id);
    return this.http.get(`${environment.rutaAPI}` + 'getActaID/'+id);
  }

/*   GetUsuariosEst(): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'getUsuariosAlumnos');
  }

  GetAlumnoID(id:number): Observable<Alumno> {
    return this.http.get<Alumno>(`${environment.rutaAPI}` + 'getEstudiante/'+id);
  }

   */

  GuardarActa(acta: ActaEvaluacion): Observable<ActaEvaluacion> {
    acta.ActaEvaluacionID=0;
    return this.http.post<ActaEvaluacion>(`${environment.rutaAPI}`+'insertActa', acta);
  }

  UpdateActa(acta: ActaEvaluacionDto): Observable<ActaEvaluacionDto> {
    console.log(acta);
    return this.http.patch<ActaEvaluacionDto>(`${environment.rutaAPI}` + 'updateActa/'+acta.ActaEvaluacionID, acta);
  }

  DeleteActa(id:number): Observable<any> {
    return this.http.patch<any>(`${environment.rutaAPI}` + 'deleteActa/'+id, "");
  } 

  
 
}


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
export class AlumnosService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;
  
  GetAlumnos(): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'getEstudiantes');
  }

  GetUsuariosEst(): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'getUsuariosAlumnos');
  }

  GetAlumnoID(id:number): Observable<Alumno> {
    return this.http.get<Alumno>(`${environment.rutaAPI}` + 'getEstudiante/'+id);
  }

  UpdateAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.patch<Alumno>(`${environment.rutaAPI}` + 'updateEstudiante/'+alumno.estudianteID, alumno);
  }

  GuardarAlumno(alumno: AlumnoIns): Observable<AlumnoIns> {
    alumno.estudianteID=0;
    return this.http.post<AlumnoIns>(`${environment.rutaAPI}`+'estudianteregistro', alumno);
  }

 DeleteAlumno(id:number): Observable<Alumno> {
    return this.http.patch<Alumno>(`${environment.rutaAPI}` + 'deleteEstudiante/'+id, "");
  } 

}


import { Alumno } from '@/models/Alumno';
import { AlumnoIns } from '@/models/AlumnoIns';
import { Certificado } from '@/models/Certificado';
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

  GetSemestres(): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'getSemestres');
  }

  GetCiclos(): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'getCiclos');
  }

  GetTipoDoc(): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'getTipoDoc');
  }


  GetUsuariosEst(): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'getUsuariosAlumnos');
  }

  GetAlumnoID(id:number): Observable<Alumno> {
    return this.http.get<Alumno>(`${environment.rutaAPI}` + 'getEstudiante/'+id);
  }

  UpdateAlumno(alumno: Alumno): Observable<Alumno> {
    //console.log("Generacion-UpdateAlumno",alumno)
    return this.http.patch<Alumno>(`${environment.rutaAPI}` + 'updateEstudiante/'+alumno.estudianteID, alumno);
  }

  GuardarAlumno(alumno: AlumnoIns): Observable<AlumnoIns> {
    alumno.estudianteID=0;
    return this.http.post<AlumnoIns>(`${environment.rutaAPI}`+'estudianteregistro', alumno);
  }

  DeleteAlumno(id:number): Observable<Alumno> {
    return this.http.patch<Alumno>(`${environment.rutaAPI}` + 'deleteEstudiante/'+id, "");
  } 

  //Metodos para el certificado

  GuardarCertificado(cert: Certificado): Observable<Certificado> {
    cert.certificadoID=0;
    return this.http.post<Certificado>(`${environment.rutaAPI}`+'insertCertificado', cert);
  }

  GetCertificados(idEstudiante:number): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'getListaCertificados/'+idEstudiante);
  }

  GetCertificado(idCertificado:number): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'getCertificadoID/'+idCertificado);
  }

  UpdateCertificado(cert: Certificado): Observable<Certificado> {
    //console.log("Generacion-UpdateAlumno",alumno)
    return this.http.patch<Certificado>(`${environment.rutaAPI}` + 'updateCertificado/'+cert.certificadoID, cert);
  }

  DeleteCertificado(id:number): Observable<Certificado> {
    //console.log("Generacion-UpdateAlumno",alumno)
    return this.http.patch<Certificado>(`${environment.rutaAPI}` + 'deleteCertificado/'+id, "");
  }

  GetCountCal(id:number): Observable<number> {
    return this.http.get<number>(`${environment.rutaAPI}` + 'getValidaCal/'+id);
  }


}

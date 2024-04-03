
import { Docente } from '@/models/Docente';
import { DocenteIns } from '@/models/DocenteIns';
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
export class DocenteService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;
  



  GetDocentes(): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'getDocentes');
  }

  GetUsuariosDoc(): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'getUsuariosDocentes');
  }

  GetDocenteID(id:number): Observable<Docente> {
    return this.http.get<Docente>(`${environment.rutaAPI}` + 'getDocente/'+id);
  }

  UpdateDocente(docente: Docente): Observable<Docente> {
    return this.http.patch<Docente>(`${environment.rutaAPI}` + 'updateDocente/'+docente.docenteID, docente);
  }

  GuardarDocente(docente: DocenteIns): Observable<DocenteIns> {
    
    docente.docenteID=0;
    //console.log(docente);
    return this.http.post<DocenteIns>(`${environment.rutaAPI}`+'docenteregistro', docente);
  }

 DeleteDocente(id:number): Observable<Docente> {
    return this.http.patch<Docente>(`${environment.rutaAPI}` + 'deleteDocente/'+id, "");
  } 

}

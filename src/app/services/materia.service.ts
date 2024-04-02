
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
export class MateriaService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;
  



  GetMaterias(): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'getMaterias');
  }

  GetMateriaID(id:number): Observable<Materia> {
    return this.http.get<Materia>(`${environment.rutaAPI}` + 'getMateria/'+id);
  }

  UpdateMateria(materia: Materia): Observable<Materia> {
    return this.http.patch<Materia>(`${environment.rutaAPI}` + 'updateMateria/'+materia.materiaID, materia);
  }

  GuardarMateria(materia: Materia): Observable<Materia> {
    
    materia.materiaID=0;
    console.log(materia);
    return this.http.post<Materia>(`${environment.rutaAPI}`+'materiaregistro', materia);
  }

  DeleteMateria(id:number): Observable<Materia> {
    return this.http.patch<Materia>(`${environment.rutaAPI}` + 'deleteMateria/'+id, "");
  }

}

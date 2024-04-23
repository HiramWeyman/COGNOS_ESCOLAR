
import { Materia } from '@/models/Materia';
import { MateriaIns } from '@/models/MateriaIns';
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

  GetMateriasID(id:number): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'getMateriasSemestre/'+id);
  }

  GetMateriaID(id:number): Observable<Materia> {
    return this.http.get<Materia>(`${environment.rutaAPI}` + 'getMateria/'+id);
  }

  UpdateMateria(materia: Materia): Observable<Materia> {
    return this.http.patch<Materia>(`${environment.rutaAPI}` + 'updateMateria/'+materia.materiaID, materia);
  }

  GuardarMateria(materia: MateriaIns): Observable<MateriaIns> {
    
    materia.MateriaID=0;
    materia.Nombre=materia.Nombre.trim();
    console.log(materia);
    return this.http.post<MateriaIns>(`${environment.rutaAPI}`+'materiaregistro', materia);
  }

  DeleteMateria(id:number): Observable<Materia> {
    return this.http.patch<Materia>(`${environment.rutaAPI}` + 'deleteMateria/'+id, "");
  }

}

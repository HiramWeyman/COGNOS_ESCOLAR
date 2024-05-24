import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { Grupo } from '@/models/Grupo';
import { GrupoIns } from '@/models/GrupoIns';




@Injectable({
  providedIn: 'root'
})
export class GruposService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;

  GetGrupos(): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'getGrupos');
  }

  GetGruposMaestro(id:number): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'GetGruposMaestro/'+id);
  }

  GetMaestro(id:number): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'getMaestro/'+id);
  }

  GetGruposEstudiante(id:number): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'GetGruposEstudiante/'+id);
  }


  GetGrupoID(id:number): Observable<Grupo> {
    return this.http.get<Grupo>(`${environment.rutaAPI}` + 'getGrupo/'+id);
  }

  UpdateGrupo(grupo: GrupoIns): Observable<GrupoIns> {
    return this.http.patch<GrupoIns>(`${environment.rutaAPI}` + 'updateGrupo/'+grupo.GrupoID, grupo);
  }

  GuardarGrupo(grupo: GrupoIns): Observable<GrupoIns> {
    
    grupo.GrupoID=0;
    console.log(grupo);
    return this.http.post<GrupoIns>(`${environment.rutaAPI}`+'insertGrupo', grupo);
  }

  DeleteGrupo(id: number): Observable<Grupo> {
    return this.http.patch<Grupo>(`${environment.rutaAPI}` + 'deleteGrupo/'+id,"");
  }
}

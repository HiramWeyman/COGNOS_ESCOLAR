import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { Grupo } from '@/models/Grupo';




@Injectable({
  providedIn: 'root'
})
export class GruposService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;

  GetGrupos(): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'getGrupos');
  }

  GetGrupoID(id:number): Observable<Grupo> {
    return this.http.get<Grupo>(`${environment.rutaAPI}` + 'getGrupo/'+id);
  }

  UpdateGrupo(grupo: Grupo): Observable<Grupo> {
    return this.http.patch<Grupo>(`${environment.rutaAPI}` + 'updateGrupo/'+grupo.grupoID, grupo);
  }

  GuardarGrupo(grupo: Grupo): Observable<Grupo> {
    
    grupo.grupoID=0;
    console.log(grupo);
    return this.http.post<Grupo>(`${environment.rutaAPI}`+'insertGrupo', grupo);
  }
}

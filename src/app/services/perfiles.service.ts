
import { Perfil } from '@/models/Perfil';
import { PerfilIns } from '@/models/PerfilIns';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PerfilesService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;
  



  GetPerfiles(): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'getPerfiles');
  }

  GetPerfilID(id:number): Observable<Perfil> {
    return this.http.get<Perfil>(`${environment.rutaAPI}` + 'getPerfil/'+id);
  }

  UpdatePerfil(perfil: Perfil): Observable<Perfil> {
    return this.http.patch<Perfil>(`${environment.rutaAPI}` + 'updatePerfil/'+perfil.perfilID, perfil);
  }

  GuardarPerfil(perfil: Perfil): Observable<Perfil> {
    
    perfil.perfilID=0;
    console.log(perfil);
    return this.http.post<Perfil>(`${environment.rutaAPI}`+'insertPerfil', perfil);
  }
}

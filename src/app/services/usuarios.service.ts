
import { Usuarios } from '@/models/Usuarios';
import { UsuariosIns } from '@/models/UsuariosIns';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;
  
 /*  GetUsuarios(): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'getUsuarios');
  } */

  GetUsuarios(): Observable<any[]> {
    return this.http.get(`${environment.rutaAPI}` + 'getUsuarios').pipe(
      map(response => response as any[])
    );
  }

  GetUsuarioID(id:number): Observable<Usuarios> {
    return this.http.get<Usuarios>(`${environment.rutaAPI}` + 'getUsuario/'+id);
  }

  GuardarUsuario(user: UsuariosIns): Observable<UsuariosIns> {
    return this.http.post<UsuariosIns>(`${this.urlEndPoint+'usuarioregistro'}`, user);
  }

  UpdateUsuarios(user: Usuarios): Observable<Usuarios> {
    return this.http.patch<Usuarios>(`${environment.rutaAPI}` + 'updateUsuario/'+user.usuarioID, user);
  }

  DeleteUsuario(id:number): Observable<Usuarios> {
    return this.http.patch<Usuarios>(`${environment.rutaAPI}` + 'deleteUsuario/'+id, "");
  }

  GetGenero(): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'getGenero');
  }
}


import { Ciclos } from '@/models/Ciclos';
import { CiclosIns } from '@/models/CiclosIns';
import { Usuarios } from '@/models/Usuarios';
import { UsuariosIns } from '@/models/UsuariosIns';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Ciclos_Service {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;
  
  GetCiclos(): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + 'getCiclos');
  }

  GetCicloID(id:number): Observable<Ciclos> {
    return this.http.get<Ciclos>(`${environment.rutaAPI}` + 'getCiclo/'+id);
  }

  GuardarCiclo(ciclo: CiclosIns): Observable<CiclosIns> {
    return this.http.post<CiclosIns>(`${this.urlEndPoint+'cicloregistro'}`, ciclo);
  }

  UpdateCiclo(ciclo: Ciclos): Observable<Ciclos> {
    return this.http.patch<Ciclos>(`${environment.rutaAPI}` + 'updateCiclo/'+ciclo.cicloID, ciclo);
  }
}

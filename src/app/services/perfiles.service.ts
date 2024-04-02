import { AnalisisFU } from '@/models/AnalisisFU';
import { SaludFM } from '@/models/SaludFM';
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

  UpdateUsuarios(analisis: AnalisisFU): Observable<AnalisisFU> {
    return this.http.patch<AnalisisFU>(`${environment.rutaAPI}` + '/AnalisisFU/'+analisis.analisis_id, analisis);
  }
}

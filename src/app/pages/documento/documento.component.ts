import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
import { environment} from '../../../environments/environment';
import { AlumnosService } from '@services/alumnos.service';
import { Alumno } from '@/models/Alumno';
import { AlumnoIns } from '@/models/AlumnoIns';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.scss']
})
export class DocumentoComponent {
  @BlockUI()
  blockUI!: NgBlockUI;
  @ViewChild('myModalClose') modalClose;
  Usuarios:any;
  Alumnos:any;
  Semestre:any;
  TipoDoc:any;
  alumno:Alumno=new Alumno();
  alumnoIns:AlumnoIns=new AlumnoIns();
  resp:any;
  fecCrea:any;
  nosemestre:number=null;
  tipo:number=null;
  ngOnInit(): void {
    this.cargarAlumnos();
    this.cargarUsuarios();
    this.cargarSemestres();
    this.cargarTipoDoc();
    }
    constructor(private router: Router,private _alumno:AlumnosService,private datePipe: DatePipe){}

    cargarAlumnos() {
      this._alumno.GetAlumnos().subscribe(
        al => {
          this.Alumnos = al;
          //console.log(this.Alumnos);
        
        }, error => {
          //console.log(error);
          swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
        });
    }

    cargarUsuarios() {
      this._alumno.GetUsuariosEst().subscribe(
        est => {
          this.Usuarios = est;
          //console.log(this.Usuarios);
         
        }, error => {
          //console.log(error);
          swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
        });
    }

    cargarSemestres() {
      this._alumno.GetSemestres().subscribe(
        sem => {
          this.Semestre = sem;
          console.log(this.Semestre);
         
        }, error => {
          //console.log(error);
          swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
        });
    }

    cargarTipoDoc() {
      this._alumno.GetTipoDoc().subscribe(
        tipo => {
          this.TipoDoc =tipo;
          console.log(this.TipoDoc);
         
        }, error => {
          //console.log(error);
          swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
        });
    }


    GetAlumno(id:number){
      this._alumno.GetAlumnoID(id).subscribe(
        mat => {
          this.alumno= mat[0];
          //console.log(this.alumno );
       
        }, error => {
         // console.log(error);
          swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
        });
    }

    ConsultaDoc(idEstudiante:number,Tipodoc:number,Semestre:number){
      console.log(Tipodoc);
      console.log(idEstudiante);
      console.log(Semestre);
      let codigo = 1;

switch (Tipodoc) {
  case 2:
    console.log('Opción 2 Boleta de Calificaciones');
    window.open(`${environment.rutaAPI}` + 'ReportActaEva/'+idEstudiante+'/Semestre');
    break;
  case 3:
    console.log('Opción 3 Kardex de Calificaciones');
    break;
  case 4:
    console.log('Opción 4 Cerfificado');
    break;

}

    }
}

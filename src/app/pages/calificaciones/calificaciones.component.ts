import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
import { AlumnoIns } from '@/models/AlumnoIns';
import { DocenteService } from '@services/docente.service';
import { MateriaService } from '@services/materia.service';
import { AsignacionService } from '@services/asignacion.service';
import { Asigna } from '@/models/Asignadocgpo';
import { GruposService } from '@services/grupos.service';
import { CalificacionService } from '@services/calificacion.service';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.scss']
})
export class CalificacionesComponent {
  @BlockUI()
  blockUI!: NgBlockUI;
  @ViewChild('myModalClose') modalClose;
  Usuarios: any;
  Materias: any;
  Docentes: any;
  Grupos: any;
  AsignaDoc: any;
  Alumnos: any;
  Perfil: any;
  UserId: any;
  asignacion: Asigna = new Asigna();
  alumnoIns: AlumnoIns = new AlumnoIns();
  resp: any;
  fecCrea: any;

  ngOnInit(): void {
    this.Perfil = sessionStorage.UserPerfil;
    this.UserId = sessionStorage.UserId;
    this.cargarGrupos();
    console.log(this.Perfil);
    console.log(this.UserId);
 /*    switch (Number(this.Perfil)) {
      case 1: {
        //statements; 
        break;
      }
      case 2: {
        //statements; 
        this.cargarAsignacionProfesor()
        break;
      }
      default: {
        this.cargarAsignacion(); 
        break;
      }

    } */

  }

  constructor(
    private router: Router,
    private _asignacion: AsignacionService,
    private _docente: DocenteService,
    private _materia: MateriaService,
    private _grupo:GruposService,
    private _calificacion:CalificacionService,
    private datePipe: DatePipe) { }

    cargarGrupos() {
      this._grupo.GetGrupos().subscribe(
        per => {
          this.Grupos = per;
          console.log(this.Grupos);
         
        }, error => {
          //console.log(error);
          swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
        });
    }

    ///////Busqueda de Asignacion por grupo
  onChangeGpo(id: number) {
    this.AsignaDoc = null;
    this._asignacion.GetAsignacionGpo(id).subscribe(
      mat => {
        this.AsignaDoc = mat;
        console.log(this.AsignaDoc);

      }, error => {
        // console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });

  }

  onChangeMat(id: number) {
    this.Alumnos = null;
    this._calificacion.GetAlumnosPorAsignacion(id).subscribe(
      al => {
        this.Alumnos = al;
        console.log(this.Alumnos);

      }, error => {
        // console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });

  }

  Califica(califica:any){
    console.log(califica);
  }
  
}

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
import { Calificacion } from '@/models/Calificacion';

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
  CalIns: Calificacion = new Calificacion();
  resp: any;
  fecCrea: any;
  valortemporal:number;
  tiposExamen: { id: number, nombre: string }[] = [
    { id: 2, nombre: 'Ordinario' },
    { id: 3, nombre: 'Extraordinario' },
    { id: 4, nombre: 'Titulo' }
  ];

  ngOnInit(): void {
    this.Perfil = sessionStorage.UserPerfil;
    this.UserId = sessionStorage.UserId;
    if(Number(this.Perfil)==1){
      this.cargarGruposEstudiante();
    }
    else{
      this.cargarGrupos();
    }
    
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
          console.log('Grupos Administrador');
          console.log(this.Grupos);
         
        }, error => {
          //console.log(error);
          swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
        });
    }

    cargarGruposEstudiante() {
      this._grupo.GetGruposEstudiante(Number(this.Perfil)).subscribe(
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
    this.valortemporal=id;
    this.Alumnos = null;
    this._calificacion.GetAlumnosPorAsignacion(id).subscribe(
      al => {
        this.Alumnos = al;
        console.log("LISTA",this.Alumnos);

      }, error => {
        // console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });

  }

  onChangeGpoAlumnos(id: number) {
    this.AsignaDoc = null;
    this._calificacion.GetMateriasAlumno(id,Number(this.UserId)).subscribe(
      mat => {
        this.AsignaDoc = mat;
        console.log(this.AsignaDoc);

      }, error => {
        // console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });

  }

  onChangeMatAlumnos(id: number) {
    this.valortemporal=id;
    this.Alumnos = null;
    this._calificacion.getAlumnosPorIdUsuario(id,Number(this.UserId)).subscribe(
      al => {
        this.Alumnos = al;
        console.log(this.Alumnos);

      }, error => {
        // console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });

  }

  CaragarActualizacion(){
    this._calificacion.GetAlumnosPorAsignacion(this.valortemporal).subscribe(
      al => {
        this.Alumnos = al;
        console.log("Alumnos",this.Alumnos);

      }, error => {
        // console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  Califica(califica:any){
    this.blockUI.start('Calificando...');
    console.log(califica);
    this.CalIns.EstudianteID=califica.EstudianteID;

    this.CalIns.CalificacionID=califica.calificacionID;
    this.CalIns.Puntaje=califica.puntaje;
    this.CalIns.PuntajeLetra=califica.puntajeLetra;
    this.CalIns.EstudianteID=califica.estudianteID;
    this.CalIns.AsignacionID=califica.asignacionID;
    this.CalIns.TipoExamenID=califica.tipoExamenID;
    //console.log("hola",califica.tipoExamenID);

    this._calificacion.UpdateCalificacion(this.CalIns).subscribe(datos => {

      if (datos) {
        this.blockUI.stop();
        this.resp = datos;
        swal.fire('Calificando..', `${this.resp.descripcion}`, 'success');
        this.CaragarActualizacion();
      }


    }, error => {
      this.blockUI.stop();
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }


  
}

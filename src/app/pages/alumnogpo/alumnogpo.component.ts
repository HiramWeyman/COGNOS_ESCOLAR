import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';

import { DocenteService } from '@services/docente.service';
import { MateriaService } from '@services/materia.service';


import { AlumnoGpoService } from '@services/alumnogpo.service';
import { AlumnosService } from '@services/alumnos.service';
import { GruposService } from '@services/grupos.service';
import { AlumnoGpo } from '@/models/AlumnoGpo';
import { Asigna } from '@/models/Asignadocgpo';
import { AlumnoIns } from '@/models/AlumnoIns';
import { AsignacionService } from '@services/asignacion.service';

@Component({
  selector: 'app-alumnogpo',
  templateUrl: './alumnogpo.component.html',
  styleUrls: ['./alumnogpo.component.scss']
})
export class AlumnogpoComponent {
  @BlockUI()
  blockUI!: NgBlockUI;
  @ViewChild('myModalClose') modalClose;
  Usuarios: any;
  Materias: any;
  Docentes: any;
  Grupos:any;
  AsignaDoc: any;
  ListaAlumnos: any;
  Alumnos:any;
  asignacion: Asigna = new Asigna();
  alumnoIns: AlumnoGpo = new AlumnoGpo();
  resp: any;
  fecCrea: any;
  user: any;
  NumeroAlumnos:any;
  selectedOption: number;
  ngOnInit(): void {
    this.cargarAsignacion();
    this.cargarAlumnos(); 
    this.cargarMaterias(); 
    this.cargarGrupos();
    this.user=sessionStorage.UserId;
    this.alumnoIns.UsuarioCreacionID=Number(this.user);
  }
  constructor(
    private router: Router,
    private _asignacion: AsignacionService,
    private _alumno:AlumnosService,
    private _alumnoGpo:AlumnoGpoService,
    private _materia: MateriaService,
    private _grupo:GruposService,
    private datePipe: DatePipe) { }

  cargarAsignacion() {
    this._asignacion.GetAsignacion().subscribe(
      asig => {
        this.AsignaDoc = asig;
        console.log(this.AsignaDoc);


      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarAlumnos() {
    this._alumno.GetAlumnos().subscribe(
      al => {
        this.Alumnos = al;
        console.log(this.Alumnos);
      
      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarMaterias() {
    this._materia.GetMaterias().subscribe(
      per => {
        this.Materias = per;
        //console.log(this.Materias);
        for (let i = 0; i < this.Materias.length; i++) {
          this.fecCrea = this.datePipe.transform(this.Materias[i].fechaCreacion, "dd/MM/yyyy");
          this.Materias[i].fechaCreacion = this.fecCrea;
        }

      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  } 

  cargarGrupos() {
    this._grupo.GetGrupos().subscribe(
      per => {
        this.Grupos = per;
        //console.log(this.Grupos);
       
      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  ///////Busqueda de Asignacion por Materia
  onChangeMat(id: number) {
    console.log()
    if (id == 0) {
      this.cargarAsignacion();
    }
    else {
      this.AsignaDoc = null;
      this._asignacion.GetAsignacionMat(id).subscribe(
        mat => {
          this.AsignaDoc = mat;
          //console.log(this.AsignaDoc);

        }, error => {
          // console.log(error);
          swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
        });
    }

  }

  ///////Busqueda de Asignacion por grupo
  onChangeGpo(id: number) {
    if (id == 0) {
      this.cargarAsignacion();
    } else {
      this.AsignaDoc = null;
      this._asignacion.GetAsignacionGpo(id).subscribe(
        mat => {
          this.AsignaDoc = mat;
          //console.log(this.AsignaDoc);

        }, error => {
          // console.log(error);
          swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
        });
    }

  }

  GetAsigna(asignacionId:number,grupoId:number){
    this.alumnoIns.AsignacionID=asignacionId;
    this.alumnoIns.GrupoID=grupoId;
    console.log('asignacionId '+asignacionId);
    console.log('grupoId '+grupoId);
  }

  GetListaAlumnos(id:number){
    this._alumnoGpo.GetListaAlumnos(id).subscribe(
      lista => {
        this.ListaAlumnos = lista;
      /*   console.log(this.ListaAlumnos);
        console.log(this.ListaAlumnos.length); */
        this.NumeroAlumnos=this.ListaAlumnos.length;


      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }


  Guardar() {
    this.blockUI.start('Guardando Asignación...');
    if (this.alumnoIns.EstudianteID == null) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar un Estudiante',
        icon: 'info'
      });
      return;
    }

    
    console.log(this.alumnoIns);
    this.alumnoIns.EstudianteID=Number(this.alumnoIns.EstudianteID);
    console.log(this.alumnoIns);
    this._alumnoGpo.GuardarAlumnoGpo(this.alumnoIns).subscribe(datos => {

      if (datos) {
        this.blockUI.stop();
        this.resp = datos;
        swal.fire('Guardando Datos', `${this.resp.descripcion}`, 'success');
        this.router.navigate(['/alunogpo']);
        this.limpiar();
        this.modalClose.nativeElement.click();
      }
      this.ngOnInit(); 

    }, error => {
      this.blockUI.stop();
      console.log(error);
      this.limpiar();
      this.modalClose.nativeElement.click();
      swal.fire({ title: 'ERROR!!!', text: error.error.descripcion, icon: 'error' });

    });

  }

  limpiar(){
    this.alumnoIns.AsignacionID=null;
    this.alumnoIns.GrupoID=null;
    this.alumnoIns.EstudianteID=null;
   
  }



}

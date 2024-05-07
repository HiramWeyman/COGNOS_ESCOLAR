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
import { Calificacion } from '@/models/Calificacion';
import { Ciclos_Service } from '@services/ciclos.service';
import { ActaEvaluacion } from '@/models/ActaEvaluacion';
import { ActaEvaService } from '@services/actaevaluacion.service';
import { environment} from '../../../environments/environment';

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
  Docente:any;
  Actas:any;
  asignacion: Asigna = new Asigna();
  alumnoIns: AlumnoGpo = new AlumnoGpo();
  alumnoCal: Calificacion = new Calificacion();
  actaEva:ActaEvaluacion=new ActaEvaluacion();
  resp: any;
  fecActa: any;
  fecCrea:any;
  user: any;
  NumeroAlumnos:any;
  selectedOption: number;
  Ciclos:any;
  Examen:any;
  nombreMat:string;
  ngOnInit(): void {
    this.cargarAsignacion();
    this.cargarAlumnos(); 
    this.cargarMaterias(); 
    this.cargarGrupos();
    this.cargarCiclos();
    this.cargarTipoExamen();
    this.cargarDocentes();
    this.user=localStorage.UserId;
    this.alumnoIns.UsuarioCreacionID=Number(this.user);
  }
  constructor(
    private router: Router,
    private _asignacion: AsignacionService,
    private _alumno:AlumnosService,
    private _docente: DocenteService,
    private _alumnoGpo:AlumnoGpoService,
    private _materia: MateriaService,
    private _grupo:GruposService,
    private _ciclos:Ciclos_Service,
    private _actaeva:ActaEvaService,
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

  cargarDocentes() {
    this._docente.GetDocentes().subscribe(
      per => {
        this.Docentes = per;
        console.log(this.Docentes);


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

  cargarCiclos() {
    this._ciclos.GetCiclos().subscribe(
      usr => {
        this.Ciclos = usr;
        console.log(this.Ciclos);
      /*   for(let i=0;i<this.Ciclos.length;i++){
          this.fecIni =this.datePipe.transform(this.Ciclos[i].fechaInicio,"dd/MM/yyyy");
          this.Ciclos[i].fechaInicio= this.fecIni;
          this.fecFin =this.datePipe.transform(this.Ciclos[i].fechaFin,"dd/MM/yyyy");
          this.Ciclos[i].fechaFin= this.fecFin;
        } */
        //console.log(this.Ciclos);
       
      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarTipoExamen() {
    this._alumnoGpo.GetTpoExamen().subscribe(
      usr => {
        this.Examen = usr;
        console.log(this.Examen);
    
       
      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }


  cargarActas(id:number) {
    this._actaeva.GetActas(id).subscribe(
      al => {
        this.Actas = al;
        console.log(this.Actas);
        for(let i=0;i<this.Actas.length;i++){
          this.fecActa =this.datePipe.transform(this.Actas[i].fecha,"dd/MM/yyyy");
          this.Actas[i].fecha= this.fecActa;
        } 
        console.log(this.Actas);
      
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
    //Modelo para Guardar Calificacion
    this.alumnoCal.AsignacionID=this.alumnoIns.AsignacionID;
    this.alumnoCal.EstudianteID=this.alumnoIns.EstudianteID;
    this.alumnoCal.Puntaje=0;
    this.alumnoCal.PuntajeLetra="";
    this._alumnoGpo.GuardarAlumnoGpo(this.alumnoIns).subscribe(datos => {

      if (datos) {

        this.blockUI.stop();
        this.resp = datos;
        swal.fire('Guardando Datos', `${this.resp.descripcion}`, 'success');
        this._alumnoGpo.GuardarCalificacionTemp(this.alumnoCal).subscribe();
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


  Reporte(id:number){
    //console.log(id);
    window.open(`${environment.rutaAPI}` + 'ReportActaEva/'+id);
  }

  GetIDAsignacion(id:number,docente:number,nombreMat:string){
    this.actaEva.AsignacionID=id;
    this.actaEva.DocenteID=docente;
    this.actaEva.Sinodal=docente;
    this.nombreMat=nombreMat;
    this.cargarActas(id);
  }
  GuardarActa(){
    this.blockUI.start('Guardando Acta de Evaluación...');
    if (!this.actaEva.Folio) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar un Folio de Acta',
        icon: 'info'
      });
      return;
    }

    if (!this.actaEva.Fecha) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar una Fecha de Acta de Evaluación',
        icon: 'info'
      });
      return;
    }

    if (this.actaEva.CicloID==null) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar un Ciclo',
        icon: 'info'
      });
      return;
    }

    if (this.actaEva.TipoExamenID==null) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar un Tipo de Examen',
        icon: 'info'
      });
      return;
    }

  /*   if (this.actaEva.Sinodal==null) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar un Sinodal',
        icon: 'info'
      });
      return;
    } */
    console.log(this.actaEva);
    this.actaEva.CicloID=Number(this.actaEva.CicloID);
    this.actaEva.TipoExamenID=Number(this.actaEva.TipoExamenID);
    console.log(this.actaEva);
    this._actaeva.GuardarActa(this.actaEva).subscribe(datos => {
    var id=Number(this.actaEva.AsignacionID);
      if (datos) {

        this.blockUI.stop();
        this.resp = datos;
        swal.fire('Guardando Datos', `${this.resp.descripcion}`, 'success');
        this.cargarActas(id);
        this.actaEva.ActaEvaluacionID=null;
        this.actaEva.AsignacionID=null;
        this.actaEva.CicloID=null;
        this.actaEva.TipoExamenID=null;
        this.actaEva.Folio=null;
        this.actaEva.Fecha=null;

      }
   
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

    this.alumnoCal.AsignacionID=null;
    this.alumnoCal.EstudianteID=null;
    this.alumnoCal.Puntaje=null;
    this.alumnoCal.PuntajeLetra=null;
   
  }



}

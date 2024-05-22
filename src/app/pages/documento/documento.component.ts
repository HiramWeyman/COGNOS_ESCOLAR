import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { AlumnosService } from '@services/alumnos.service';
import { Alumno } from '@/models/Alumno';
import { AlumnoIns } from '@/models/AlumnoIns';
import { Certificado } from '@/models/Certificado';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.scss']
})
export class DocumentoComponent {
  @BlockUI()
  blockUI!: NgBlockUI;
  @ViewChild('myModalClose') modalClose;
  @ViewChild('myModalClose2') modalClose2;
  @ViewChild('myModalClose3') modalClose3;
  Usuarios: any;
  Alumnos: any;
  Semestre: any;
  TipoDoc: any;
  alumno: Alumno = new Alumno();
  certificado: Certificado = new Certificado();
  certificadoList: any;
  alumnoIns: AlumnoIns = new AlumnoIns();
  resp: any;
  fecCrea: any;
  fecCert:any;
  nosemestre: number = null;
  tipo: number = null;
  NoCalificaciones: number;
  ngOnInit(): void {
    this.cargarAlumnos();
    this.cargarUsuarios();
    this.cargarSemestres();
    this.cargarTipoDoc();
  }
  constructor(private router: Router, private _alumno: AlumnosService, private datePipe: DatePipe) { }

  cargarAlumnos() {
    this.blockUI.start('Cargando ...');
    this._alumno.GetAlumnos().subscribe(
      al => {
        this.blockUI.stop();
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
        this.TipoDoc = tipo;
        console.log(this.TipoDoc);

      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }


  GetAlumno(id: number) {
    this._alumno.GetAlumnoID(id).subscribe(
      mat => {
        this.alumno = mat[0];
        //console.log(this.alumno );

      }, error => {
        // console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  ConsultaDoc(idEstudiante: number, Tipodoc: number, Semestre: number) {
    console.log(Tipodoc);
    console.log(idEstudiante);
    console.log(Semestre);

    this._alumno.GetCountCal(idEstudiante).subscribe(
      al => {
        this.NoCalificaciones = al;
        console.log(this.NoCalificaciones);
        if(this.NoCalificaciones==0){
          swal.fire({
            title: 'Información!!!',
            text: 'El alumno aún no tiene calificaciones',
            icon: 'info'
          });
        }else{
          if(Tipodoc==2){
            console.log('Opción 2 Boleta de Calificaciones');
            window.open(`${environment.rutaAPI}` + 'ReportBoleta/' + idEstudiante + '/'+Semestre);
          }
          else if(Tipodoc==3){
            console.log('Opción 3 Kardex de Calificaciones');
            window.open(`${environment.rutaAPI}` + 'ReportKardex/' + idEstudiante);
          }
          else{
            console.log('Opción 4 Cerfificado');
            window.open(`${environment.rutaAPI}` + 'ReportCertificado/' + idEstudiante);
          }

        }
      
    
      
      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
    
  
  }

  Limpiar() {
    this.tipo = null;
    this.nosemestre = null;
  }

  //Solo Se obtiene el i del estudiante para meterlo al modelo
  CrearCertificado(IdEstudiante:number){
   this.certificado.EstudianteID=IdEstudiante;
  }

  cargarCertificados(id:number) {
    console.log(id);
    this._alumno.GetCertificados(id).subscribe(
      al => {
        this.certificadoList = al;
        console.log('Aqui se cargan las actas');
        console.log(this.certificadoList);
        for(let i=0;i<this.certificadoList.length;i++){
          this.fecCert =this.datePipe.transform(this.certificadoList[i].fecha,"dd/MM/yyyy");
          this.certificadoList[i].fecha= this.fecCert;
        }
      /*   for(let i=0;i<this.certificadoList.length;i++){
          this.certificadoList =this.datePipe.transform(this.certificadoList[i].fecha,"dd/MM/yyyy");
          this.certificadoList[i].fecha= this.certificadoList;
        }  */
        console.log(this.certificadoList);
      
      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
  
  GuardarCertificado(){
    this.blockUI.start('Guardando Acta de Evaluación...');
  

    if (!this.certificado.noCertificado) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar un Número de Certificado',
        icon: 'info'
      });
      return;
    }

    if (!this.certificado.folio) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar un Folio de Certificado',
        icon: 'info'
      });
      return;
    }

    if (!this.certificado.fecha) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar una Fecha de Certificado',
        icon: 'info'
      });
      return;
    }
    console.log('Guardar Cert');
    console.log(this.certificado);

    this._alumno.GuardarCertificado(this.certificado).subscribe(datos => {
      if (datos) {

        this.blockUI.stop();
        this.resp = datos;
        swal.fire('Guardando Datos', `${this.resp.descripcion}`, 'success');
        console.log(this.certificado.EstudianteID);
        this.cargarCertificados(this.certificado.EstudianteID);
        this.certificado.certificadoID=null;
        this.certificado.noCertificado=null;
        this.certificado.estudianteID=null;
        this.certificado.EstudianteID=null;
        this.certificado.folio=null;
        this.certificado.eliminado=null;
        this.certificado.fecha=null;

      }
   
    }, error => {
      this.blockUI.stop();
      console.log(error);
      swal.fire({ title: 'ERROR!!!', text: error.error, icon: 'error' });
      //this.limpiar();
      //this.modalClose2.nativeElement.click();
      

    });
  }

  Reporte(id:number){
    //console.log(id);
    window.open(`${environment.rutaAPI}` + 'ReportCertificado/'+id);
  }

  GetCertificado(idCertificado:number){

    this._alumno.GetCertificado(idCertificado).subscribe(
      al => {
        this.certificado = al;
        console.log('Aqui se Obtiene el certificado');
        console.log(this.certificado);
        this.fecCert =this.datePipe.transform(this.certificado.fecha,"yyyy-MM-dd");
        this.certificado.fecha= this.fecCert;
    
        console.log(this.certificado);
      
      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
    console.log(idCertificado);
  }

  EliminarCertificado(idCertificado:number,EstudianteId:number){
    console.log(idCertificado);
    swal.fire({
      title: "Esta seguro de que quiere eliminar este certificado?",
      text: "Una vez eliminado no se podra recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminalo!",
      cancelButtonText: "Cancelar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.blockUI.start('Eliminando Certificado ...');
        this._alumno.DeleteCertificado(idCertificado).subscribe(datos => {
          
            if (datos) {
              this.blockUI.stop();
              this.resp = datos;
              swal.fire('Eliminando Certificado', `${this.resp.descripcion}`, 'success');
              this.cargarCertificados(EstudianteId);
            }
         
          }, error => {
            this.blockUI.stop();
            console.log(error);
            swal.fire({ title: 'ERROR!!!', text: error.error, icon: 'error' });
          });
    
      }
    });
  }

  ActualizaCertificado(cert:Certificado){
     console.log(cert);
     this._alumno.UpdateCertificado(this.certificado).subscribe(datos => {
      if (datos) {

        this.blockUI.stop();
        this.resp = datos;
        swal.fire('Actualizando Datos', `${this.resp.descripcion}`, 'success');
        console.log(this.certificado.estudianteID);
        this.cargarCertificados(this.certificado.estudianteID);
        this.certificado.certificadoID=null;
        this.certificado.noCertificado=null;
        this.certificado.estudianteID=null;
        this.certificado.EstudianteID=null;
        this.certificado.folio=null;
        this.certificado.eliminado=null;
        this.certificado.fecha=null;
        this.modalClose3.nativeElement.click();
      }
   
    }, error => {
      this.blockUI.stop();
      console.log(error);
      swal.fire({ title: 'ERROR!!!', text: error.error, icon: 'error' });
 
    });
  }


}

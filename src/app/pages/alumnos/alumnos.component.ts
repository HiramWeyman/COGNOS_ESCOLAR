import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';

import { DocenteIns } from '@/models/DocenteIns';
import { AlumnosService } from '@services/alumnos.service';
import { Alumno } from '@/models/Alumno';
import { AlumnoIns } from '@/models/AlumnoIns';
import { GeneracionesService } from '@services/generaciones.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent {
  @BlockUI()
  blockUI!: NgBlockUI;
  @ViewChild('myModalClose') modalClose;
  Usuarios:any;
  Alumnos:any;
  ListaGeneraciones:any;
  alumno:Alumno=new Alumno();
  alumnoIns:AlumnoIns=new AlumnoIns();
  resp:any;
  fecCrea:any;
  ngOnInit(): void {
    this.cargarAlumnos();
    this.cargarUsuarios();
    this.cargarListaGeneraciones();
    }
    constructor(private router: Router,private _alumno:AlumnosService,private _listaGeneraciones:GeneracionesService,private datePipe: DatePipe){}

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

    limpiar(){

      this.alumno.estudianteID=null;
      this.alumno.generacionID=null;
      this.alumno.grupoID=null;
      this.alumno.usuarioID=null;
      this.alumno.paterno=null;
      this.alumno.materno=null;
      this.alumno.nombre=null;
      this.alumno.mail=null;
   
    }

/* 
    limpiarIns(){

      this.docenteIns.docenteID=null;
      this.docenteIns.paterno=null;
      this.docenteIns.materno=null;
      this.docenteIns.nombre=null;
      this.docenteIns.mail=null;
      this.docenteIns.usuarioID=null;
   
    } */

    Guardar(){
      this.blockUI.start('Guardando Alumno...');
   

      if(this.alumnoIns.usuarioID==null){
        this.blockUI.stop();
        swal.fire({
          title: 'Información!!!',
          text: 'Falta Ingresar un Usuario Alumno',
          icon: 'info'
        });
        return;
      }
    
      this._alumno.GuardarAlumno(this.alumnoIns).subscribe(datos => {
        
        if(datos){
          this.blockUI.stop();
          this.resp=datos;
          swal.fire('Guardando Datos', `${this.resp.descripcion}`, 'success');
          this.router.navigate(['/alumnos']); 
          this.limpiar();
          this.modalClose.nativeElement.click();
        }
        this.ngOnInit();
    
      },error => {
        this.blockUI.stop();
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });

    }

    Actualizar(){
      this._alumno.UpdateAlumno(this.alumno).subscribe(datos => {
    
        if(datos){
          this.blockUI.stop();
          this.resp=datos;
          swal.fire('Actualizando Datos', `${this.resp.descripcion}`, 'success');
          this.router.navigate(['/alumnos']); 
          this.limpiar();
          this.modalClose.nativeElement.click();
        }
        this.ngOnInit();
    
      },error => {
        this.blockUI.stop();
        console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.error, icon: 'error' });
      });

    }

    Delete(id:number){
      swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrarlo',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this._alumno.DeleteAlumno(id).subscribe(
            datos => {
              if (datos) {
                this.blockUI.stop();
                this.resp = datos;
                swal.fire('Eliminando Alumno', `${this.resp.descripcion}`, 'success');
                this.router.navigate(['/alumnos']); 
              }
              this.ngOnInit();
            },
            error => {
              this.blockUI.stop();
              console.log(error);
              //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
            }
          );
        }
      });
    }

    cargarListaGeneraciones() {
      this._listaGeneraciones.GetGeneraciones().subscribe(
        sem => {
          this.ListaGeneraciones = sem;
          console.log(this.ListaGeneraciones);
  
        }, error => {
          //console.log(error);
          swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
        });
    }
}

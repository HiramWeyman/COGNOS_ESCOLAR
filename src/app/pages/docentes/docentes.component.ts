import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
import { Materia } from '@/models/Materia';
import { DocenteService } from '@services/docente.service';
import { Docente } from '@/models/Docente';
import { DocenteIns } from '@/models/DocenteIns';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.scss']
})
export class DocentesComponent {
  @BlockUI()
  blockUI!: NgBlockUI;
  @ViewChild('myModalClose') modalClose;
  Usuarios:any;
  Docentes:any;
  docente:Docente=new Docente();
  docenteIns:DocenteIns=new DocenteIns();
  resp:any;
  fecCrea:any;
  ngOnInit(): void {
    this.cargarDocentes();
    this.cargarUsuarios();
    }
    constructor(private router: Router,private _docente:DocenteService,private datePipe: DatePipe){}
  
    cargarDocentes() {
      this._docente.GetDocentes().subscribe(
        per => {
          this.Docentes = per;
          //console.log(this.Docentes);
          
         
        }, error => {
          //console.log(error);
          swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
        });
    }

    cargarUsuarios() {
      this._docente.GetUsuariosDoc().subscribe(
        usr => {
          this.Usuarios = usr;
         // console.log(this.Usuarios);
         
        }, error => {
          //console.log(error);
          swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
        });
    }

    GetDocente(id:number){
      this._docente.GetDocenteID(id).subscribe(
        mat => {
          this.docente= mat[0];
          //console.log(this.docente );
       
        }, error => {
         // console.log(error);
          swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
        });
    }

    limpiar(){

      this.docente.docenteID=null;
      this.docente.paterno=null;
      this.docente.materno=null;
      this.docente.nombre=null;
      this.docente.mail=null;
   
    }


    limpiarIns(){

      this.docenteIns.docenteID=null;
      this.docenteIns.paterno=null;
      this.docenteIns.materno=null;
      this.docenteIns.nombre=null;
      this.docenteIns.mail=null;
      this.docenteIns.usuarioID=null;
   
    }

    Guardar(){
      this.blockUI.start('Guardando docente...');
   

      if(this.docenteIns.usuarioID==null){
        this.blockUI.stop();
        swal.fire({
          title: 'Información!!!',
          text: 'Falta Ingresar un Usuario Docente',
          icon: 'info'
        });
        return;
      }
    
  
      this._docente.GuardarDocente(this.docenteIns).subscribe(datos => {
        
        if(datos){
          this.blockUI.stop();
          this.resp=datos;
          swal.fire('Guardando Datos', `${this.resp.descripcion}`, 'success');
          this.router.navigate(['/docentes']); 
          this.limpiarIns();
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
      this._docente.UpdateDocente(this.docente).subscribe(datos => {
    
        if(datos){
          this.blockUI.stop();
          this.resp=datos;
          swal.fire('Actualizando Datos', `${this.resp.descripcion}`, 'success');
          this.router.navigate(['/docentes']); 
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

    Delete(id:number){
      this._docente.DeleteDocente(id).subscribe(datos => {
    
        if(datos){
          this.blockUI.stop();
          this.resp=datos;
          swal.fire('Cancelando Docente', `${this.resp.descripcion}`, 'success');
          this.router.navigate(['/docentes']); 
       
        }
        this.ngOnInit();
    
      },error => {
        this.blockUI.stop();
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
      
    }
}

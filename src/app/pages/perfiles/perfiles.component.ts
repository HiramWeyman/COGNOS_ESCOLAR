import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
import { PerfilesService } from '@services/perfiles.service';
import { Perfil } from '@/models/Perfil';
import { PerfilIns } from '@/models/PerfilIns';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.scss']
})
export class PerfilesComponent {
  @BlockUI()
  blockUI!: NgBlockUI;
  @ViewChild('myModalClose') modalClose;
  Perfiles:any;
  perfil:Perfil=new Perfil();
  perfilIns:PerfilIns=new PerfilIns();
  resp:any;
  fecIni:any;
  fecFin:any;
  ngOnInit(): void {
  this.cargarPerfiles();
  }
  constructor(private router: Router,private _perfil:PerfilesService,){}

  cargarPerfiles() {
    this._perfil.GetPerfiles().subscribe(
      per => {
        this.Perfiles = per;
        console.log(this.Perfiles);
       
      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  GetPerfil(id:number){
    this._perfil.GetPerfilID(id).subscribe(
      per => {
        this.perfil= per[0];
        console.log(this.perfil );
     
      }, error => {
       // console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
  Actualizar(){
    this._perfil.UpdatePerfil(this.perfil).subscribe(datos => {
    
      if(datos){
        this.blockUI.stop();
        this.resp=datos;
        swal.fire('Actualizando Datos', `${this.resp.descripcion}`, 'success');
        this.router.navigate(['/perfil']); 
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

  Guardar(){
    this.blockUI.start('Guardando Perfil...');
    //console.log(this.ciclo);
    if(!this.perfil.nombrePerfil){
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Nombre de Perfil',
        icon: 'info'
      });
      return;
    }

    if(!this.perfil.descripcion){
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Descripción',
        icon: 'info'
      });
      return;
    }
  
    if(this.perfil.activo==null){
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Estatus',
        icon: 'info'
      });
      return;
    }
  
  
  
    this.perfilIns.NombrePerfil=this.perfil.nombrePerfil;
    this.perfilIns.Activo=this.perfil.activo;
    this.perfilIns.Descripcion=this.perfil.descripcion;
    this.perfilIns.PerfilID=this.perfil.perfilID;

   
    this._perfil.GuardarPerfil(this.perfil).subscribe(datos => {
      
      if(datos){
        this.blockUI.stop();
        this.resp=datos;
        swal.fire('Guardando Datos', `${this.resp.descripcion}`, 'success');
        this.router.navigate(['/perfil']); 
        this.limpiar();
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

  limpiar(){
    this.perfil.nombrePerfil=null;
    this.perfil.descripcion=null;
    this.perfil.activo=null;
    this.perfil.perfilID=null;

  }

  limpiarIns(){
    this.perfilIns.NombrePerfil=null;
    this.perfilIns.Descripcion=null;
    this.perfilIns.Activo=null;
    this.perfilIns.PerfilID=null;
  }
}

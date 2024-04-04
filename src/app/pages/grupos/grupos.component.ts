import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Component, ViewChild } from '@angular/core';
import { Grupo } from '@/models/Grupo';
import { GruposService } from '@services/grupos.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Ciclos_Service } from '@services/ciclos.service';
import { GrupoIns } from '@/models/GrupoIns';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent {
  @BlockUI()
  blockUI!: NgBlockUI;
  @ViewChild('myModalClose') modalClose;
  Grupos:any;
  Ciclos:any;
  CiclosRec:any;
  grupo:Grupo=new Grupo();
  grupoIns:GrupoIns=new GrupoIns();
  //perfilIns:PerfilIns=new PerfilIns();
  resp:any;
  fecIni:any;
  fecFin:any;
  ngOnInit(): void {
  this.cargarGrupos();
  this.cargarCiclos();
  }
  constructor(private router: Router,private _grupo:GruposService,private _ciclos:Ciclos_Service){}

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

  cargarCiclos() {
    this._ciclos.GetCiclos().subscribe(
      usr => {
        this.Ciclos = usr;
        const gporec = this.Ciclos .filter(
          (gpo) => gpo.activo == true
        );
        console.log(this.Ciclos);
        this.CiclosRec=gporec;
        console.log(this.CiclosRec);
      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  } 
  GetGrupo(id:number){
    this._grupo.GetGrupoID(id).subscribe(
      per => {
        this.grupo= per[0];
        console.log(this.grupo );
     
      }, error => {
       // console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
  Actualizar(){
    this._grupo.UpdateGrupo(this.grupo).subscribe(datos => {
    
      if(datos){
        this.blockUI.stop();
        this.resp=datos;
        swal.fire('Actualizando Datos', `${this.resp.descripcion}`, 'success');
        this.router.navigate(['/grupos']); 
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
    this.blockUI.start('Guardando Grupo...');
    //console.log(this.ciclo);


    if(!this.grupo.nombre){
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Nombre de Grupo',
        icon: 'info'
      });
      return;
    }

    if(!this.grupo.descripcion){
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Descripción de Grupo',
        icon: 'info'
      });
      return;
    }
  
    if(this.grupo.activo==null){
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Estatus',
        icon: 'info'
      });
      return;
    }

    if(this.grupo.cicloID==null){
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Ciclo',
        icon: 'info'
      });
      return;
    }
  
    this.grupoIns.GrupoID=this.grupo.grupoID;
    this.grupoIns.Nombre=this.grupo.nombre;
    this.grupoIns.Descripcion=this.grupo.descripcion;
    this.grupoIns.CicloID=this.grupo.cicloID;

    this._grupo.GuardarGrupo(this.grupoIns).subscribe(datos => {
      
      if(datos){
        this.blockUI.stop();
        this.resp=datos;
        swal.fire('Guardando Datos', `${this.resp.descripcion}`, 'success');
        this.router.navigate(['/grupos']); 
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
    this._grupo.DeleteGrupo(id).subscribe(datos => {
    
      if(datos){
        this.blockUI.stop();
        this.resp=datos;
        swal.fire('Cancelando Grupo', `${this.resp.descripcion}`, 'success');
        this.router.navigate(['/grupos']); 
     
      }
      this.ngOnInit();
  
    },error => {
      this.blockUI.stop();
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }


  limpiar(){
    this.grupo.grupoID=null;
    this.grupo.nombre=null;
    this.grupo.descripcion=null;
    this.grupo.activo=null;
    this.grupo.cicloID=null;
  }
}

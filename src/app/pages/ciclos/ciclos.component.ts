import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Ciclos_Service } from '@services/ciclos.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
import { Ciclos } from '@/models/Ciclos';
import { CiclosIns } from '@/models/CiclosIns';
@Component({
  selector: 'app-ciclos',
  templateUrl: './ciclos.component.html',
  styleUrls: ['./ciclos.component.scss']
})
export class CiclosComponent {
  @BlockUI()
  blockUI!: NgBlockUI;
  @ViewChild('myModalClose') modalClose;
  Ciclos:any;
  ciclo:Ciclos=new Ciclos();
  cicloIns:CiclosIns=new CiclosIns();
  resp:any;
  fecIni:any;
  fecFin:any;
  ngOnInit(): void {
  this.cargarCiclos();
  }
  constructor(private router: Router,private _ciclos:Ciclos_Service,private datePipe: DatePipe){}

  cargarCiclos() {
    this._ciclos.GetCiclos().subscribe(
      usr => {
        this.Ciclos = usr;
        //console.log(this.Ciclos);
        for(let i=0;i<this.Ciclos.length;i++){
          this.fecIni =this.datePipe.transform(this.Ciclos[i].fechaInicio,"dd/MM/yyyy");
          this.Ciclos[i].fechaInicio= this.fecIni;
          this.fecFin =this.datePipe.transform(this.Ciclos[i].fechaFin,"dd/MM/yyyy");
          this.Ciclos[i].fechaFin= this.fecFin;
        }
        //console.log(this.Ciclos);
       
      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  GetCiclo(id:number){
    this._ciclos.GetCicloID(id).subscribe(
      cl => {
        this.ciclo = cl[0];
        //console.log(this.ciclo );
        this.fecIni =this.datePipe.transform(this.ciclo.fechaInicio,"yyyy-MM-dd");
        this.ciclo.fechaInicio= this.fecIni;
        this.fecFin =this.datePipe.transform(this.ciclo.fechaFin,"yyyy-MM-dd");
        this.ciclo.fechaFin= this.fecFin;
      }, error => {
       // console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  limpiar(){
    this.ciclo.titulo=null;
    this.ciclo.activo=null;
    this.ciclo.fechaInicio=null;
    this.ciclo.fechaFin=null;
    this.ciclo.cicloID=null;
  }

  limpiarIns(){
    this.cicloIns.Titulo=null;
    this.cicloIns.Activo=null;
    this.cicloIns.FechaInicio=null;
    this.cicloIns.FechaFin=null;
  }

  ActCiclo(){
    this._ciclos.UpdateCiclo(this.ciclo).subscribe(datos => {
    
      if(datos){
        this.blockUI.stop();
        this.resp=datos;
        swal.fire('Actualizando Datos', `${this.resp.descripcion}`, 'success');
        this.router.navigate(['/ciclos']); 
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
    this.blockUI.start('Guardando Usuario...');
    //console.log(this.ciclo);
    if(!this.ciclo.titulo){
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Nombre de Ciclo',
        icon: 'info'
      });
      return;
    }
  
    if(this.ciclo.activo==null){
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Estatus',
        icon: 'info'
      });
      return;
    }
  
    if(!this.ciclo.fechaInicio){
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Fecha de Inicio',
        icon: 'info'
      });
      return;
    }
  
    if(!this.ciclo.fechaFin){
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Fecha Final',
        icon: 'info'
      });
      return;
    }
  
  
    this.cicloIns.Titulo=this.ciclo.titulo;
    this.cicloIns.Activo=this.ciclo.activo;
    this.cicloIns.FechaInicio=this.ciclo.fechaInicio;
    this.cicloIns.FechaFin=this.ciclo.fechaFin;

   
    this._ciclos.GuardarCiclo(this.cicloIns).subscribe(datos => {
      
      if(datos){
        this.blockUI.stop();
        this.resp=datos;
        swal.fire('Guardando Datos', `${this.resp.descripcion}`, 'success');
        this.router.navigate(['/ciclos']); 
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
}

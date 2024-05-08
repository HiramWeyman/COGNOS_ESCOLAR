import { Generacion } from '@/models/Generacion';
import { GeneracionIns } from '@/models/GeneracionIns';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GeneracionesService } from '@services/generaciones.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { Semestres_Service } from '@services/semestres.service';

@Component({
  selector: 'app-generaciones',
  templateUrl: './generaciones.component.html',
  styleUrls: ['./generaciones.component.scss']
})
export class GeneracionesComponent {
  @BlockUI()
  blockUI!: NgBlockUI;
  @ViewChild('myModalClose') modalClose;
  Generaciones:any;
  ListaSemestres:any;
  generacion:Generacion=new Generacion();
  generacionIns:GeneracionIns=new GeneracionIns();
  resp:any;
  fecIni:any;
  fecFin:any;
  ngOnInit(): void {
  this.cargarGeneraciones();
  this.cargarListaSemestres();
  }
  constructor(private router: Router,private _generacion:GeneracionesService,private _listaSemestre:Semestres_Service,private datePipe: DatePipe){}


  cargarGeneraciones() {
    this._generacion.GetGeneraciones().subscribe(
      gen => {
        this.Generaciones = gen;
        console.log(this.Generaciones);
        for(let i=0;i<this.Generaciones.length;i++){
          this.fecIni =this.datePipe.transform(this.Generaciones[i].fechaInicio,"dd/MM/yyyy");
          this.Generaciones[i].fechaInicio= this.fecIni;
          this.fecFin =this.datePipe.transform(this.Generaciones[i].fechaFin,"dd/MM/yyyy");
          this.Generaciones[i].fechaFin= this.fecFin;
        }
       
      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  GetGeneracion(id:number){
    this._generacion.GetGeneracionID(id).subscribe(
      gen => {
        this.generacion= gen[0];
        console.log(this.generacion);
        this.fecIni =this.datePipe.transform(this.generacion.fechaInicio,"yyyy-MM-dd");
        this.generacion.fechaInicio= this.fecIni;
        this.fecFin =this.datePipe.transform(this.generacion.fechaFin,"yyyy-MM-dd");
        this.generacion.fechaFin= this.fecFin;
     
      }, error => {
       // console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  limpiar(){
    this.generacion.generacionID=null;
    this.generacion.titulo=null;
    this.generacion.fechaInicio=null;
    this.generacion.fechaFin=null;
    this.generacion.semestreID=null;
  }

  limpiar2(){
    this.generacionIns.GeneracionID=null;
    this.generacionIns.Titulo=null;
    this.generacionIns.FechaInicio=null;
    this.generacionIns.FechaFin=null;
    this.generacionIns.SemestreID=null;
  }

  cargarListaSemestres() {
    this._listaSemestre.GetListaSemestres().subscribe(
      sem => {
        this.ListaSemestres = sem;
        console.log(this.ListaSemestres);

      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  Actualizar(){
    this._generacion.UpdateGeneracion(this.generacionIns).subscribe(datos => {
    
      if(datos){
        this.blockUI.stop();
        this.resp=datos;
        swal.fire('Actualizando Datos', `${this.resp.descripcion}`, 'success');
        this.router.navigate(['/generaciones']); 
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
    if(!this.generacion.titulo){
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Nombre de Generacion',
        icon: 'info'
      });
      return;
    }
  
    if(!this.generacion.fechaInicio){
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Fecha de Inicio',
        icon: 'info'
      });
      return;
    }
  
    if(!this.generacion.fechaFin){
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Fecha Final',
        icon: 'info'
      });
      return;
    }

    if(!this.generacion.semestreID){
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Semestre',
        icon: 'info'
      });
      return;
    }
  

  
    this.generacionIns.Titulo=this.generacion.titulo;
    this.generacionIns.FechaInicio=this.generacion.fechaInicio;
    this.generacionIns.FechaFin=this.generacion.fechaFin;
    this.generacionIns.SemestreID=this.generacion.semestreID;

    
    console.log(this.generacionIns);
    this._generacion.GuardarGeneracion(this.generacionIns).subscribe(datos => {
      
      if(datos){
        this.blockUI.stop();
        this.resp=datos;
        swal.fire('Guardando Datos', `${this.resp.descripcion}`, 'success');
        this.router.navigate(['/generaciones']); 
        this.limpiar();
        this.limpiar2();
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

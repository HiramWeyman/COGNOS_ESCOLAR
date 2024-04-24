import { Generacion } from '@/models/Generacion';
import { GeneracionIns } from '@/models/GeneracionIns';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GeneracionesService } from '@services/generaciones.service';
import { NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';


@Component({
  selector: 'app-generaciones',
  templateUrl: './generaciones.component.html',
  styleUrls: ['./generaciones.component.scss']
})
export class GeneracionesComponent {
  blockUI!: NgBlockUI;
  @ViewChild('myModalClose') modalClose;
  Generaciones:any;
  generacion:Generacion=new Generacion();
  generacionIns:GeneracionIns=new GeneracionIns();
  resp:any;
  fecIni:any;
  fecFin:any;
  ngOnInit(): void {
  this.cargarGeneraciones();
  }
  constructor(private router: Router,private _generacion:GeneracionesService,){}


  cargarGeneraciones() {
    this._generacion.GetGeneraciones().subscribe(
      gen => {
        this.Generaciones = gen;
        console.log(this.Generaciones);
       
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

}

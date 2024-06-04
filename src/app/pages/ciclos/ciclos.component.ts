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
  fecCierre:any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  ngOnInit(): void {
  this.cargarCiclos();
  }
  constructor(private router: Router,private _ciclos:Ciclos_Service,private datePipe: DatePipe){}

  cargarCiclos() {
    this.blockUI.start('Cargando ...');
    this._ciclos.GetCiclos().subscribe(
      usr => {
        this.blockUI.stop();
        this.Ciclos = usr;
        console.log("CargarCiclos",this.Ciclos);
        for(let i=0;i<this.Ciclos.length;i++){
          this.fecIni =this.datePipe.transform(this.Ciclos[i].fechaInicio,"dd/MM/yyyy");
          this.Ciclos[i].fechaInicio= this.fecIni;
          this.fecFin =this.datePipe.transform(this.Ciclos[i].fechaFin,"dd/MM/yyyy");
          this.Ciclos[i].fechaFin= this.fecFin;
          this.fecCierre =this.datePipe.transform(this.Ciclos[i].fechaCierreExamen,"dd/MM/yyyy");
          this.Ciclos[i].fechaCierreExamen = this.fecCierre;
        }
        //console.log(this.Ciclos);
       
      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  onTableDataChange(event: any) {
    console.log(event);
    this.page = event;
    this.cargarCiclos();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.cargarCiclos();
  }

  ////Buscar en la tabla
    // Tus variables y métodos existentes...
    searchString: string;

  get filteredUsuarios() {
    return this.filterUsuarios(this.Ciclos, this.searchString);
  }

  filterUsuarios(ciclos: any[], searchString: string): any[] {
    if (!ciclos) return [];
    if (!searchString) return ciclos;

    searchString = searchString.toLowerCase();

    return ciclos.filter(it => {
      return it.titulo.toLowerCase().includes(searchString)
        || it.periodo.toLowerCase().includes(searchString)
        || it.fechaInicio.toLowerCase().includes(searchString)
        || it.fechaFin.toLowerCase().includes(searchString);
        
    });
  }


  GetCiclo(id:number){
    this._ciclos.GetCicloID(id).subscribe(
      cl => {
        this.ciclo = cl[0];
        console.log("Getciclo",this.ciclo );
        this.fecIni =this.datePipe.transform(this.ciclo.fechaInicio,"yyyy-MM-dd");
        this.ciclo.fechaInicio= this.fecIni;
        this.fecFin =this.datePipe.transform(this.ciclo.fechaFin,"yyyy-MM-dd");
        this.ciclo.fechaFin= this.fecFin;
        this.fecCierre =this.datePipe.transform(this.ciclo.fechaCierreExamen,"yyyy-MM-dd");
        this.ciclo.fechaCierreExamen= this.fecCierre;
      }, error => {
       // console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  limpiar(){
    this.ciclo.titulo=null;
    this.ciclo.periodo=null;
    this.ciclo.activo=null;
    this.ciclo.fechaInicio=null;
    this.ciclo.fechaFin=null;
    this.ciclo.fechaCierreExamen=null;
    this.ciclo.cicloID=null;
  }

  limpiarIns(){
    this.cicloIns.Titulo=null;
    this.cicloIns.Periodo=null;
    this.cicloIns.Activo=null;
    this.cicloIns.FechaInicio=null;
    this.cicloIns.FechaFin=null;
    this.cicloIns.FechaCierreExamen=null;
  }

  ActCiclo(){
    this._ciclos.UpdateCiclo(this.ciclo).subscribe(datos => {
      console.log("fecha cierre",this.ciclo);
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
  
    if(!this.ciclo.fechaCierreExamen){
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Fecha de Cierre de Evaluacion',
        icon: 'info'
      }); 
      return;
    }
  
    this.cicloIns.Titulo=this.ciclo.titulo;
    this.cicloIns.Periodo=this.ciclo.periodo;
    this.cicloIns.Activo=this.ciclo.activo;
    this.cicloIns.FechaInicio=this.ciclo.fechaInicio;
    this.cicloIns.FechaFin=this.ciclo.fechaFin;
    this.cicloIns.FechaCierreExamen=this.ciclo.fechaCierreExamen;

   
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

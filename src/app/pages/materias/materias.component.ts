import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
import { Materia } from '@/models/Materia';
import { MateriaService } from '@services/materia.service';


@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss']
})
export class MateriasComponent {
  @BlockUI()
  blockUI!: NgBlockUI;
  @ViewChild('myModalClose') modalClose;
  Materias:any;
  materia:Materia=new Materia();
  resp:any;
  fecCrea:any;

  ngOnInit(): void {
  this.cargarMaterias();
  }
  constructor(private router: Router,private _materia:MateriaService,private datePipe: DatePipe){}

  cargarMaterias() {
    this._materia.GetMaterias().subscribe(
      per => {
        this.Materias = per;
        console.log(this.Materias);
        for(let i=0;i<this.Materias.length;i++){
          this.fecCrea =this.datePipe.transform(this.Materias[i].fechaCreacion,"dd/MM/yyyy");
          this.Materias[i].fechaCreacion= this.fecCrea;
        }
       
      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  Getmateria(id:number){
    this._materia.GetMateriaID(id).subscribe(
      mat => {
        this.materia= mat[0];
        console.log(this.materia );
     
      }, error => {
       // console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
  Actualizar(){
    this._materia.UpdateMateria(this.materia).subscribe(datos => {
    
      if(datos){
        this.blockUI.stop();
        this.resp=datos;
        swal.fire('Actualizando Datos', `${this.resp.descripcion}`, 'success');
        this.router.navigate(['/materias']); 
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
    this.blockUI.start('Guardando materia...');
    //console.log(this.ciclo);
    if(!this.materia.clave){
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Clave de Materia',
        icon: 'info'
      });
      return;
    }

    if(!this.materia.nombre){
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Nombre de Materia',
        icon: 'info'
      });
      return;
    }

    if(!this.materia.creditos){
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Creditos de la Materia',
        icon: 'info'
      });
      return;
    }
  
    if(this.materia.activo==null){
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Estatus',
        icon: 'info'
      });
      return;
    }
  

    this._materia.GuardarMateria(this.materia).subscribe(datos => {
      
      if(datos){
        this.blockUI.stop();
        this.resp=datos;
        swal.fire('Guardando Datos', `${this.resp.descripcion}`, 'success');
        this.router.navigate(['/materias']); 
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
    this._materia.DeleteMateria(id).subscribe(datos => {
    
      if(datos){
        this.blockUI.stop();
        this.resp=datos;
        swal.fire('Cancelando Materia', `${this.resp.descripcion}`, 'success');
        this.router.navigate(['/materias']); 
     
      }
      this.ngOnInit();
  
    },error => {
      this.blockUI.stop();
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }

  limpiar(){
    this.materia.clave=null;
    this.materia.nombre=null;
    this.materia.creditos=null;
    this.materia.activo=null;
    this.materia.materiaID=null;

  }


}

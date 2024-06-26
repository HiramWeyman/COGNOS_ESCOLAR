import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
import { Materia } from '@/models/Materia';
import { MateriaService } from '@services/materia.service';
import { MateriaIns } from '@/models/MateriaIns';


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
  materiaIns:MateriaIns=new MateriaIns();
  resp:any;
  fecCrea:any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
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

  onTableDataChange(event: any) {
    console.log(event);
    this.page = event;
    this.cargarMaterias();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.cargarMaterias();
  }

  ////Buscar en la tabla
    // Tus variables y métodos existentes...
    searchString: string;

  get filteredUsuarios() {
    return this.filterUsuarios(this.Materias, this.searchString);
  }

  filterUsuarios(materias: any[], searchString: string): any[] {
    if (!materias) return [];
    if (!searchString) return materias;

    searchString = searchString.toLowerCase();

    return materias.filter(it => {
      return it.nombre.toLowerCase().includes(searchString)
        || it.clave.toLowerCase().includes(searchString)
      /*   || it.horas.toLowerCase().includes(searchString) */
        || it.fechaCreacion.toLowerCase().includes(searchString);
        
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

    if(this.materia.semestreID==null){
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Semestre',
        icon: 'info'
      });
      return;
    }
  
this.materiaIns.MateriaID=this.materia.materiaID;
this.materiaIns.Nombre =this.materia.nombre.trim();
this.materiaIns.Clave =this.materia.clave;
this.materiaIns.Creditos =this.materia.creditos;
this.materiaIns.Horas=this.materia.horas;
this.materiaIns.SemestreID =this.materia.semestreID;
this.materiaIns.Activo =this.materia.activo;

    this._materia.GuardarMateria(this.materiaIns).subscribe(datos => {
      
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
        this._materia.DeleteMateria(id).subscribe(
          datos => {
            if (datos) {
              this.blockUI.stop();
              this.resp = datos;
              swal.fire('Eliminando Materia', `${this.resp.descripcion}`, 'success');
              this.router.navigate(['/materias']); 
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

  limpiar(){
    this.materia.clave=null;
    this.materia.nombre=null;
    this.materia.creditos=null;
    this.materia.activo=null;
    this.materia.horas=null;
    this.materia.materiaID=null;
    this.materia.semestreID=null;

    this.materiaIns.MateriaID=null;
    this.materiaIns.Nombre =null;
    this.materiaIns.Clave =null;
    this.materiaIns.Creditos =null;
    this.materiaIns.Horas=null;
    this.materiaIns.SemestreID =null;
    this.materiaIns.Activo =null;

  }


}

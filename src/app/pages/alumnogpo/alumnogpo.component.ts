import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';

import { DocenteService } from '@services/docente.service';
import { MateriaService } from '@services/materia.service';


import { AlumnoGpoService } from '@services/alumnogpo.service';
import { AlumnosService } from '@services/alumnos.service';
import { GruposService } from '@services/grupos.service';
import { AlumnoGpo } from '@/models/AlumnoGpo';

@Component({
  selector: 'app-alumnogpo',
  templateUrl: './alumnogpo.component.html',
  styleUrls: ['./alumnogpo.component.scss']
})
export class AlumnogpoComponent {
  @BlockUI()
  blockUI!: NgBlockUI;
  @ViewChild('myModalClose') modalClose;
  Usuarios: any;
  Materias: any;
  Docentes: any;
  AsignaAlGpo: any;
  Alumnos: any;
  Grupos: any;
  alumnoGpo: AlumnoGpo = new AlumnoGpo();
/*   alumnoIns: AlumnoIns = new AlumnoIns(); */
  resp: any;
  fecCrea: any;
  selectedOption: number;
  ngOnInit(): void {
    this.cargarAsignacionAlumnoGpo();
    this.cargarAlumnos();
    this.cargarGrupos();
  }
  constructor(
    private router: Router,
    private _asignaAlGpo: AlumnoGpoService,
    private _alumno: AlumnosService,
    private _grupos: GruposService,
    private _docente: DocenteService,
    private _materia: MateriaService,
    private datePipe: DatePipe) { }

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

    cargarGrupos() {
      this._grupos.GetGrupos().subscribe(
        per => {
          this.Grupos = per;
          console.log(this.Grupos);
         
        }, error => {
          //console.log(error);
          swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
        });
    }

    cargarAsignacionAlumnoGpo() {
    this._asignaAlGpo.GetAsignacionAlGpo().subscribe(
      asig => {
        this.AsignaAlGpo = asig;
        console.log(this.AsignaAlGpo);

      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  Guardar() {
    this.blockUI.start('Guardando Asignación...');


    if (this.alumnoGpo.grupoID == null || this.alumnoGpo.grupoID ==0 ) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar un Grupo',
        icon: 'info'
      });
      return;
    }

    if (this.alumnoGpo.estudianteID == null ||this.alumnoGpo.estudianteID == 0) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar un Estudiante',
        icon: 'info'
      });
      return;
    }

   
    this._asignaAlGpo.GuardarAlumnoGpo(this.alumnoGpo).subscribe(datos => {

      if (datos) {
        this.blockUI.stop();
        this.resp = datos;
        swal.fire('Guardando Datos', `${this.resp.descripcion}`, 'success');
        this.router.navigate(['/alunogpo']);
        this.limpiar();
        this.modalClose.nativeElement.click();
      }
      this.ngOnInit();

    }, error => {
      this.blockUI.stop();
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });

  }

  limpiar() {
    this.alumnoGpo.estudianteID = null;
    this.alumnoGpo.grupoID = null;

  }
  onChangeGpo(id: number){

  }

}

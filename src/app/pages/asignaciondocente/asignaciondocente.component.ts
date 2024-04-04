import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';

import { AlumnoIns } from '@/models/AlumnoIns';
import { DocenteService } from '@services/docente.service';
import { MateriaService } from '@services/materia.service';
import { AsignacionService } from '@services/asignacion.service';
import { Asigna } from '@/models/Asignadocgpo';


@Component({
  selector: 'app-asignaciondocente',
  templateUrl: './asignaciondocente.component.html',
  styleUrls: ['./asignaciondocente.component.scss']
})
export class AsignaciondocenteComponent {
  @BlockUI()
  blockUI!: NgBlockUI;
  @ViewChild('myModalClose') modalClose;
  Usuarios: any;
  Materias: any;
  Docentes: any;
  AsignaDoc: any;
  asignacion: Asigna = new Asigna();
  alumnoIns: AlumnoIns = new AlumnoIns();
  resp: any;
  fecCrea: any;
  selectedOption: number;
  ngOnInit(): void {
    this.cargarAsignacion();
    this.cargarDocentes();
    this.cargarMaterias();
  }
  constructor(
    private router: Router,
    private _asignacion: AsignacionService,
    private _docente: DocenteService,
    private _materia: MateriaService,
    private datePipe: DatePipe) { }

  cargarAsignacion() {
    this._asignacion.GetAsignacion().subscribe(
      asig => {
        this.AsignaDoc = asig;
        //console.log(this.AsignaDoc);


      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

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

  cargarMaterias() {
    this._materia.GetMaterias().subscribe(
      per => {
        this.Materias = per;
        console.log(this.Materias);
        for (let i = 0; i < this.Materias.length; i++) {
          this.fecCrea = this.datePipe.transform(this.Materias[i].fechaCreacion, "dd/MM/yyyy");
          this.Materias[i].fechaCreacion = this.fecCrea;
        }

      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
  ///////Busqueda de Asignacion por Materia
  onChangeMat(id: number) {
    console.log()
    if (id == 0) {
      this.cargarAsignacion();
    }
    else {
      this.AsignaDoc = null;
      this._asignacion.GetAsignacionMat(id).subscribe(
        mat => {
          this.AsignaDoc = mat;
          //console.log(this.AsignaDoc);

        }, error => {
          // console.log(error);
          swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
        });
    }

  }

  ///////Busqueda de Asignacion por grupo
  onChangeGpo(id: number) {
    if (id == 0) {
      this.cargarAsignacion();
    } else {
      this.AsignaDoc = null;
      this._asignacion.GetAsignacionGpo(id).subscribe(
        mat => {
          this.AsignaDoc = mat;
          //console.log(this.AsignaDoc);

        }, error => {
          // console.log(error);
          swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
        });
    }

  }

  GetAsigna(id: number) {
    this._asignacion.GetAsignaID(id).subscribe(
      mat => {
        this.asignacion = mat[0];
        //console.log(this.asignacion);

      }, error => {
        // console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  Guardar() {
    this.blockUI.start('Guardando Asignación...');


    if (this.asignacion.grupoID == null) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar un Grupo',
        icon: 'info'
      });
      return;
    }

    if (this.asignacion.docenteID == null) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar un Docente',
        icon: 'info'
      });
      return;
    }

    if (this.asignacion.materiaID == null) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar una Materia',
        icon: 'info'
      });
      return;
    }

    this._asignacion.GuardarAsigna(this.asignacion).subscribe(datos => {

      if (datos) {
        this.blockUI.stop();
        this.resp = datos;
        swal.fire('Guardando Datos', `${this.resp.descripcion}`, 'success');
        this.router.navigate(['/asignacion']);
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

  Actualizar() {
    this._asignacion.UpdateAsigna(this.asignacion).subscribe(datos => {

      if (datos) {
        this.blockUI.stop();
        this.resp = datos;
        swal.fire('Actualizando Datos', `${this.resp.descripcion}`, 'success');
        this.router.navigate(['/asignacion']);
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

    this.asignacion.asignacionID = null;
    this.asignacion.grupoID = null;
    this.asignacion.docenteID = null;
    this.asignacion.materiaID = null;

  }

  Delete(id: number) {
    this._asignacion.DeleteAsigna(id).subscribe(datos => {

      if (datos) {
        this.blockUI.stop();
        this.resp = datos;
        swal.fire('Cancelando Aasignación Docente', `${this.resp.descripcion}`, 'success');
        this.router.navigate(['/asignacion']);

      }
      this.ngOnInit();

    }, error => {
      this.blockUI.stop();
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });

  }
}

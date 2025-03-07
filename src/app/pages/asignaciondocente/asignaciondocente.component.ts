import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
import { AlumnoIns } from '@/models/AlumnoIns';
import { DocenteService } from '@services/docente.service';
import { MateriaService } from '@services/materia.service';
import { AsignacionService } from '@services/asignacion.service';
import { Asigna } from '@/models/Asignadocgpo';
import { GruposService } from '@services/grupos.service';
import { AlumnosService } from '@services/alumnos.service';


@Component({
  selector: 'app-asignaciondocente',
  templateUrl: './asignaciondocente.component.html',
  styleUrls: ['./asignaciondocente.component.scss']
})
export class AsignaciondocenteComponent {
  @BlockUI()
  blockUI!: NgBlockUI;
  @ViewChild('myModalClose') modalClose;
  @ViewChild('mat') selectElement!: ElementRef<HTMLSelectElement>;
  
  Usuarios: any;
  Materias: any;
  MateriasSem: any;
  Docentes: any;
  Semestre: any;
  Grupos: any;
  AsignaDoc: any;
  asignacion: Asigna = new Asigna();
  alumnoIns: AlumnoIns = new AlumnoIns();
  resp: any;
  fecCrea: any;
  selectedOption: number;
  idGrupo: number;
  ngOnInit(): void {
    //this.cargarAsignacion();
    this.cargarDocentes();
    this.cargarMaterias();
    this.cargarGrupos();
    this.cargarSemestres();
  }
  constructor(
    private router: Router,
    private _asignacion: AsignacionService,
    private _docente: DocenteService,
    private _alumno: AlumnosService,
    private _materia: MateriaService,
    private _grupo: GruposService,
    private datePipe: DatePipe) { }

  cargarAsignacion() {
    this._asignacion.GetAsignacion().subscribe(
      asig => {
        this.AsignaDoc = asig;
        console.log(this.AsignaDoc);


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

  cargarSemestres() {
    this._alumno.GetSemestres().subscribe(
      sem => {
        this.Semestre = sem;
        console.log(this.Semestre);

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

  ///Buscar La materia Dependiendo Del Semestre
  onChangeMatSem(id: number) {
    console.log(id)
    this._materia.GetMateriasID(id).subscribe(
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

  ///////Busqueda de Asignacion por Materia
  onChangeMat(id: number) {
      if(this.idGrupo==undefined){
          swal.fire({ title: 'Info!!!', text: 'Seleccione un grupo', icon: 'info' });
          this.selectElement.nativeElement.value = "0";
          return;
        }
    this.AsignaDoc = null;
    this._asignacion.GetAsignacionMat(id, this.idGrupo).subscribe(
      mat => {
        this.AsignaDoc = mat;
        //console.log(this.AsignaDoc);

      }, error => {
        // console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
    /*   console.log()
      if (id == 0) {
        this.cargarAsignacion();
      }
      else {
    
      } */

  }

  ///////Busqueda de Asignacion por grupo
  onChangeGpo(id: number) {
    this.idGrupo = id;
    this.AsignaDoc = null;
    this.selectElement.nativeElement.value = "0";
    this._asignacion.GetAsignacionGpo(id).subscribe(
      mat => {
        this.AsignaDoc = mat;
        //console.log(this.AsignaDoc);

      }, error => {
        // console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  /*   if (id == 0) {
      this.cargarAsignacion();
    } else {
     
    } */

  }

  GetAsigna(id: number) {
    this._asignacion.GetAsignaID(id).subscribe(
      mat => {
        this.asignacion = mat[0];
        console.log(this.asignacion);

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
    this.blockUI.start('Actualizando Asignación...');
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

  /* Delete(id: number) {
    this.blockUI.start('Cancelando Asignación...');
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

  } */

  Delete(id: number, docente: string, materia: string) {
    swal.fire({
      title: '¿Deseas Eliminar?',
      text: docente + ' ' + materia + '\n Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._asignacion.DeleteAsigna(id).subscribe(
          datos => {
            if (datos) {
              this.blockUI.stop();
              this.resp = datos;
              swal.fire('Eliminando Asignación Docente:' + docente + '-' + materia, `${this.resp.descripcion}`, 'success');
              this.router.navigate(['/asignacion']);
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
}

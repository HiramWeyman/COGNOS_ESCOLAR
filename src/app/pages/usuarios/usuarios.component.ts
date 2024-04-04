import { Usuarios } from '@/models/Usuarios';
import { UsuariosIns } from '@/models/UsuariosIns';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilesService } from '@services/perfiles.service';
import { UsuariosService } from '@services/usuarios.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
  @BlockUI()
  blockUI!: NgBlockUI;
  @ViewChild('myModalClose') modalClose;
  Usuarios: any;
  Perfiles: any;
  user: Usuarios = new Usuarios();
  userIns: UsuariosIns = new UsuariosIns();
  resp: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarPerfiles();
  }
  constructor(private router: Router, private _user: UsuariosService, private _perfil: PerfilesService) { }

  cargarUsuarios() {
    this._user.GetUsuarios().subscribe(
      usr => {
        this.Usuarios = usr;
        console.log(this.Usuarios);

      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  onTableDataChange(event: any) {
    console.log(event);
    this.page = event;
    this.cargarUsuarios();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.cargarUsuarios();
  }


  cargarPerfiles() {
    this._perfil.GetPerfiles().subscribe(
      per => {
        this.Perfiles = per;
        console.log(this.Perfiles);

      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  GetDatos(id: number) {
    this._user.GetUsuarioID(id).subscribe(
      usr => {
        this.user = usr[0];
        console.log(this.user);
      }, error => {
        console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  Limpiar() {
    this.user.paterno = null;
    this.user.materno = null;
    this.user.nombre = null;
    this.user.mail = null;
    this.user.password = null;
    this.user.perfilID = null;
    this.user.usuarioID = null;
  }

  Guardar() {
    this.blockUI.start('Guardando Usuario...');
    console.log(this.user);
    if (!this.user.paterno) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Apellido Paterno',
        icon: 'info'
      });
      return;
    }

    if (!this.user.materno) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Apellido Materno',
        icon: 'info'
      });
      return;
    }

    if (!this.user.nombre) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Nombre',
        icon: 'info'
      });
      return;
    }

    if (!this.user.mail) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Email',
        icon: 'info'
      });
      return;
    }

    if (!this.user.password) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Password',
        icon: 'info'
      });
      return;
    }

    if (!this.user.perfilID) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Perfil de Usuario',
        icon: 'info'
      });
      return;
    }

    this.userIns.Paterno = this.user.paterno;
    this.userIns.Materno = this.user.materno;
    this.userIns.Nombre = this.user.nombre;
    this.userIns.Mail = this.user.mail;
    this.userIns.Password = this.user.password;
    this.userIns.PerfilID = this.user.perfilID;

    this._user.GuardarUsuario(this.userIns).subscribe(datos => {

      if (datos) {
        this.blockUI.stop();
        this.resp = datos;
        swal.fire('Guardando Datos', `${this.resp.descripcion}`, 'success');
        this.router.navigate(['/usuarios']);
        this.user.paterno = null;
        this.user.materno = null;
        this.user.nombre = null;
        this.user.mail = null;
        this.user.password = null;
        this.user.perfilID = null;
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
    this._user.UpdateUsuarios(this.user).subscribe(datos => {

      if (datos) {
        this.blockUI.stop();
        this.resp = datos;
        swal.fire('Actualizando Datos', `${this.resp.descripcion}`, 'success');
        this.router.navigate(['/usuarios']);
        this.user.paterno = null;
        this.user.materno = null;
        this.user.nombre = null;
        this.user.mail = null;
        this.user.password = null;
        this.user.perfilID = null;
        this.user.usuarioID = null;
        this.modalClose.nativeElement.click();
      }
      this.ngOnInit();

    }, error => {
      this.blockUI.stop();
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }

  Delete(id:number){
    this._user.DeleteUsuario(id).subscribe(datos => {
    
      if(datos){
        this.blockUI.stop();
        this.resp=datos;
        swal.fire('Cancelando Usuario', `${this.resp.descripcion}`, 'success');
        this.router.navigate(['/usuarios']); 
     
      }
      this.ngOnInit();
  
    },error => {
      this.blockUI.stop();
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }


}

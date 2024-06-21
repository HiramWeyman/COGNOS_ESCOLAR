import { Usuarios } from '@/models/Usuarios';
import { UsuariosIns } from '@/models/UsuariosIns';
import { Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilesService } from '@services/perfiles.service';
import { UsuariosService } from '@services/usuarios.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})

export class UsuariosComponent {

  @BlockUI()
  blockUI!: NgBlockUI;
  @ViewChild('myModalClose') modalClose;

  Usuarios: any[];
  Perfiles: any;
  Genero: any;
  user: Usuarios = new Usuarios();
  userIns: UsuariosIns = new UsuariosIns();
  resp: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  fecNac:any;
 

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarPerfiles();
    this.cargarGenero(); 
  }
  constructor(private router: Router, private _user: UsuariosService, private _perfil: PerfilesService, private datePipe: DatePipe) { }

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

  ////Buscar en la tabla
    // Tus variables y métodos existentes...
    searchString: string;
  

    get filteredUsuarios() {
      return this.filterUsuarios(this.Usuarios, this.searchString);
    }
  
    filterUsuarios(usuarios: any[], searchString: string): any[] {
      if (!usuarios) return [];
      if (!searchString) return usuarios;
  
      searchString = searchString.toLowerCase();
  
      return usuarios.filter(it => {
        return it.paterno.toLowerCase().includes(searchString)
          || it.materno.toLowerCase().includes(searchString)
          || it.nombre.toLowerCase().includes(searchString);
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

  cargarGenero() {
    this._user.GetGenero().subscribe(
      per => {
        this.Genero = per;
        console.log(this.Genero);

      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  GetDatos(id: number) {
    this._user.GetUsuarioID(id).subscribe(
      usr => {
        this.user = usr[0];
        console.log("Usuario",this.user);
        this.fecNac =this.datePipe.transform(this.user.fechaNac,"yyyy-MM-dd");
        this.user.fechaNac= this.fecNac;
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
    this.user.domicilio = null;
    this.user.fechaNac = null;
    this.user.telefono = null;
    this.user.exEscuela = null;
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

    if (!this.user.generoID) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Género de Usuario',
        icon: 'info'
      });
      return;
    }
    
    if (this.user.perfilID == 1) {
      if (!this.user.domicilio || !this.user.fechaNac || !this.user.exEscuela || !this.user.telefono) {
        this.blockUI.stop();
        swal.fire({
          title: 'Información!!!',
          text: 'Falta Ingresar Todos los Campos Adicionales',
          icon: 'info'
        });
        return;
      }
      this.userIns.Domicilio = this.user.domicilio;
      this.userIns.FechaNac = this.user.fechaNac;
      this.userIns.ExEscuela = this.user.exEscuela;
      this.userIns.Telefono = this.user.telefono;
    }


    this.userIns.Paterno = this.user.paterno;
    this.userIns.Materno = this.user.materno;
    this.userIns.Nombre = this.user.nombre;
    this.userIns.Mail = this.user.mail;
    this.userIns.Password = this.user.password;
    this.userIns.PerfilID = this.user.perfilID;
    this.userIns.GeneroID = this.user.generoID;

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
        this.user.generoID = null;
        this.user.domicilio = null;
        this.user.fechaNac = null;
        this.user.telefono = null;
        this.user.exEscuela = null;
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
    console.log(this.user);
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
        this.user.generoID = null;
        this.user.usuarioID = null;
        this.user.domicilio = null;
        this.user.fechaNac = null;
        this.user.telefono = null;
        this.user.exEscuela = null;
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

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchString: string): any[] {
    if (!items) return [];
    if (!searchString) return items;

    searchString = searchString.toLowerCase();

    return items.filter(it => {
      return it.paterno.toLowerCase().includes(searchString)
        || it.materno.toLowerCase().includes(searchString)
        || it.nombre.toLowerCase().includes(searchString);
    });
  }
}
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Component, ViewChild } from '@angular/core';
import { Grupo } from '@/models/Grupo';
import { GruposService } from '@services/grupos.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent {
  @BlockUI()
  blockUI!: NgBlockUI;
  @ViewChild('myModalClose') modalClose;
  Grupos:any;
  grupo:Grupo=new Grupo();
  //perfilIns:PerfilIns=new PerfilIns();
  resp:any;
  fecIni:any;
  fecFin:any;
  ngOnInit(): void {
  this.cargarGrupos();
  }
  constructor(private router: Router,private _perfil:GruposService,){}

  cargarGrupos() {
    this._perfil.GetGrupos().subscribe(
      per => {
        this.Grupos = per;
        console.log(this.Grupos);
       
      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
  GetGrupo(id:number){}
}

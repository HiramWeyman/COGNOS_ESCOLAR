import { TipoDocumento } from '@/models/TipoDocumento';
import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TipoDocumentoService } from '@services/tipodocumento.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';

@Component({
  selector: 'app-tipodocumento',
  templateUrl: './tipodocumento.component.html',
  styleUrls: ['./tipodocumento.component.scss']
})
export class TipodocumentoComponent {
  @BlockUI()
  blockUI!: NgBlockUI;
  @ViewChild('myModalClose') modalClose;
  TipoDocumento:any;
  tipoDocumento: TipoDocumento = new TipoDocumento();
  resp:any;
  fecCrea:any;
  ngOnInit(): void {
    this.cargarTipoDocumentos();
    }
    
    constructor(private router: Router,private _tipodocumento:TipoDocumentoService,private datePipe: DatePipe){}

    cargarTipoDocumentos() {
      this._tipodocumento.GetTipoDocumento().subscribe(
        tipDoc => {
          this.TipoDocumento = tipDoc;
          //console.log(this.TipoDocumento);
        
        }, error => {
          //console.log(error);
          swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
        });
    }
}

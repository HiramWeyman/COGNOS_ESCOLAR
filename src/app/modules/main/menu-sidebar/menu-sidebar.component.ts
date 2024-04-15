import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppService} from '@services/app.service';
import {Observable} from 'rxjs';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public user;
    public menu = MENU;
    public menu2 = MENU2;
    public menu3 = MENU3;
    perfil:number;
    constructor(
        public appService: AppService,
        private store: Store<AppState>
    ) {}

    ngOnInit() {
        this.user =sessionStorage.getItem('UserMail'); 
        this.perfil = Number(sessionStorage.getItem('UserPerfil'));
        /* this.user = this.appService.user; */
        this.ui = this.store.select('ui');
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
        });
        this.user =sessionStorage.getItem('UserMail'); 
    }
}
//Administrador
export const MENU = [
    {
        name: 'Dashboard',
        iconClasses: 'fas fa-tachometer-alt',
        path: ['/']
    },
   /*  {
        name: 'Blank',
        iconClasses: 'fas fa-file',
        path: ['/blank']
    } */
    {
        name: 'Asignación Docente',
        iconClasses: 'fas fa-user-cog',
        path: ['/asignacion']
    },
    {
        name: 'Asignación Alumno-Gpo',
        iconClasses: 'fas fa-user-graduate',
        path: ['/alunogpo']
    },
    {
        name: 'Calificaciones',
        iconClasses: 'fas fa-file-contract',
        path: ['/calificacion']
    },
    {
        name: 'Alumno Documentos ',
        iconClasses: 'fas fa-file-contract',
        path: ['/documento']
    }, 

    {
        name: 'Catalogos',
        iconClasses: 'fas fa-cogs',        
        children: [
            {
                name: 'Alumnos',
                iconClasses: 'far fa-address-book',
                path: ['/alumnos']
            },
            {
                name: 'Docentes',
                iconClasses: 'fas fa-briefcase',
                path: ['/docentes']
            },
            {
                name: 'Grupos',
                iconClasses: 'fas fa-users',
                path: ['/grupos']
            },
            {
                name: 'Materias',
                iconClasses: 'fas fa-book',
                path: ['/materias']
            },
            {
                name: 'Ciclos',
                iconClasses: 'fas fa-calendar',
                path: ['/ciclos']
            },  
            {
                name: 'Perfiles',
                iconClasses: 'fas fa-user-tie',
                path: ['/perfil']
            },
            {
                name: 'Usuarios',
                iconClasses: 'fas fa-user-plus',
                path: ['/usuarios']
            },
            {
                name: 'Tipo Documento',
                iconClasses: 'fas fa-file-invoice',
                path: ['/tipodoc']
            },
          /*   {
                name: 'Documentos',
                iconClasses: 'fas fa-file-contract',
                path: ['/documento']
            }, */
        ]
    }
];
//Alumnos y Maestros
export const MENU2 = [
    {
        name: 'Dashboard',
        iconClasses: 'fas fa-tachometer-alt',
        path: ['/']
    },
   /*  {
        name: 'Blank',
        iconClasses: 'fas fa-file',
        path: ['/blank']
    } 
    {
        name: 'Asignación Docente',
        iconClasses: 'fas fa-user-cog',
        path: ['/asignacion']
    },
    {
        name: 'Asignación Alumno-Gpo',
        iconClasses: 'fas fa-user-graduate',
        path: ['/alunogpo']
    },
    */
    {
        name: 'Calificaciones',
        iconClasses: 'fas fa-file-contract',
        path: ['/calificacion']
    },

  /*   {
        name: 'Catalogos',
        iconClasses: 'fas fa-cogs',        
        children: [
            {
                name: 'Alumnos',
                iconClasses: 'far fa-address-book',
                path: ['/alumnos']
            },
            {
                name: 'Docentes',
                iconClasses: 'fas fa-briefcase',
                path: ['/docentes']
            },
            {
                name: 'Grupos',
                iconClasses: 'fas fa-users',
                path: ['/grupos']
            },
            {
                name: 'Materias',
                iconClasses: 'fas fa-book',
                path: ['/materias']
            },
            {
                name: 'Ciclos',
                iconClasses: 'fas fa-calendar',
                path: ['/ciclos']
            },  
            {
                name: 'Perfiles',
                iconClasses: 'fas fa-user-tie',
                path: ['/perfil']
            },
            {
                name: 'Usuarios',
                iconClasses: 'fas fa-user-plus',
                path: ['/usuarios']
            },
            {
                name: 'Tipo Documento',
                iconClasses: 'fas fa-file-invoice',
                path: ['/tipodoc']
            },
            {
                name: 'Documentos',
                iconClasses: 'fas fa-file-contract',
                path: ['/documento']
            }, 
        ]
    } */
];
//Gestor
export const MENU3 = [
    {
        name: 'Dashboard',
        iconClasses: 'fas fa-tachometer-alt',
        path: ['/']
    },
   /*  {
        name: 'Blank',
        iconClasses: 'fas fa-file',
        path: ['/blank']
    } */
    {
        name: 'Asignación Docente',
        iconClasses: 'fas fa-user-cog',
        path: ['/asignacion']
    },
    {
        name: 'Asignación Alumno-Gpo',
        iconClasses: 'fas fa-user-graduate',
        path: ['/alunogpo']
    },
    {
        name: 'Alumno Documentos ',
        iconClasses: 'fas fa-file-contract',
        path: ['/documento']
    }, 
    
   /*  {
        name: 'Calificaciones',
        iconClasses: 'fas fa-file-contract',
        path: ['/calificacion']
    }, */

    {
        name: 'Catalogos',
        iconClasses: 'fas fa-cogs',        
        children: [
            {
                name: 'Alumnos',
                iconClasses: 'far fa-address-book',
                path: ['/alumnos']
            },
            {
                name: 'Docentes',
                iconClasses: 'fas fa-briefcase',
                path: ['/docentes']
            },
            {
                name: 'Grupos',
                iconClasses: 'fas fa-users',
                path: ['/grupos']
            },
            {
                name: 'Materias',
                iconClasses: 'fas fa-book',
                path: ['/materias']
            },
            {
                name: 'Ciclos',
                iconClasses: 'fas fa-calendar',
                path: ['/ciclos']
            },  
            {
                name: 'Perfiles',
                iconClasses: 'fas fa-user-tie',
                path: ['/perfil']
            },
            {
                name: 'Usuarios',
                iconClasses: 'fas fa-user-plus',
                path: ['/usuarios']
            },
            {
                name: 'Tipo Documento',
                iconClasses: 'fas fa-file-invoice',
                path: ['/tipodoc']
            },
          
        ]
    } 
];


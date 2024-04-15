import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {LoginComponent} from '@modules/login/login.component';
import {ProfileComponent} from '@pages/profile/profile.component';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {MainMenuComponent} from '@pages/main-menu/main-menu.component';
import {SubMenuComponent} from '@pages/main-menu/sub-menu/sub-menu.component';
import { AlumnosComponent } from '@pages/alumnos/alumnos.component';
import { DocentesComponent } from '@pages/docentes/docentes.component';
import { GruposComponent } from '@pages/grupos/grupos.component';
import { CiclosComponent } from '@pages/ciclos/ciclos.component';
import { MateriasComponent } from '@pages/materias/materias.component';
import { PerfilesComponent } from '@pages/perfiles/perfiles.component';
import { UsuariosComponent } from '@pages/usuarios/usuarios.component';
import { TipodocumentoComponent } from '@pages/tipodocumento/tipodocumento.component';
import { DocumentoComponent } from '@pages/documento/documento.component';
import { AsignaciondocenteComponent } from '@pages/asignaciondocente/asignaciondocente.component';
import { CalificacionesComponent } from '@pages/calificaciones/calificaciones.component';
import { AlumnogpoComponent } from '@pages/alumnogpo/alumnogpo.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'blank',
                component: BlankComponent
            },
            { 
                path: 'sub-menu-1',
                component: SubMenuComponent
            },
            {
                path: 'sub-menu-2',
                component: BlankComponent
            },
            {
                path: 'alumnos',
                component: AlumnosComponent
            },
            {
                path: 'docentes',
                component: DocentesComponent
            },
            {
                path: 'grupos',
                component: GruposComponent
            },
            {
                path: 'materias',
                component: MateriasComponent
            },
            {
                path: 'ciclos',
                component: CiclosComponent
            },
            {
                path: 'perfil',
                component: PerfilesComponent
            },
            {
                path: 'usuarios',
                component: UsuariosComponent
            },
            {
                path: 'tipodoc',
                component: TipodocumentoComponent
            },
            /* {
                path: 'documento',
                component: DocumentoComponent
            }, */
            {
                path: 'asignacion',
                component: AsignaciondocenteComponent
            },
            {
                path: 'calificacion',
                component: CalificacionesComponent
            },
            {
                path: 'alunogpo',
                component: AlumnogpoComponent
            },
            {
                path: '',
                component: DashboardComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule {}

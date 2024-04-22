import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {AppRoutingModule} from '@/app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from '@modules/main/main.component';
import {LoginComponent} from '@modules/login/login.component';
import {HeaderComponent} from '@modules/main/header/header.component';
import {FooterComponent} from '@modules/main/footer/footer.component';
import {MenuSidebarComponent} from '@modules/main/menu-sidebar/menu-sidebar.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from '@pages/profile/profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {ToastrModule} from 'ngx-toastr';
import {MessagesComponent} from '@modules/main/header/messages/messages.component';
import {NotificationsComponent} from '@modules/main/header/notifications/notifications.component';

import {CommonModule, registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';
import {UserComponent} from '@modules/main/header/user/user.component';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {LanguageComponent} from '@modules/main/header/language/language.component';
import {MainMenuComponent} from './pages/main-menu/main-menu.component';
import {SubMenuComponent} from './pages/main-menu/sub-menu/sub-menu.component';
import {MenuItemComponent} from './components/menu-item/menu-item.component';
import {ControlSidebarComponent} from './modules/main/control-sidebar/control-sidebar.component';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './store/auth/reducer';
import {uiReducer} from './store/ui/reducer';
import {ProfabricComponentsModule} from '@profabric/angular-components';
import {SidebarSearchComponent} from './components/sidebar-search/sidebar-search.component';
/* import {PacientesComponent } from './pages/pacientes/pacientes.component';
 */
import {RouterModule } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTreeModule} from '@angular/material/tree';
import {MatNativeDateModule} from '@angular/material/core';
import { MatSort, Sort } from '@angular/material/sort';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {DatePipe} from '@angular/common';
import { EnviopruebasComponent } from './pages/enviopruebas/enviopruebas.component';
import { BlockUIModule } from 'ng-block-ui';
import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { DocentesComponent } from './pages/docentes/docentes.component';
import { GruposComponent } from './pages/grupos/grupos.component';
import { CiclosComponent } from './pages/ciclos/ciclos.component';
import { MateriasComponent } from './pages/materias/materias.component';
import { PerfilesComponent } from './pages/perfiles/perfiles.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { TipodocumentoComponent } from './pages/tipodocumento/tipodocumento.component';
import { DocumentoComponent } from './pages/documento/documento.component';
import { AsignaciondocenteComponent } from './pages/asignaciondocente/asignaciondocente.component';
import { CalificacionesComponent } from './pages/calificaciones/calificaciones.component';
import { AlumnogpoComponent } from './pages/alumnogpo/alumnogpo.component';
import { APP_BASE_HREF } from '@angular/common';

registerLocaleData(localeEn, 'es-ES');

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        MenuSidebarComponent,
        BlankComponent,
        ProfileComponent,
        RegisterComponent,
        DashboardComponent,
        MessagesComponent,
        NotificationsComponent,
        UserComponent,
        ForgotPasswordComponent,
        RecoverPasswordComponent,
        LanguageComponent,
        MainMenuComponent,
        SubMenuComponent,
        MenuItemComponent,
        ControlSidebarComponent,
        SidebarSearchComponent,
        EnviopruebasComponent,
        AlumnosComponent,
        DocentesComponent,
        GruposComponent,
        CiclosComponent,
        MateriasComponent,
        PerfilesComponent,
        UsuariosComponent,
        TipodocumentoComponent,
        DocumentoComponent,
        AsignaciondocenteComponent,
        CalificacionesComponent,
        AlumnogpoComponent,

    ],
    imports: [
        ProfabricComponentsModule,
        CommonModule,
        BrowserModule,
        CKEditorModule,
        FormsModule,
        StoreModule.forRoot({auth: authReducer, ui: uiReducer}),
        HttpClientModule,
        NgxPaginationModule,
        AppRoutingModule,
        ReactiveFormsModule,
        MatIconModule,
        RouterModule,
        MatIconModule,
        MatButtonModule,
        MatTabsModule,
        MatTableModule,
        MatInputModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTreeModule,
        MatToolbarModule,
        BrowserAnimationsModule,
        BlockUIModule.forRoot(),
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        })
    ],
  /*   providers: [{provide: APP_BASE_HREF, useValue: '/YOUR_VIRTUALDIRECTORY_NAME'}], */
    providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-MX' },
   /*   {provide: APP_BASE_HREF, useValue: '/escolar'}, */
     DatePipe],
    bootstrap: [AppComponent]
})
export class AppModule {}

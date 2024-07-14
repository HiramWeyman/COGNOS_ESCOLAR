import {
    Component,
    OnInit,
    OnDestroy,
    Renderer2,
    HostBinding
} from '@angular/core';
import {UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AppService} from '@services/app.service';
import { SesionDto } from '@/models/Login';
/* import { Login } from '@/models/Login'; */
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    @HostBinding('class') class = 'login-box';
    public loginForm: UntypedFormGroup;
    public isAuthLoading = false;
    public isGoogleLoading = false;
    public isFacebookLoading = false;
    private subscription: Subscription;
    public loginx: SesionDto = new SesionDto();

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private appService: AppService,
        private router: Router
    ) {}

    ngOnInit() {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'login-page'
        );
        this.loginForm = new UntypedFormGroup({
            email: new UntypedFormControl(null, Validators.required),
            password: new UntypedFormControl(null, Validators.required)
        });
    }

    async loginByAuth() {
        if (this.loginForm.valid) {
            this.isAuthLoading = true;
           //aqui va el metodo de login
            //await this.appService.loginByAuth(this.loginForm.value);
            await this.appService.getLogin(this.loginx);
            this.isAuthLoading = false;
        } else {
            this.isAuthLoading = false;
            this.toastr.error('Usuario o password incorrectos!');
        }
    }

     async Pruebas() {
       // console.log('Si jala');
        //console.log(this.login);
        this.isAuthLoading = true;
        //aqui va el metodo de login
         //await this.appService.loginByAuth(this.loginForm.value);
         await this.appService.getLogin(this.loginx);
         this.isAuthLoading = false;
        }
    
        login() {
            this.isAuthLoading = true;
       /*      this.router.navigate(['/']);
            this.toastr.success('Login exitoso');  */
            //console.log(this.loginx);
            if(!this.loginx.Mail){
                this.isAuthLoading = false;
                swal.fire({
                    icon: 'info',
                    title: 'Ingrese su email'
                });
                return;
            }

            if(!this.loginx.Password){
                this.isAuthLoading = false;
                swal.fire({
                    icon: 'info',
                    title: 'Ingrese su password'
                });
                return;
            }
            this.subscription = this.appService.getLogin(this.loginx)
                .subscribe((data: any) => {
                    if ( data != null) {
                        //console.log(data);
                        swal.fire({
                            icon: 'success',
                            title: 'Usuario Logeado',
                            text: 'Bienvenido ' + data.nombre.toString()+' '+data.paterno.toString()+' '+data.materno.toString(),
                            timer: 2000
                        });
                        this.isAuthLoading = false;
                        this.router.navigate(['/']);
                        this.toastr.success('Login exitoso');
                    } else{
                        this.isAuthLoading = false;
                        swal.fire({
                            icon: 'error',
                            title: 'Usuario y/o contraseña incorrecta'
                        });
                    }	
                },
                error => {
                    this.isAuthLoading = false;
                    console.log(error);
                  
                    console.log(error.error.descripcion);
                    
                    swal.fire({
                        title: 'ERROR!!!',
                        text: error.error.descripcion,
                        icon: 'error'});
                }); 
            }

            save(event) {
                this.login();
                //console.log("You entered: ", event.target.value);
              }

/*     async loginByGoogle() {
        this.isGoogleLoading = true;
        await this.appService.loginByGoogle();
        this.isGoogleLoading = false;
    }

    async loginByFacebook() {
        this.isFacebookLoading = true;
        await this.appService.loginByFacebook();
        this.isFacebookLoading = false;
    } */

    ngOnDestroy() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'login-page'
        );
    }
}

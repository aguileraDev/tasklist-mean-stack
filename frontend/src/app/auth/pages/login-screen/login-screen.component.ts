import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

  formuLogin: FormGroup = this.fb.group({
    email: ['demo@example.com', [Validators.required, Validators.email]],
    password: ['12345678', [Validators.minLength(6), Validators.required]] 
  })

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  /**
   * La función de inicio de sesión se llama cuando el usuario hace clic en el botón de inicio de
   * sesión. Toma los valores del formulario y los envía al authService. El authService luego envía los
   * valores al backend. Si el backend devuelve verdadero, el usuario inicia sesión y se le redirige a
   * la página de tareas. Si el backend devuelve falso, el usuario no ha iniciado sesión y se muestra
   * un mensaje de error
   */
  login(){
   
   this.authService.login(this.formuLogin.value).subscribe((res) => {
      if(res === true){
        localStorage.setItem('user', JSON.stringify(this.authService.user));
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Login success',
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() =>{
          this.router.navigateByUrl('/task');
        },1750);
        

      }

      else{
        Swal.fire({
          title: 'Oops...',
          icon: 'error',
          text: res,
          footer: '<a href="/auth/register">Or Create account</a>'
        });
      }
   })
  }

}

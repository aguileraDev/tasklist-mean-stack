import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register-screen',
  templateUrl: './register-screen.component.html',
  styleUrls: ['./register-screen.component.css'],
})
export class RegisterScreenComponent implements OnInit {
  formuRegister: FormGroup = this.fb.group({
    username: ['alias', [Validators.minLength(3), Validators.required]],
    password: ['123456', [Validators.required]],
    confirm: ['123456',[Validators.required]],
    email: ['example@email.com', [Validators.email, Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  register(){

    const {password, confirm} = this.formuRegister.value;

    if(password === confirm){
      
      this.authService.register(this.formuRegister.value).subscribe((res) => {
        if(res === true){
          localStorage.setItem('user', JSON.stringify(this.authService.user));
          Swal.fire({
            title: 'Ok',
            text: this.authService.user.message,
            icon: 'success',
            position: 'center',
            timer: 1500,
            showConfirmButton: false
  
          })
  
          setTimeout(() => {
            this.router.navigateByUrl('/auth')
          }, 1750)
        }
  
        else{
          Swal.fire({
            title: 'Oops...',
            text: res,
            icon: 'error'
          })
        }
      })

    }

    else{
      Swal.fire({
        title: 'Oops...',
        text: 'password not match',
        icon: 'error'
      })
    }
    

  }
}

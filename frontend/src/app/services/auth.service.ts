import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
/* Contiene métodos que le permiten iniciar sesión, registrarse y verificar si el usuario está logueado */
export class AuthService {
  private _user: any = null;
 
  baseURL = environment.baseURL;

  get user() {
    return this._user;
  }

  constructor(private httpClient: HttpClient) {}

 /**
  * La función toma un objeto de datos, lo envía al backend y devuelve un valor booleano que indica si
  * el inicio de sesión fue exitoso o no.
  * @param {any} data - ningún
  * @returns un valor booleano.
  */
  login(data: any) {
    
    return this.httpClient.post<any>(`${this.baseURL}/auth/login`, data).pipe(
      tap((res) => {
        if (res.estado === true) {
          this._user = {
            id: res.id,
            username: res.username,
            token: res.token,
          };

        } else {
          this._user = null;
        }
      }),
      map((res) => res.estado),
      catchError((event) => of(event.error.message))
    );
  }

/**
 * La función toma un objeto de datos, lo envía al backend y devuelve un valor booleano que indica si
 * el usuario se registró correctamente o no.
 * @param {any} data - ningún
 * @returns un observable de tipo any.
 */
  register(data: any){
    
    return this.httpClient.post<any>(`${this.baseURL}/auth/register`,data)
          .pipe(
            tap((res) => {
              if(res.estado === true){
                this._user = {
                  id: res.id,
                  username: res.username,
                  token: res.token,
                  message: res.message
                }
              }
              else{
                this._user = null
            }
            
          }),
          map((res) => res.estado),
          catchError((event) => of(event.error.message))
          )
  }

/**
 * Comprueba si el usuario ha iniciado sesión comprobando si el token está en el almacenamiento local.
 * Si es así, devuelve verdadero, si no, devuelve falso
 * @returns Un valor booleano.
 */
  validarToken(): Observable<boolean>{
    
    const token = JSON.parse(localStorage.getItem('user')! || 'null' );

    if(token){
      return new Observable((subscriber) => {
        subscriber.next(true);
      })
    }

    else{
      return new Observable((subscriber) => {
        subscriber.next(false);
      })
    }
  }
}

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

/* Esta es una variable privada que se utiliza para almacenar la información del usuario. */
  private _user: any = JSON.parse(localStorage.getItem('user')!);
 
  baseURL = environment.baseURL;

  get user() {
    return this._user;
  }

/* Este es un servicio que se utiliza para realizar solicitudes http al backend. */
  constructor(private httpClient: HttpClient) { }

 /**
  * La función devuelve un observable de tipo any
  * @returns El método de lectura devuelve el método httpClient.get.
  */
  read(){
    const headers = {
      "x-auth-token": this._user.token
    }

    return this.httpClient.get<any>(`${this.baseURL}/task/read`, {headers})
  }

 /**
  * Elimina una tarea de la base de datos enviando una solicitud DELETE al servidor con la
  * identificación de la tarea
  * @param {string} id - El id de la tarea que se va a eliminar.
  * @returns El método de eliminación devuelve un observable de tipo cualquiera.
  */
  delete(id: string){
    const headers = {
      "x-auth-token": this._user.token
    }

    return this.httpClient.delete<any>(`${this.baseURL}/task/delete/${id}`, {headers})
  }

 /**
  * Esta función crea una tarea en la base de datos.
  * @param {string} value - cuerda
  * @returns La respuesta del servidor.
  */
  create(value: string){
    const headers = {
      "x-auth-token": this._user.token
    }

    return this.httpClient.post<any>(`${this.baseURL}/task/create/`, {"nombre": value}, {headers})
  }
 /**
  * Toma una identificación y un valor, y luego actualiza la tarea con la identificación dada con el
  * valor dado
  * @param {string} id - El id de la tarea que se va a actualizar.
  * @param {string} value - El valor de la tarea que se va a actualizar.
  * @returns La tarea actualizada
  */
    update(id: string, value: string){
    
    const headers = {
      "x-auth-token": this._user.token
    }

    return this.httpClient.put<any>(`${this.baseURL}/task/update/${id}`, {"nombre": value}, {headers})
  }
}

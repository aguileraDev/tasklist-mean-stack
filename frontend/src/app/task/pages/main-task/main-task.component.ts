import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-task',
  templateUrl: './main-task.component.html',
  styleUrls: ['./main-task.component.css'],
})
export class MainTaskComponent implements OnInit {
  /* Crear un grupo de formularios con un campo newTask que tenga una longitud mínima de 5. */
  formuTask: FormGroup = this.fb.group({
    newTask: ['', [Validators.minLength(5)]],
  });
  user: any;
  tasks: Array<any> = [];

  constructor(
    private taskService: TaskService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
  /* Obtener el usuario y las tareas del taskService. */
    this.user = this.taskService.user;

    this.taskService.read().subscribe((res) => {
      this.tasks = res.list;
    });
  }

 /**
  * Borra el almacenamiento local y redirige al usuario a la página de inicio de sesión
  */
  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/auth');
  }

 /**
  * La función toma una identificación como parámetro, llama al método de eliminación de taskService y
  * luego llama al método de lectura de taskService para actualizar la matriz de tareas.
  * @param {string} id - cadena: la identificación de la tarea que se eliminará.
  */
  delete(id: string) {
    this.taskService.delete(id).subscribe((res) => {
      this.taskService.read().subscribe((res) => {
       
        this.tasks = res.list;
      });
    });
  }

 /**
  * La función crea una nueva tarea llamando a la función create() en el archivo taskService.ts
  */
  create() {
    this.taskService.create(this.formuTask.value.newTask).subscribe((res) => {
      this.formuTask.reset();
    
      this.taskService.read().subscribe((res) => {
       
        this.tasks = res.list;
      });
    });
  }

/**
 * Navega a la página de la tarea, pasando la identificación y el nombre de la tarea como parámetros
 * @param {any} task - any: este es el objeto de tarea que estamos pasando.
 */
  update(task: any) {
    const { _id, nombre } = task;
    this.router.navigateByUrl(`/task/${_id}/${nombre}`);
  }
}

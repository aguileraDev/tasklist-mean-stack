import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.css'],
})
export class TaskUpdateComponent implements OnInit {
 /* El formulario que se va a actualizar. */
  user: any;
  task: string = '';
  id: string ='';
  formUpdate: FormGroup = this.fb.group({
    newTask: ['', [Validators.required, Validators.minLength(4)]],
  });
 /**
  * Usamos el servicio ActivatedRoute para obtener los parámetros de la URL y luego usamos el método
  * setValue para establecer el valor del formulario.
  * @param {FormBuilder} fb - FormBuilder: este es el servicio Angular FormBuilder.
  * @param {Router} router - Enrutador: este es el servicio de enrutador angular.
  * @param {TaskService} taskService - Este es el servicio que creamos anteriormente.
  * @param {ActivatedRoute} activeRouter - Este es el enrutador que está actualmente activo.
  */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private taskService: TaskService,
    private activeRouter: ActivatedRoute
  ) {
    /* Obtener los parámetros de la URL y luego usar el método setValue para establecer el valor del
    formulario. */
    this.activeRouter.params.subscribe((params) => {
     
      this.formUpdate.setValue({newTask: params['nombre']});
      this.id = params['id'];
      
    })
  }

  ngOnInit(): void {
    this.user = this.taskService.user;
  
  }
/**
 * Toma la identificación de la tarea que se actualizará y el nuevo nombre de la tarea, y lo envía al
 * backend para que se actualice.
 */

  updateTask() {
   
   
      this.taskService.update(this.id,this.formUpdate.value.newTask).subscribe((res) => {
  
        if(res.estado === true){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'task updated successfully',
            showConfirmButton: false,
            timer: 1500
          })
          this.formUpdate.reset();
          setTimeout(() => {
            this.router.navigateByUrl('/task');
          }, 1750)
        }
      })
    
    }
  }


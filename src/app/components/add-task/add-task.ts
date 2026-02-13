import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-add-task',
  imports: [ReactiveFormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
})
export class AddTaskComponent {

  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);

  taskForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    priority: ['medium', Validators.required],
    status: ['todo', Validators.required],
  });

  submit(): void {
    if (this.taskForm.invalid) return;

    const { title, description, priority, status } = this.taskForm.value;

    const newTask = new Task(
      crypto.randomUUID(),
      title!,
      description!,
      priority as any,
      status as any
    );

    this.taskService.addTask(newTask);

    this.taskForm.reset({
      priority: 'medium',
      status: 'todo'
    });
  }
}

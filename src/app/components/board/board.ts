import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board {
  private taskService = inject(TaskService);

  todoTasks=this.taskService.getTasksByStatus('todo');
  inProgressTasks=this.taskService.getTasksByStatus('in-progress');
  doneTasks=this.taskService.getTasksByStatus("done");
}

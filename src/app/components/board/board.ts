import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
//to make board drag and dropable
import { CdkDragDrop, DragDropModule,} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-board',
  imports: [DragDropModule],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board {
  private taskService = inject(TaskService);

  todoTasks=this.taskService.getTasksByStatus('todo');
  inProgressTasks=this.taskService.getTasksByStatus('in-progress');
  doneTasks=this.taskService.getTasksByStatus("done");

  drop(event: CdkDragDrop<any>, newStatus: 'todo' | 'in-progress' | 'done') {
  const task = event.item.data;
  this.taskService.moveTask(task.id, newStatus);
}
}

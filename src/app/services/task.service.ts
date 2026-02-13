import { computed, Injectable, signal } from '@angular/core';
import { TaskCollection } from '../models/task-collection';
import { Task } from '../models/task.model';
import { TaskPriority, TaskStatus } from '../models/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  constructor() {
  const task1 = new Task(
    crypto.randomUUID(),
    'Design Board Layout',
    'Create responsive 3-column layout',
    'medium',
    'todo'
  );

  const task2 = new Task(
    crypto.randomUUID(),
    'Implement Task Service',
    'Make state reactive using signals',
    'high',
    'in-progress'
  );

  const task3 = new Task(
    crypto.randomUUID(),
    'Setup Project Structure',
    'Organize models and components folders',
    'low',
    'done'
  );

  this.tasks.set({
    [task1.id]: task1,
    [task2.id]: task2,
    [task3.id]: task3
  });
}

  
  //we are creating a writable signal
  private tasks = signal<TaskCollection>({});
  
  // creating a readonly signal that can be displayed in other components but not manipulated
  //I dont want my components to control state, Ar said Logic should be in services not in components
  tasksSignal = this.tasks.asReadonly();

  // status: TaskStatus, is typescript just declaring the type we expect, 
  // computed means "recalculate this whenever the orginal signal changes"
  // So whenever task change, This should change as well
  // Object.values turns it into an array for me, 
  // we are using an arrow function since computed takes in a function and returns a computed signal
  // task => task.status===status, this is filtering out our tasks signal with the status to only give us the disired status
  getTasksByStatus = (status: TaskStatus) =>
    computed(() =>
      Object.values(this.tasks())
        .filter(task => task.status === status)
    );


  //task: is going to be a Task, and void means im not returning anything
  // update is a singal keyword, that allows me to update, It means Im replacing the old value with the new value
  // ...current is a spread operator that Ar taught us, It breaks it apart/copies,
  //task.id:task, is how I created my map. So i am adding a new task to my current this.tasks
  // this is an immutable update, were not actualy updating, we are returning something new, we just coppied the old one, and added a new one, or modifiied an old task
  addTask(task: Task): void {
    this.tasks.update(current => ({
      ...current,
      [task.id]: task
    }));
  }

  // This move task takes in two parameters, taskId with a string type, and the new status with the TaskStatus type that i created
  // it doesnt return anything, hence the void
  // again we see the update built in function
  // const task = current[taskId], We are grabbing the desired task, and giving it a name so we can update it
  // then we check to make sure its there, if not !task, we return current and stop our operation
  // then we use a function we created in our class .moveTo to update the status to the new status
  //finnaly we return out new ...current
  moveTask(taskId: string, newStatus: TaskStatus): void {
    this.tasks.update(current => {
      const task = current[taskId];
      if (!task) return current;

      task.moveTo(newStatus);

      return { ...current };
    });
  }

  // we get a task by its id:which should be a string
  //delete Task doesnt return anything
  deleteTask(taskId: string): void {
    this.tasks.update(current => {
      const updated = { ...current };
      delete updated[taskId];
      return updated;
    });
  }
}


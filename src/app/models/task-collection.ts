import { Task } from './task.model';

export interface TaskCollection {
    [id:string]: Task;
}
export type TaskStatus = "todo" | "in-progress" | 'done';
export type TaskPriority = "low" | "medium" | "high";

export interface ITask{
    id:string;
    title:string;
    description:string;
    priority:TaskPriority;
    status: TaskStatus;

    moveTo(status:TaskStatus):void;
}
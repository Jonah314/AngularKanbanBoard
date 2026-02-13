import { ITask, TaskPriority, TaskStatus } from "./task.interface";

export class Task implements ITask{
    constructor(
        public id:string,
        public title:string,
        public description:string,
        public priority:TaskPriority,
        public status:TaskStatus,
    ){}
     moveTo(status:TaskStatus):void{
            this.status=status;
        }
}
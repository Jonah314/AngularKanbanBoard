import { TestBed } from '@angular/core/testing';
import { Task } from './task.service';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

      



  describe('addTask', () => {
    it('should add a task', ()=> {
      //Arrange
      const task = new Task(
        '1',
        'Test Task 1',
        'Test Description',
        'medium',
        'todo'
      );
      //Act
      service.addTask(task);
      //Assert
      const tasks = service['tasks']();
      expect(tasks['1']).toBeDefined();
      expect(tasks['1'].title).toBe('Test Task 1');
    })
  });

  describe('getTasksByStatus', () => {
    it('should retrieve task by individuals status', () => {
      //Arragne
      const task2 = new Task(
        '2',
        'Test Task 2',
        'Test 2 Description',
        'low',
        'done'
      )
      const task3 = new Task(
        '3',
        'Test Task 3',
        'Test 3 Description',
        'high',
        'in-progress'
      )
      const task4 = new Task(
        '4',
        'Test Task 4',
        'Test 4 Description',
        'low',
        'in-progress'
      )
      const task5 = new Task(
        '5',
        'Test Task 5',
        'Test 5 Description',
        'medium',
        'in-progress'
      )
      
      //Act
      service.addTask(task2);
      service.addTask(task3);
      service.addTask(task4);
      service.addTask(task5);
      
      //Assert
      const todoTasks = service.getTasksByStatus('in-progress')();
      console.log(todoTasks.length);
      expect(todoTasks[0].id).toBe('3');
      expect(todoTasks[1].id).toBe('4');
      expect(todoTasks[2].id).toBe('5');
      
      // There is an additional task coming from mock data
      expect(todoTasks.length).toBe(4);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task',() => {
      //Arrange
      const task2 = new Task(
        '2',
        'Test Task 2',
        'Test 2 Description',
        'low',
        'done'
      )
      //Act
      service.addTask(task2);
      service.deleteTask('2');
      //Assert

      const tasks = service['tasks']();
      expect(tasks['2']).toBeUndefined();

    });
  });

  describe ('moveTask', ()=>{
    it("should move task to a new status", ()=> {
      //Arrange
      const task2 = new Task(
        '2',
        'Test Task 2',
        'Test 2 Description',
        'low',
        'done'
      )
      //Act
      service.addTask(task2);
      service.moveTask('2', 'in-progress');
      //Assert
      const tasks = service['tasks']();
      expect(tasks['2'].status).toBe('in-progress');
      
    })
  })



  
});

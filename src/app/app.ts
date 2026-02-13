import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BannerComponent } from './components/banner-component/banner-component';
import { Board } from './components/board/board';
import { AddTaskComponent } from './components/add-task/add-task';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BannerComponent, Board, AddTaskComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AngularKanbanBoard');
}

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor } from '@angular/common';

export interface TodoItem{
  id: number;
  task: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
//It allows you to inspect the component's properties and methods directly from the console.
//You can test changes or call methods on the exposed component instance without modifying the app code permanently.
  ngOnInit() {
  // Check if window is defined (browser environment)
    if (typeof window !== 'undefined') {
      (window as any).AppComponent = this;
    }
  }



  todoList: TodoItem[] = [];
  newTask: string = '';

  addTask(): void{
    if(this.newTask.trim()!==""){
      const newTaskItem: TodoItem = {
        id: Date.now(),
        task: this.newTask,
        completed: false
     }

     this.todoList.push(newTaskItem);
     this.newTask = '';
     console.log(this.todoList);
   }

 }

 toggleTask(index: number): void{
  // console.log(index);
  this.todoList[index].completed = !this.todoList[index].completed;
  // console.log(this.todoList);
 }

 deleteTask(id: number): void{
  this.todoList = this.todoList.filter(item => item.id!== id);
 }
}


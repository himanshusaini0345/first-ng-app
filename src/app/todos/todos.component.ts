import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { Todo } from '../model/todo.type';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit {
  ngOnInit(): void {
    // console.log(this.todoService.todoItems)
    // this.todoItems.set(this.todoService.todoItems)
    this.todoService.getTodosFromApi()
      .pipe(
        catchError(err => {
          console.log(err)
          throw err
        })
      )
      .subscribe(todos => {
        this.todoItems.set(todos)
      })
  }
  todoService = inject(TodosService)
  todoItems = signal<Array<Todo>>([])
}

import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { Todo } from '../model/todo.type';
import { catchError } from 'rxjs';
import { HighlightCompletedTodoDirective } from '../directives/highlight-completed-todo.directive';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';
import { FormsModule } from '@angular/forms';
import { FilterTodosPipe } from '../pipes/filter-todos.pipe';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [TodoItemComponent, FormsModule, FilterTodosPipe],
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
  searchTerm = signal('')

  updateTodoItem(todoItem: Todo) {
    this.todoItems.update((todos) => {
      return todos.map(todo => {
        if (todo.id === todoItem.id) {
          return {
            ...todo,
            completed: !todo.completed
          }
        }
        return todo
      })
    })
  }
}

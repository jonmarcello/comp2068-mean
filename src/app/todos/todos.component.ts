import { Component, OnInit } from '@angular/core';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css', '../../assets/stylesheets/materialize.min.css']
})
export class TodosComponent implements OnInit {

  todos: any = []

  constructor(private todosService: TodosService) { }

  ngOnInit() {
    this.todosService.getAllTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  onDelete(id) {
    this.todosService.deleteOne(id).subscribe(todos => {
      this.todos = todos;
    });
  }

}

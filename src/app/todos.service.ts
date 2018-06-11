import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TodosService {

  constructor(private http: Http) { }

  getAllTodos() {
    return this.http.get('/api/item')
      .map(res => res.json());
  }

  deleteOne(id) {
    return this.http.post('/api/delete/' + id, {});
  }
}

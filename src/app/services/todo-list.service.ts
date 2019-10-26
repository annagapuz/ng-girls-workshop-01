import { Injectable } from '@angular/core';
import {TodoItem} from "../interfaces/todo-item";
import {StorageService} from "./storage.service";

const todoListStorageKey = 'Todo_List';

const defaultTodoList = [
  {title: 'install NodeJS'},
  {title: 'install Angular CLI'},
  {title: 'create new app'},
  {title: 'serve app'},
  {title: 'develop app'},
  {title: 'deploy app'},
];

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  todoList: TodoItem[];

  constructor(private storageService:StorageService) {
    this.todoList = storageService.getData(todoListStorageKey) || defaultTodoList;
  }

  getTodoList() {
    return this.todoList;
  }

  addItem(todoItem: TodoItem) {
    this.todoList.push(todoItem);
    this.saveList();
  }

  // We locate the item in the list. Then in the same place we assign a new object,
  // which is constructed from the original item and the changes made to it.
  // We're using the spread operator for this: a new object is constructed, composed of the
  // original set of keys and values (...item) which are overridden by the keys and values of
  // changes. (If a key in changes doesn't exist in item, it is added to the new object.)
  updateItem(item: TodoItem, changes) {
    const index = this.todoList.indexOf(item);
    this.todoList[index] = { ...item, ...changes };
    this.saveList();
  }

  deleteItem(item: TodoItem) {
    const index = this.todoList.indexOf(item);
    this.todoList.splice(index, 1);
    this.saveList();
  }

  private saveList() {
    this.storageService.setData(todoListStorageKey, this.todoList);
  }
}

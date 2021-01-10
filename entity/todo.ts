import { CreateTodoRequest } from '~/store/todoStore';

export class TodoInput implements CreateTodoRequest {
  desc = '';
  title = '';
  constructor(data?: CreateTodoRequest) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

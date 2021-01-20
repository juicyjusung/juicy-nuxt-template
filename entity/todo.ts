import { CreateTodoRequest } from '~/store/todoStore';
import { Todo } from '~/types/index';

export class TodoInput implements Todo {
  desc = '';
  title = '';
  id = '';
  author = '';
  status = false;

  constructor(data?: CreateTodoRequest) {
    Object.assign(this, data);
  }

  getCreateTodoPayload(): CreateTodoRequest {
    return {
      title: this.title,
      desc: this.desc,
    };
  }
}

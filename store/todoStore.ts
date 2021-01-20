import { Module, MutationAction, VuexModule } from 'vuex-module-decorators';
import { OptionalPick, ResponseType, Todo } from '~/types';
import { TodoInput } from '~/entity/todo';
import { $axios } from '~/utils/axios';
import { todoStore } from '~/utils/store-accessor';

export type CreateTodoRequest = Pick<Todo, 'title'> & OptionalPick<Todo, 'desc'>;
export type UpdateTodoRequest = OptionalPick<Todo, 'title' | 'desc' | 'status' | 'id'>;
export type DeleteTodoRequest = Pick<Todo, 'id'>;

export type TodoListFilterType = 'ALL' | 'ACTIVE' | 'COMPLETED';
export type TodoListFilter = { [T in TodoListFilterType]: (T: Todo[]) => Todo[] };

export type TodoListResponse = ResponseType<'todos', Todo[]>;
// export type TodoResponse = ResponseType<'todo', Todo>;
export type TodoResponse = Todo;

export const state = (): { todos: Todo[] } => ({
  todos: [],
});
type TodoState = ReturnType<typeof state>;

const filters: TodoListFilter = {
  ALL: (todos: Todo[]) => todos,
  ACTIVE: (todos: Todo[]) => todos.filter((todo: Todo) => !todo.status),
  COMPLETED: (todos: Todo[]) => todos.filter((todo: Todo) => todo.status),
};

@Module({
  namespaced: true,
  name: 'todoStore',
  stateFactory: true,
})
export default class TodoModule extends VuexModule {
  todos: Array<Todo> = [];

  @MutationAction({ mutate: ['todos'] })
  async fetchTodos() {
    const res = await $axios.get('/todo/list');
    const todos: Todo[] = res.data;
    return {
      todos,
    };
  }

  @MutationAction({ mutate: ['todos'] })
  async addTodo(todo: TodoInput) {
    const res = await $axios.post('/todo', todo.getCreateTodoPayload());
    const createdTodo: Todo = res.data;

    return {
      todos: [...todoStore.todos, createdTodo],
    };
  }

  @MutationAction({ mutate: ['todos'] })
  async editTodo(todo: UpdateTodoRequest) {
    const res = await $axios.put('/todo', todo);
    const updatedTodo: TodoResponse = res.data;
    const index = todoStore.todos.findIndex(sTodo => sTodo.id === todo.id);
    return {
      todos: [
        ...todoStore.todos.slice(0, index),
        updatedTodo,
        ...todoStore.todos.slice(index + 1, todoStore.todos.length),
      ],
    };
  }

  @MutationAction({ mutate: ['todos'] })
  async removeTodo(todo: Todo) {
    await $axios.delete(`/todo/${todo.id}`);
    return {
      todos: todoStore.todos.filter(sTodo => sTodo.id !== todo.id),
    };
  }
}

import { getterTree, mutationTree, actionTree } from 'nuxt-typed-vuex';
import { OptionalPick, ResponseType, Todo } from '~/types';

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

export const getters = getterTree(state, {
  getTodos: (state: TodoState) => state.todos,
  activeTodos: (state: TodoState) => state.todos.filter(todo => !todo.status),
  completedTodos: (state: TodoState) => state.todos.filter(todo => todo.status),
});

export const mutations = mutationTree(state, {
  SET_TODOS(state, todos: Todo[]) {
    state.todos = todos;
  },
  ADD_TODO(state, todo: TodoResponse) {
    state.todos.push(todo);
  },
  UPDATE_TODO(state, todo: TodoResponse) {
    const index = state.todos.findIndex(sTodo => sTodo.id === todo.id);
    state.todos = [
      ...state.todos.slice(0, index),
      todo,
      ...state.todos.slice(index + 1, state.todos.length),
    ];
  },
  DELETE_TODO(state, todo: TodoResponse) {
    state.todos = state.todos.filter(sTodo => sTodo !== todo);
  },
});

export const actions = actionTree(
  { state, getters, mutations },
  {
    async fetchTodos({ commit }) {
      const res = await this.$axios.get('/todo/list');
      const todos: TodoResponse[] = res.data;
      commit('SET_TODOS', todos);
      return todos;
    },

    async addTodo({ commit }, todo: CreateTodoRequest) {
      const res = await this.$axios.post('/todo', todo);
      const createdTodo: Todo = res.data;
      commit('ADD_TODO', createdTodo);
    },
    async editTodo({ commit }, todo: UpdateTodoRequest) {
      console.log('%c [JL] editTodo - // TODO: ', 'font-size: 16px; color:  red;', todo);
      const res = await this.$axios.put('/todo', todo);
      const updatedTodo: TodoResponse = res.data;
      commit('UPDATE_TODO', updatedTodo);
    },
    async deleteTodo({ commit }, todo: Todo) {
      await this.$axios.delete(`/todo/${todo.id}`);
      commit('DELETE_TODO', todo);
    },
  }
);

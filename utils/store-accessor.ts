import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import TodoModule from '~/store/todoStore';

/* eslint-disable */
let todoStore: TodoModule;

function initialiseStores(store: Store<any>): void {
  todoStore = getModule(TodoModule, store);
}

export { initialiseStores, todoStore };

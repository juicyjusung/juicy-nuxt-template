<template>
  <v-card v-show="todos.length" class="mt-3 flex-grow-1">
    <v-progress-linear v-model="progressPercentage" class="my-0" />
    <v-card-actions v-show="todos.length" class="px-3">
      <span class="primary--text"> {{ remaining }} {{ remaining | pluralize('item') }} left </span>
      <v-spacer></v-spacer>
      <v-btn-toggle v-show="todos.length" v-model="selectedTabIndex" class="elevation-0" mandatory>
        <v-btn
          v-for="(val, key) in filters"
          :key="key"
          class="mx-0"
          color="primary"
          text
          small
          @click="() => (tab = key)"
        >
          {{ key | capitalize }}
        </v-btn>
      </v-btn-toggle>
    </v-card-actions>
    <v-list class="pa-0">
      <todo-item v-for="todo in filteredTodos" :key="`ti-${todo.id}`" :todo="todo" />
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { Todo } from '~/types';
import { TodoListFilter, TodoListFilterType } from '~/store/todoStore';

@Component({
  components: {},
  filters: {
    pluralize: (n: number, w: string) => (n === 1 ? w : w + 's'),
    capitalize: (s: string) => s.charAt(0).toUpperCase() + s.slice(1),
  },
})
export default class TodoList extends Vue {
  /*********************************************************************************
   * Prop & Variable & computed
   * ******************************************************************************/
  @Prop({ type: Array, default: [] }) readonly todos!: Todo[];

  filters: TodoListFilter = {
    ALL: (todos: Todo[]) => todos,
    ACTIVE: (todos: Todo[]) => todos.filter((todo: Todo) => !todo.status),
    COMPLETED: (todos: Todo[]) => todos.filter((todo: Todo) => todo.status),
  };

  tab: TodoListFilterType = 'ALL';
  selectedTabIndex = 0;

  get filteredTodos(): Todo[] {
    return [...this.filters[this.tab](this.todos)]
      .sort((a, z) => new Date(a.createdOn).getTime() - new Date(z.createdOn).getTime())
      .sort((a, z) => (a.status === z.status ? 0 : z.status ? -1 : 1));
  }

  get remaining() {
    return this.todos.filter(todo => !todo.status).length;
  }

  get progressPercentage() {
    const len = this.todos.length;
    return ((len - this.remaining) * 100) / len;
  }

  /*********************************************************************************
   * Store
   * ******************************************************************************/

  /*********************************************************************************
   * Emit
   * ******************************************************************************/

  /*********************************************************************************
   * Life Cycles
   * ******************************************************************************/
  /*********************************************************************************
   * Methods
   * ******************************************************************************/
  updateStatus(todo: Todo, done: boolean) {
    this.$accessor.todoStore.editTodo({ ...todo, status: done || false });
  }
}
</script>

<!--<style lang="scss" scoped></style>-->

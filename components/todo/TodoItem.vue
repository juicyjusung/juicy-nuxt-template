<template>
  <div>
    <v-divider :key="`d-${todo.id}`"></v-divider>
    <v-list-item :key="`i-${todo.id}`">
      <v-list-item-action class="mr-0">
        <v-checkbox
          v-if="!editing"
          :input-value="todo.status"
          :color="(todo.status && 'grey') || 'primary'"
          class="shrink"
          hide-details
          @change="done => updateStatus(todo, done)"
        >
        </v-checkbox>
        <v-icon v-else color="primary">mdi-pencil</v-icon>
      </v-list-item-action>
      <v-text-field
        :class="(todo.status && 'grey--text text-decoration-line-through') || 'primary--text'"
        class="ml-4 flex-grow-1"
        :value="todo.title"
        :clearable="editing"
        flat
        solo
        hide-details
        :readonly="!editing"
        @dblclick="changeEditMode(todo)"
        @blur="e => updateText(e, todo)"
        @keyup.enter="e => updateText(e, todo)"
        @keyup.esc="e => updateText(e, todo)"
      ></v-text-field>

      <v-spacer></v-spacer>

      <v-scroll-x-transition>
        <v-icon v-if="todo.status" color="success"> mdi-check </v-icon>
      </v-scroll-x-transition>
      <v-list-item-action>
        <v-btn color="red lighten-3" text icon @click="removeTodo(todo)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { Todo } from '~/types';
import { todoStore } from '~/store';

@Component({
  components: {},
})
export default class TodoItem extends Vue {
  /*********************************************************************************
   * Prop & Variable & computed
   * ******************************************************************************/
  @Prop(Object) readonly todo!: Todo;

  editing = false;

  changeEditMode(todo: Todo) {
    if (!todo.status) {
      this.editing = true;
    }
  }

  removeTodo(todo: Todo) {
    todoStore.removeTodo(todo);
  }

  updateText(e: { target: HTMLInputElement }, todo: Todo) {
    if (this.editing) {
      const newText = e.target.value;
      todoStore.editTodo({ ...todo, title: newText });
      this.editing = false;
    }
  }

  updateStatus(todo: Todo, done: boolean) {
    todoStore.editTodo({ ...todo, status: done || false });
  }
}
</script>

<!--<style lang="scss" scoped></style>-->

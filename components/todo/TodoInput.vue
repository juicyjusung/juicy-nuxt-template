<template>
  <v-card class="pa-0 flex-grow-1 d-flex">
    <v-icon color="primary" class="mx-4">mdi-check</v-icon>
    <v-text-field
      v-model="newTodo.title"
      :label="'New todo input'"
      autofocus
      autocomplete="off"
      clearable
      color="primary"
      flat
      hide-details
      maxlength="1023"
      placeholder="What needs to be done?"
      solo
      @keydown.enter="addTodo"
    ></v-text-field>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { TodoInput } from '~/entity/todo';

@Component({
  components: {},
})
export default class TodoInputC extends Vue {
  /*********************************************************************************
   * Prop & Variable & computed
   * ******************************************************************************/
  newTodo = new TodoInput();

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
  async addTodo() {
    await this.$accessor.todoStore.addTodo(this.newTodo);
    this.newTodo = new TodoInput();
  }
}
</script>

<!--<style lang="scss" scoped></style>-->

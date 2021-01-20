<template>
  <v-layout row wrap justify-center class="pt-10">
    <v-row class="d-flex flex-row justify-center" style="max-width: 500px">
      <todo-input />
      <todo-list :todos="todos" />
    </v-row>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { todoStore } from '~/store';

@Component({
  components: {},
  async fetch() {
    await todoStore.fetchTodos();
  },
  async asyncData() {},
})
export default class Home extends Vue {
  get todos() {
    return todoStore.todos;
  }
}
</script>

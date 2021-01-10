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

@Component({
  components: {},
  async fetch({ app: { $accessor } }) {
    await $accessor.todoStore.fetchTodos();
  },
  async asyncData() {},
})
export default class Home extends Vue {
  get todos() {
    return this.$accessor.todoStore.getTodos;
  }
}
</script>

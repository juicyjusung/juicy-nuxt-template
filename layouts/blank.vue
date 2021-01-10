<template>
  <v-app dark class="hi">
    <client-only>
      <notifications position="bottom center" />
    </client-only>
    <Nuxt />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  components: {},
  transition: {
    name: 'page',
    mode: 'out-in',
  },
})
export default class Blank extends Vue {}
</script>

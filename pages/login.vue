<template>
  <v-row justify="center" align="center">
    <v-card elevation="2" outlined class="pa-3" min-width="400">
      <v-card-title> login </v-card-title>
      <v-card-text>
        <login-form />
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import LoginForm from '~/components/user/loginForm.vue';

@Component({
  components: { LoginForm, ValidationProvider, ValidationObserver },
  layout: 'blank',
  auth: 'guest',
})
export default class login extends Vue {}
</script>

<!--<style lang="scss" scoped></style>-->

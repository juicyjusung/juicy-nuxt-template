<template>
  <validation-observer ref="observer" v-slot="{}">
    <form @submit.prevent="login">
      <validation-provider v-slot="{ errors }" name="email" rules="required|email">
        <v-text-field
          v-model="userLoginObj.email"
          :error-messages="errors"
          label="E-mail"
          required
        ></v-text-field>
      </validation-provider>
      <!-- password -->
      <validation-provider v-slot="{ errors }" name="Password" rules="required|min:8">
        <v-text-field
          v-model="userLoginObj.password"
          :error-messages="errors"
          label="Password"
          required
          type="password"
        ></v-text-field>
      </validation-provider>
      <v-row justify="center" class="mt-5">
        <v-btn class="mx-4" type="submit" color="primary">login</v-btn>
        <!--        <v-btn class="mx-4" color="info" @click="google">google</v-btn>-->
        <v-btn class="mx-4" to="/signup">signup</v-btn>
      </v-row>
    </form>
  </validation-observer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate';
import { UserLoginForm, UserRegisterForm } from '~/entity/user';
setInteractionMode('eager');

@Component({
  components: { ValidationProvider, ValidationObserver },
  layout: 'empty',
})
export default class LoginForm extends Vue {
  /*********************************************************************************
   * Prop & Variable & computed
   * ******************************************************************************/
  userLoginObj = new UserLoginForm();
  observer: any = null;

  /*********************************************************************************
   * Store
   * ******************************************************************************/
  // get email() {
  //   return this.$accessor.email;
  // }
  //
  /*********************************************************************************
   * Emit
   * ******************************************************************************/
  /*********************************************************************************
   * Life Cycles
   * ******************************************************************************/
  mounted() {
    this.observer = this.$refs.observer as object;
    this.userLoginObj.email = 'guest@gmail.com';
    this.userLoginObj.password = 'guestguest';
  }

  /*********************************************************************************
   * Methods
   * ******************************************************************************/
  async login() {
    const validation = await this.observer.validate();
    if (validation) {
      try {
        await this.$auth.loginWith('local', { data: this.userLoginObj });
        setTimeout(() => {
          this.$notify({
            title: '성공적으로 로그인 하였습니다.',
            type: 'success',
          });
        }, 100);
      } catch (e) {
        this.$notify({
          title: e.response.data.message,
          type: 'warn',
        });
      }
    }
  }

  clear() {
    this.userLoginObj = new UserRegisterForm();
    this.observer.reset();
  }

  async google() {
    // const res = await this.$auth.loginWith('google');
  }
}
</script>

<!--<style lang="scss" scoped></style>-->

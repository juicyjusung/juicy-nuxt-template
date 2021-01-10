<template>
  <validation-observer ref="observer" v-slot="{}">
    <form @submit.prevent="submit">
      <validation-provider v-slot="{ errors }" name="email" rules="required|email">
        <v-text-field
          v-model="userRegisterObj.email"
          :error-messages="errors"
          label="E-mail"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider v-slot="{ errors }" name="Name" rules="required|min:2">
        <v-text-field
          v-model="userRegisterObj.name"
          :error-messages="errors"
          label="Name"
          required
        ></v-text-field>
      </validation-provider>
      <!-- password -->
      <validation-provider
        v-slot="{ errors }"
        name="Password"
        rules="required|min:8|password:@confirm"
      >
        <v-text-field
          v-model="userRegisterObj.password"
          :error-messages="errors"
          label="Password"
          required
          type="password"
        ></v-text-field>
      </validation-provider>
      <validation-provider v-slot="{ errors }" name="confirm" rules="required|min:8">
        <v-text-field
          v-model="userRegisterObj.rePassword"
          :error-messages="errors"
          label="Password check"
          type="password"
          required
        ></v-text-field>
      </validation-provider>
      <v-row justify="center" class="mt-5">
        <v-btn class="mx-4" type="submit" color="primary"> submit </v-btn>
        <v-btn class="mx-4" to="/" @click="clear"> cancel </v-btn>
        <v-btn class="mx-4" @click="clear"> clear </v-btn>
      </v-row>
    </form>
  </validation-observer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate';
import { UserRegisterForm } from '~/entity/user';
setInteractionMode('eager');

@Component({
  components: { ValidationProvider, ValidationObserver },
  layout: 'empty',
})
export default class SignupForm extends Vue {
  /*********************************************************************************
   * Prop & Variable & computed
   * ******************************************************************************/
  userRegisterObj = new UserRegisterForm();
  observer: any = null;

  /*********************************************************************************
   * Store
   * ******************************************************************************/

  /*********************************************************************************
   * Emit
   * ******************************************************************************/
  /*********************************************************************************
   * Life Cycles
   * ******************************************************************************/
  mounted() {
    this.observer = this.$refs.observer as object;
  }

  /*********************************************************************************
   * Methods
   * ******************************************************************************/
  async submit() {
    const validation = await this.observer.validate();
    if (validation) {
      try {
        await this.$axios.post('/auth/register', this.userRegisterObj.getPayload());
        const payload = this.userRegisterObj.getLoginPayload();
        await this.$auth.loginWith('local', {
          data: payload,
        });
        await this.$router.push('/');
      } catch (e) {
        this.$notify({
          title: e.response.data.message,
          type: 'warn',
        });
      }
    }
  }

  clear() {
    this.userRegisterObj = new UserRegisterForm();
    this.observer.reset();
  }
}
</script>

<!--<style lang="scss" scoped></style>-->

<template>
  <v-app-bar :clipped-left="clipped" fixed app>
    <v-app-bar-nav-icon @click.stop="toggleDrawer" />
    <v-toolbar-title v-text="title" />
    <v-spacer />
    <span>{{ $auth.user && $auth.user.email }}</span>
    <div v-if="!$auth.loggedIn">
      <v-btn color="primary" class="ma-2" to="/signup">signup</v-btn>
      <v-btn color="primary" class="ma-2" to="/login">login</v-btn>
    </div>
    <div v-if="$auth.loggedIn">
      <v-btn color="primary" class="ma-2" @click="logout">logout</v-btn>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'nuxt-property-decorator';

@Component({
  components: {},
})
export default class LayoutHeader extends Vue {
  /*********************************************************************************
   * Prop & Variable & computed
   * ******************************************************************************/
  @Prop({ type: Boolean, default: false }) clipped!: boolean;
  @Prop({ type: Boolean, default: false }) drawer!: boolean;
  @Prop({ type: String, default: '' }) title!: string;
  /*********************************************************************************
   * Store
   * ******************************************************************************/

  /*********************************************************************************
   * Emit
   * ******************************************************************************/
  @Emit('toggleDrawer') private toggleDrawer() {
    return !this.drawer;
  }

  /*********************************************************************************
   * Life Cycles
   * ******************************************************************************/
  /*********************************************************************************
   * Methods
   * ******************************************************************************/

  logout() {
    this.$auth.logout();
    this.$notify({
      title: '성공적으로 로그아웃 하였습니다.',
      type: 'success',
    });
  }
}
</script>

<!--<style lang="scss" scoped></style>-->

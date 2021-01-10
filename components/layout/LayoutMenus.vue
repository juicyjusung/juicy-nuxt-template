<template>
  <v-navigation-drawer :value="drawer" :clipped="clipped" fixed app @input="toggleDrawer">
    <v-list>
      <v-list-item v-for="(item, i) in menus" :key="i" :to="item.to" router exact>
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator';
import { NavigationMenu } from '~/entity/common/layout';

@Component({
  components: {},
})
export default class LayoutMenus extends Vue {
  /*********************************************************************************
   * Prop & Variable & computed
   * ******************************************************************************/
  @Prop({ type: Array, default: [] }) menus!: NavigationMenu[];
  @Prop({ type: Boolean, default: false }) clipped!: boolean;
  @Prop({ type: Boolean, default: false }) drawer!: boolean;
  /*********************************************************************************
   * Store
   * ******************************************************************************/

  /*********************************************************************************
   * Emit
   * ******************************************************************************/
  @Emit('toggleDrawer') private toggleDrawer(drawer: boolean) {
    return drawer;
  }

  /*********************************************************************************
   * Life Cycles
   * ******************************************************************************/
  /*********************************************************************************
   * Methods
   * ******************************************************************************/
}
</script>

<!--<style lang="scss" scoped></style>-->

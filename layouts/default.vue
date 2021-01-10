<template>
  <v-app dark>
    <client-only>
      <notifications position="bottom center" />
    </client-only>

    <layout-menus
      :menus="menus"
      :clipped="clipped"
      :drawer="drawer"
      @toggleDrawer="val => (drawer = val)"
    />
    <layout-header
      :clipped="clipped"
      :drawer="drawer"
      title="juicytodo"
      @toggleDrawer="val => (drawer = val)"
    />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <layout-footer :absolute="!fixed" />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { NavigationMenu } from '@/entity/common/layout';

@Component({
  components: {},
  transition: {
    name: 'page',
    mode: 'out-in',
  },
})
export default class DefaultLayout extends Vue {
  menus: NavigationMenu[] = [
    {
      icon: 'mdi-check-bold',
      title: 'todos',
      to: '/',
    },
    {
      icon: 'mdi-chart-bubble',
      title: 'Inspire',
      to: '/inspire',
    },
  ];

  clipped = false;
  drawer = true;
  fixed = false;
  miniVariant = false;
  title = 'juicy template';

  created() {}
}
</script>

<style lang="scss">
.notification-title {
  font-size: 16px;
}
</style>

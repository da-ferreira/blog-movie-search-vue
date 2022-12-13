<template>
  <v-app>
    <Header />
    <router-view />
  </v-app>
</template>

<script>
import Header from './views/layout/Header.vue';

export default {
  name: 'App',
  components: {
    Header,
  },
};
</script>
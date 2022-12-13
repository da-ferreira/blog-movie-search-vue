<template>
  <v-app-bar app color="white" elevation="1" elevate-on-scroll>
    <router-link :to="{ name: 'home' }" style="text-decoration: none; color: inherit">
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="../../assets/logo.svg"
          transition="scale-transition"
          width="40"
        />
        <v-toolbar-title class="font-weight-bold text--black">Movie Search</v-toolbar-title>
      </div>
    </router-link>

    <v-row justify="center" class="mt-5">
      <v-col cols="6">
        <v-text-field
          color="cyan"
          label="Pesquise por filmes"
          single-line
          clearable
          prepend-inner-icon="mdi-magnify"
          @click:prepend-inner="searchMovies()"
          @keyup.enter="searchMovies()"
          v-model="search"
          :loading="loadingSearch"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Header',

  data() {
    return {
      search: '',
      loadingSearch: false,
    };
  },

  methods: {
    searchMovies() {
      this.$router.push({ name: 'home', query: { q: this.search } })
    },
  },
};
</script>

<style>
</style>
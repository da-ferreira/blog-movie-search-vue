<template>
  <v-main class="ma-3">
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-text-field
          color="success"
          label="Busque por filmes"
          prepend-icon="mdi-magnify"
          v-model="search"
          @keyup="lazySearch()"
          :loading="loadingSearch"
        ></v-text-field>
      </v-col>
    </v-row>

    <Cards :movies="movies" />

    <div class="text-center my-3" v-show="page.current < page.total">
      <v-btn
        outlined
        rounded
        :loading="loadingMoreResults"
        :icon="loadingMoreResults"
        @click="moreResults()"
      >
        Mais resultados
      </v-btn>
    </div>
  </v-main>
</template>

<script>
// import MovieCard from '../../components/MovieCard.vue';
// import Cards from '../../components/Cards.vue';
import Cards from '@/components/Cards.vue';

export default {
  name: 'Main',

  components: {
    // MovieCard,
    Cards,
  },

  data() {
    return {
      search: '',
      timeout: null,
      movies: [],
      loadingSearch: false,
      loadingMoreResults: false,
      totalResults: 0,
      page: {
        current: 0,
        total: 0,
      },
    };
  },

  methods: {
    lazySearch() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(
        () => this.$router.push({ name: 'home', query: { q: this.search } }),
        800
      );
    },

    searchMovies(search, page = 1) {
      if (!search) {
        this.movies = [];
        return;
      }

      this.search = search;

      const queryString = new URLSearchParams({
        api_key: process.env.VUE_APP_TMDB_API_KEY,
        language: 'pt-BR',
        query: this.search,
        page,
      });

      const url = `${this.$apiBaseUrl}/search/movie?${queryString.toString()}`;

      this.loadingSearch = true;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.movies = this.movies.concat(data.results);
          this.page.total = data.total_pages;
          this.page.current = data.page;
          this.totalResults = data.total_results;
          this.loadingSearch = false;
          this.loadingMoreResults = false;
        })
        .catch((err) => console.error(err));
    },

    moreResults() {
      this.loadingMoreResults = true;
      this.searchMovies(this.search, this.page.current + 1);
    },
  },

  created() {
    this.searchMovies(this.$route.query.q);
  },

  watch: {
    '$route.query.q'(value) {
      this.movies = [];
      this.searchMovies(value);
    },
  },
};
</script>

<style>
</style>
<template>
  <v-main class="ma-3">
    <template v-if="$route.query.q">
      <Cards :items="movies" :length="totalResults" />

      <div class="text-center my-3" v-show="totalResults > 0 && page.current < page.total">
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
    </template>

    <template v-else>
      <div class="text-center">
        <v-img
          alt="Home"
          contain
          src="../../assets/home.jpg"
          height="70vh"
        />
        <h1 class="grey--text">Pesquise por filmes, programas de tv e pessoas</h1>
      </div>
    </template>
  </v-main>
</template>

<script>
import Cards from '@/components/Cards.vue';

export default {
  name: 'Main',

  components: {
    Cards,
  },

  data() {
    return {
      timeout: null,
      movies: [],
      loadingMoreResults: false,
      totalResults: 0,
      page: {
        current: 0,
        total: 0,
      },
    };
  },

  methods: {
    searchMovies(search, page = 1) {
      if (!search) {
        this.movies = [];
        return;
      }

      const queryString = new URLSearchParams({
        api_key: process.env.VUE_APP_TMDB_API_KEY,
        language: 'pt-BR',
        query: search,
        page,
      });

      const url = `${this.$apiBaseUrl}/search/multi?${queryString.toString()}`;
      this.loadingMoreResults = false;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.movies = this.movies.concat(data.results);
          this.page.total = data.total_pages;
          this.page.current = data.page;
          this.totalResults = data.total_results;
          this.loadingMoreResults = false;
        })
        .catch((err) => console.error(err));
    },

    moreResults() {
      this.loadingMoreResults = true;
      this.searchMovies(this.$route.query.q, this.page.current + 1);
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
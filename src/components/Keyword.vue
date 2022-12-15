<template>
  <v-container fluid class="grey lighten-5 mt-15">
    <v-banner single-line class="mb-2">
      <h1 class="mb-2">{{ keyword.name }}</h1>
    </v-banner>

    <Cards :movies="movies" :length="totalResults" />

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
  </v-container>
</template>

<script>
import Cards from '@/components/Cards.vue';

export default {
  name: 'Keyword',

  components: {
    Cards,
  },

  data() {
    return {
      movies: [],
      keyword: {},
      loadingMoreResults: false, 
      totalResults: 0,
      page: {
        current: 0,
        total: 0,
      },
    };
  },

  methods: {
    queryString(query) {
      return new URLSearchParams({
        api_key: process.env.VUE_APP_TMDB_API_KEY,
        language: 'pt-BR',
        ...query,
      }).toString();
    },

    keywordDetails() {
      let url = `${this.$apiBaseUrl}/keyword/${this.$route.params.keyword}?${this.queryString()}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.keyword = data;
        });
    },

    keywordMovies(page = 1) {
      let url = `${this.$apiBaseUrl}/keyword/${this.$route.params.keyword}/movies?${this.queryString({ page })}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.movies = this.movies.concat(data.results);
          this.page.total = data.total_pages;
          this.page.current = data.page;
          this.totalResults = data.total_results;
          this.loadingMoreResults = false;
        });
    },

    moreResults() {
      this.loadingMoreResults = true;
      this.keywordMovies(this.page.current + 1);
    },
  },

  created() {
    this.keywordMovies();
    this.keywordDetails();
  },
};
</script>

<style>
</style>
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

    <template v-if="totalResults > 0">
      <h4 class="grey--text text-center">{{ totalResults }} results</h4>
      <div class="d-flex flex-row flex-wrap justify-center">
        <div v-for="movie in movies" :key="movie.id">
          <PostCard
            :id="movie.id"
            :title="movie.title"
            :description="movie.overview"
            :thumbnail="getThumbnail(movie.poster_path)"
          />
        </div>
      </div>

      <div class="text-center my-3" v-show="currentPage < totalPages">
        <v-btn
          outlined
          rounded
          :loading="loadingMoreResults"
          :icon="loadingMoreResults"
          @click="moreResults()"
          >Mais resultados</v-btn
        >
      </div>
    </template>

    <template v-else>
      <div class="grey--text text-center">
        <h1 class="font-weight-bold">No results</h1>
        <v-icon x-large>mdi-movie-open-off-outline</v-icon>
      </div>
    </template>
  </v-main>
</template>

<script>
import PostCard from '../../components/PostCard.vue';

export default {
  name: 'Main',

  components: {
    PostCard,
  },

  data() {
    return {
      search: '',
      timeout: null,
      movies: [],
      loadingSearch: false,
      loadingMoreResults: false,
      currentPage: 0,
      totalPages: 0,
      totalResults: 0,
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
          this.totalPages = data.total_pages;
          this.currentPage = data.page;
          this.totalResults = data.total_results;
          this.loadingSearch = false;
          this.loadingMoreResults = false;
        })
        .catch((err) => console.error(err));
    },

    getThumbnail(path) {
      return path
        ? `${this.$apiImageBaseUrl}/original${path}`
        : require('../../assets/placeholder.png');
    },

    moreResults() {
      this.loadingMoreResults = true;
      this.searchMovies(this.search, this.currentPage + 1);
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
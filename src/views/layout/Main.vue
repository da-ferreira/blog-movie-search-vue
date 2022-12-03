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
          :loading="loading"
        ></v-text-field>
      </v-col>
    </v-row>

    <template v-if="movies.length > 0">
      <h4 class="grey--text text-center">{{ movies.length }} results</h4>
      <div class="d-flex flex-row flex-wrap justify-center">
        <div v-for="movie in movies" :key="movie.id">
          <PostCard
            :id="movie.id"
            :title="movie.title"
            :description="movie.overview"
            :thumbnail="getThumbnail(movie.poster_path)"
          />
          <!-- :thumbnail="movie.image === '' ? require('../../assets/placeholder.png') : movie.image" -->
        </div>
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
      loading: false,
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

    searchMovies(search) {
      if (!search) {
        this.movies = [];
        return;
      }

      this.search = search;

      const queryString = new URLSearchParams({
        api_key: process.env.VUE_APP_TMDB_API_KEY,
        language: 'pt-BR',
        query: this.search,
      });

      const url = `${this.$apiBaseUrl}/search/movie?${queryString.toString()}`;
      this.loading = true;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.movies = data.results;
          this.loading = false;
          console.log(data);
        })
        .catch((err) => console.error(err));
    },

    getThumbnail(path) {
      return path
        ? `${this.$apiImageBaseUrl}/original${path}`
        : require('../../assets/placeholder.png');
    },
  },

  created() {
    this.searchMovies(this.$route.query.q);
  },

  watch: {
    '$route.query.q'(value) {
      this.searchMovies(value);
    },
  },
};
</script>

<style>
</style>
<template>
  <v-main class="ma-3">
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-text-field
          color="success"
          label="Search for movies, directors, actors and more"
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
            :description="movie.description"
            :thumbnail="movie.image === '' ? require('../../assets/placeholder.png') : movie.image"
          />
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
      this.timeout = setTimeout(() => this.searchMovies(), 800);
    },

    searchMovies() {
      if (this.search === '') {
        this.movies = [];
        return;
      }

      this.loading = true;
      const url = `https://imdb-api.com/en/API/Search/${process.env.VUE_APP_IMDB_API_KEY}/${this.search}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.movies = data.results;
          this.loading = false;
        })
        .catch((err) => console.error(err));
    },
  },
};
</script>

<style>
</style>
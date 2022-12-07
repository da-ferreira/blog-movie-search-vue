<template>
  <v-container fluid class="grey lighten-5">
    <v-banner single-line>
      <h1 class="mb-1">{{ keyword.name }}</h1>
    </v-banner>

    <!-- <template v-if="totalResults > 0">
      <h4 class="grey--text text-center">{{ totalResults }} filmes</h4>
      <div class="d-flex flex-row flex-wrap justify-center">
        <div v-for="movie in movies" :key="movie.id">
          <PostCard
            :id="movie.id"
            :title="movie.title"
            :description="movie.overview"
            :thumbnail="movie.poster_path"
          />
        </div>
      </div>

      <div class="text-center my-3" v-show="(page.current < page.total)">
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
        <h1 class="font-weight-bold">Sem resultados</h1>
        <v-icon x-large>mdi-movie-open-off-outline</v-icon>
      </div>
    </template> -->
  </v-container>
</template>

<script>
export default {
  name: 'Keyword',

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
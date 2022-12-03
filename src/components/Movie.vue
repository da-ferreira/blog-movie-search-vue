<template>
  <v-container fluid class="grey lighten-5">
    <v-row>
      <v-col sm="7" cols="12" md="4" min-width="60%">
        <v-img :src="thumbnail(movie.poster_path)" height="95vh" alt="Movie image" contain></v-img>
      </v-col>

      <v-col sm="5" cols="12" md="8">
        <v-card outlined tile>
          <v-card-title>{{ movie.title }}</v-card-title>
          <v-card-text>
            <p>{{ movie.overview }}</p>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-text>
            <p>Duração: {{ runtime(movie.runtime) }}</p>
            <p>Data de lançamento: {{ releaseDate(movie.release_date) }}</p>
            <p>Produzido por: {{ madeBy(movie.production_companies) }}</p>
            <p>Bilheteria: {{ revenue(movie.revenue) }}</p>
            <v-chip outlined v-for="genre in movie.genres" :key="genre">{{ genre.name }}</v-chip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Movie',

  data() {
    return {
      movie: {},
    };
  },

  methods: {
    thumbnail(path) {
      return path
        ? `${this.$apiImageBaseUrl}/original${path}`
        : require('../assets/placeholder.png');
    },

    releaseDate(date) {
      return new Date(date).toLocaleDateString();
    },

    runtime(minutes) {
      let hours = Math.trunc(minutes / 60);
      minutes = minutes - hours * 60;

      return `${hours}h ${minutes}m`;
    },

    madeBy(companies) {
      return companies.map((element) => element.name).join(', ');
    },

    revenue(revenue) {
      return `${revenue}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },
  },

  created() {
    const queryString = new URLSearchParams({
      api_key: process.env.VUE_APP_TMDB_API_KEY,
      language: 'pt-BR',
    });

    const url = `${this.$apiBaseUrl}/movie/${this.$route.params.id}?${queryString.toString()}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.movie = data;
      })
      .catch((err) => console.error(err));
  },
};
</script>

<style>
</style>
<template>
  <v-container fluid class="grey lighten-5">
    <v-row>
      <v-col sm="7" cols="12" md="4" min-width="60%">
        <v-img :src="image(movie.poster_path)" height="95vh" alt="Movie image"></v-img>
      </v-col>

      <v-col sm="5" cols="12" md="8">
        <h2 class="ma-2">Elenco do filme</h2>

        <div class="overflow-y-auto cast">
          <div class="d-flex flex-row flex-wrap">
            <v-card v-for="person in cast" :key="person.id" class="ma-2" width="150" height="auto">
              <v-img height="150" width="150" :src="image(person.profile_path)"></v-img>
              <v-card-text class="text-center pa-2">
                <h4>{{ person.name }}</h4>
                <p>{{ person.character }}</p>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </v-col>

      <v-col>
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
            <v-chip outlined v-for="genre in movie.genres" :key="genre.id">{{ genre.name }}</v-chip>
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
      cast: [],
    };
  },

  methods: {
    image(path) {
      return path
        ? `${this.$apiImageBaseUrl}/original${path}`
        : require('../assets/placeholder-profile.jpg');
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
      return companies?.map((element) => element.name).join(', ');
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

    const urlMovie = `${this.$apiBaseUrl}/movie/${this.$route.params.id}?${queryString.toString()}`;
    const urlMovieCast = `
      ${this.$apiBaseUrl}/movie/${this.$route.params.id}/credits?${queryString.toString()}
    `;

    fetch(urlMovie)
      .then((response) => response.json())
      .then((data) => {
        this.movie = data;
      });

    fetch(urlMovieCast)
      .then((response) => response.json())
      .then((data) => {
        this.cast = data.cast;
        console.log(this.cast);
      });
  },
};
</script>

<style>
.cast {
  height: 86vh;
}

.cast::-webkit-scrollbar {
  width: 0rem;
}
</style>
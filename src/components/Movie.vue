<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col sm="6" cols="12">
        <v-img :src="movie.image" contain height="95vh" alt="Movie image"></v-img>
      </v-col>

      <v-col sm="6" cols="12">
        <v-card outlined tile>
          <v-card-title>{{ movie.fullTitle }}</v-card-title>
          <v-card-text>
            <p>{{ movie.plotLocal }}</p>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-text>
            <p>Duração: {{ movie.runtimeStr }}</p>
            <p>Data de lançamento: {{ movie.releaseDate }}</p>
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

  created() {
    const url = `https://imdb-api.com/pt/API/Title/${process.env.VUE_APP_IMDB_API_KEY}/${this.$route.params.id}/FullActor`;

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
<template>
  <section>
    <template v-if="length > 0">
      <h4 class="grey--text text-center">{{ length }} filmes</h4>
      <div class="d-flex flex-row flex-wrap justify-center">
        <div v-for="movie in movies" :key="movie.id">
          <MovieCard
            :id="movie.id"
            :title="movie.title"
            :description="movie.overview"
            :thumbnail="movie.poster_path"
          />
        </div>
      </div>
    </template>

    <template v-else>
      <div class="text-center">
        <v-img alt="Home" contain src="../assets/no-results.jpg" height="70vh" />
        <h1>Sem resultados</h1>
      </div>
    </template>
  </section>
</template>

<script>
import MovieCard from './MovieCard.vue';

export default {
  name: 'Cards',

  components: {
    MovieCard,
  },

  props: {
    movies: Array,
    length: Number,
  },
};
</script>

<style>
</style>
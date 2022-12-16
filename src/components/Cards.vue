<template>
  <section>
    <template v-if="length > 0">
      <h4 class="grey--text text-center">{{ length }} resultados</h4>

      <!-- Filtros -->
      <div class="d-flex justify-center">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              class="mx-2 mt-1"
              @click="filterByMediaType('movie')"
              :outlined="filters.movie"
              v-bind="attrs"
              v-on="on"
            >
              Filmes
            </v-chip>
          </template>
          <span>Mostrar somente os filmes</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              class="mx-2 mt-1"
              @click="filterByMediaType('tv')"
              :outlined="filters.tv"
              v-bind="attrs"
              v-on="on"
            >
              Programas de TV
            </v-chip>
          </template>
          <span>Mostrar somente os programas de TV</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              class="mx-2 mt-1"
              @click="filterByMediaType('person')"
              :outlined="filters.person"
              v-bind="attrs"
              v-on="on"
            >
              Pessoas
            </v-chip>
          </template>
          <span>Mostrar somente as pessoas</span>
        </v-tooltip>
      </div>

      <div class="d-flex flex-row flex-wrap justify-center">
        <div v-for="item in items" :key="item.id">
          <Card
            :id="item.id"
            :title="item.title ?? item.name"
            :description="item.overview ?? ''"
            :thumbnail="item.poster_path ?? item.profile_path ?? ''"
            :mediaType="item.media_type"
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
import Card from './Card.vue';

export default {
  name: 'Cards',

  data() {
    return {
      filters: {
        tv: false,
        movie: false,
        person: false,
      },
    };
  },

  components: {
    Card,
  },

  props: {
    items: Array,
    length: Number,
  },

  methods: {
    filterByMediaType(mediaType) {
      let initialValue = this.filters[mediaType];

      Object.keys(this.filters).forEach((key) => {
        this.filters[key] = false;
      });

      this.filters[mediaType] = !initialValue;

      if (this.filters[mediaType]) {
        // TODO: Lógica de filtragem
        // this.items = this.items.filter((item) => item.media_type === mediaType);
      }
    },
  },
};
</script>

<style>
</style>
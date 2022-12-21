<template>
  <section>
    <template v-if="length > 0">
      <h4 class="grey--text text-center">{{ length }} resultados</h4>

      <div class="d-flex flex-row flex-wrap justify-center">
        <div v-for="item in items" :key="item.id">
          <Card
            :id="item.id"
            :title="item.title ?? item.name"
            :description="item.overview ?? ''"
            :thumbnail="item.poster_path ?? item.profile_path ?? ''"
            :mediaType="item.media_type ?? mediaType"
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

  components: {
    Card,
  },

  props: {
    items: Array,
    length: Number,
    mediaType: {
      type: String,
      default: 'movie',
    },
  },
};
</script>

<style>
</style>
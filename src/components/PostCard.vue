<template>
  <v-card elevation="2" outlined max-width="20rem" max-height="36rem" class="ma-2">
    <v-img :src="thumbnail" height="250"></v-img>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>{{ description }}</v-card-text>

    <v-card-actions>
      <v-btn outlined rounded text>Leia mais</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'PostCard',

  props: {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
      required: true,
    },
  },

  data() {
    return {};
  },
};
</script>

<style>
</style>
<template>
  <v-card elevation="2" outlined max-width="20rem" min-height="28rem" class="ma-2">
    <v-img :src="thumbnail" height="250"></v-img>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <p class="line-clamp-two-lines">{{ description }}</p>
    </v-card-text>

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
};
</script>

<style>
.line-clamp-2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  white-space: normal;
}

.line-clamp-3 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  white-space: normal;
}
</style>
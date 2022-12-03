<template>
  <div>
    <v-card outlined max-width="20rem" min-height="28rem" class="ma-2" elevation="2">
      <v-hover v-slot="{ hover }">
        <v-img :src="thumbnail" height="250" width="320" :class="{ 'hover-image': hover }">
          <div class="text-center">
            <v-btn icon v-if="hover" class="show-btn" @click="expandImage = true">
              <v-icon> mdi-arrow-expand-all </v-icon>
              <span class="ml-2">Expandir</span>
            </v-btn>
          </div>
        </v-img>
      </v-hover>

      <v-card-title class="title">
        <span class="line-clamp-2">{{ title }}</span>
      </v-card-title>
      <v-card-text class="description">
        <span class="line-clamp-3">{{ description }}</span>
      </v-card-text>
      <v-card-actions>
        <router-link :to="{ name: 'showMovie', params: { id } }">
          <v-btn outlined rounded text>Mais detalhes</v-btn>
        </router-link>
      </v-card-actions>
    </v-card>

    <div v-if="expandImage" class="expand-image">
      <v-img :src="thumbnail" contain height="100vh" class="pa-1"></v-img>
      <v-btn class="close-expand-image" icon @click="expandImage = false">
        <v-icon x-large>mdi-close</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostCard',

  data() {
    return {
      expandImage: false,
    };
  },

  props: {
    id: {
      type: Number,
      required: true,
    },

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

.description {
  height: 4rem;
}

.title {
  height: 6rem;
}

.hover-image {
  filter: grayscale(100%);
  /* filter: blur(0.2rem); */

}

.show-btn {
  color: rgba(255, 255, 255, 1) !important;
  margin-top: 6rem;
}

.expand-image {
  height: 100vh;
  z-index: 5;
  position: fixed;
  inset: 0;
  background-color: rgba(50, 50, 50, 0.9);
}

.close-expand-image {
  position: relative;
  left: 96%;
  bottom: 98%;
}

a {
  text-decoration: none;
}
</style>
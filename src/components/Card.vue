<template>
  <v-hover v-slot="{ hover }">
    <div>
      <v-card outlined max-width="20rem" min-height="28rem" class="ma-2" :elevation="hover ? 1 : 0">
        <v-img
          :src="getThumbnail(thumbnail)"
          height="250"
          width="320"
          :class="{ 'hover-image': hover }"
        >
          <v-chip label :color="mediaTypes[mediaType].color">
            {{ mediaTypes[mediaType].name }}
          </v-chip>

          <div class="text-center">
            <v-btn icon v-if="hover" class="show-btn" @click="expandImage = true">
              <v-icon> mdi-arrow-expand-all </v-icon>
              <span class="ml-2">Expandir</span>
            </v-btn>
          </div>
        </v-img>

        <v-card-title class="title">
          <span class="line-clamp-2">{{ title }}</span>
        </v-card-title>
        <v-card-text class="description">
          <span class="line-clamp-3">{{ description }}</span>
        </v-card-text>
        <v-card-actions>
          <router-link :to="{ name: mediaTypes[mediaType].route, params: { id } }">
            <v-btn outlined rounded text>Mais detalhes</v-btn>
          </router-link>
        </v-card-actions>
      </v-card>

      <div v-if="expandImage" class="expand-image">
        <v-img :src="getThumbnail(thumbnail)" contain height="100vh" class="pa-1"></v-img>
        <v-btn class="close-expand-image" icon @click="expandImage = false">
          <v-icon x-large>mdi-close</v-icon>
        </v-btn>
      </div>
    </div>
  </v-hover>
</template>

<script>
export default {
  name: 'Card',

  data() {
    return {
      expandImage: false,
      mediaTypes: {
        tv: {
          name: 'Programa de TV',
          color: 'primary',
          route: 'tv',
        },
        person: {
          name: 'Pessoa',
          color: 'primary',
          route: 'person',
        },
        movie: {
          name: 'Filme',
          color: 'primary',
          route: 'movie',
        },
      },
    };
  },

  methods: {
    getThumbnail(path) {
      return path
        ? `${this.$apiImageBaseUrl}/original${path}`
        : require('../assets/placeholder.png');
    },
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

    mediaType: {
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
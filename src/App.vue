<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>
    </v-app-bar>

    <v-main class="ma-3">
      <div class="d-flex flex-row flex-wrap justify-center">
        <div v-for="number in 10" :key="number">
          <PostCard :title="title" :description="description" :thumbnail="thumbnail" />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import PostCard from './components/PostCard.vue';

export default {
  name: 'App',

  components: {
    PostCard,
  },

  data() {
    return {
      title: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus fugiat id nobis, voluptates accusamus dolor maxime nisi, cupiditate iusto rerum repellat minima quis excepturi dignissimos ratione tempora vel ipsam. Rem.',
      thumbnail: 'https://picsum.photos/1200',
    };
  },
};
</script>

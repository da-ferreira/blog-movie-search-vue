<template>
  <v-container fluid class="grey lighten-5">
    <v-row>
      <v-col sm="7" cols="12" md="4" min-width="60%">
        <v-img
          :src="image(movie.poster_path)"
          height="95vh"
          alt="Movie image"
          class="rounded-lg"
        ></v-img>
      </v-col>

      <v-col sm="5" cols="12" md="8">
        <h2 class="ma-2">Elenco do filme</h2>

        <div class="overflow-y-auto cast">
          <div class="d-flex flex-row flex-wrap justify-center">
            <v-card
              v-for="person in cast"
              :key="person.id"
              class="ma-2"
              width="150"
              height="auto"
              @click="personDetails(person.id)"
            >
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
        <v-card outlined tile class="rounded-lg">
          <v-row>
            <v-col cols="12" md="8">
              <v-card-title>{{ movie.title }}</v-card-title>
              <v-card-text>
                <p>{{ movie.overview }}</p>
              </v-card-text>

              <v-card-text>
                <p><strong>Duração: </strong> {{ runtime(movie.runtime) }}</p>
                <p><strong>Data de lançamento: </strong>{{ formatDate(movie.release_date) }}</p>
                <p><strong>Produzido por: </strong>{{ madeBy(movie.production_companies) }}</p>
                <p><strong>Bilheteria: </strong> {{ revenue(movie.revenue) }}</p>
              </v-card-text>
            </v-col>
            <v-col cols="12" md="4">
              <v-card-text>
                <p><strong>Gêneros</strong></p>
                <v-chip v-for="genre in movie.genres" :key="genre.id" class="ma-1">
                  {{ genre.name }}
                </v-chip>

                <p class="mt-3"><strong>Palavras chaves</strong></p>
                <v-chip
                  v-for="keyword in keywords"
                  :key="keyword.id"
                  class="ma-1"
                  :style="{ cursor: 'pointer' }"
                >
                  <router-link :to="{ name: 'keyword', params: { keyword: keyword.id } }">
                    {{ keyword.name }}
                  </router-link>
                </v-chip>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="person.dialog" max-width="700">
      <v-card :loading="person.loading">
        <v-card-title>{{ person.details.name }}</v-card-title>
        <v-card-text class="text-justify">
          <p>{{ person.details.biography }}</p>
          <p v-show="person.details.birthday">
            Nasceu em: {{ formatDate(person.details.birthday) }} |
            {{ age(person.details.birthday) }} anos
          </p>
          <p v-show="person.details.deathday">
            Morreu em: {{ formatDate(person.details.deathday) }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="person.dialog = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'Movie',

  data() {
    return {
      movie: {},
      cast: [],
      keywords: [],
      person: {
        loading: false,
        dialog: false,
        image: '',
        details: {},
      },
    };
  },

  methods: {
    image(path) {
      return path
        ? `${this.$apiImageBaseUrl}/original${path}`
        : require('../assets/placeholder-profile.jpg');
    },

    queryString(query) {
      return new URLSearchParams({
        api_key: process.env.VUE_APP_TMDB_API_KEY,
        language: 'pt-BR',
        ...query,
      }).toString();
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },

    age(birthday) {
      return new Date().getFullYear() - Number(birthday?.split('-')[0]);
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

    personDetails(id) {
      this.person.dialog = true;
      this.person.loading = true;

      let url = `${this.$apiBaseUrl}/person/${id}?${this.queryString()}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.person.details = data;
          this.person.loading = false;
        });
    },

    movieInfo() {
      let url = `${this.$apiBaseUrl}/movie/${this.$route.params.id}?${this.queryString()}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.movie = data;
        });
    },

    movieCast() {
      let url = `${this.$apiBaseUrl}/movie/${this.$route.params.id}/credits?${this.queryString()}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.cast = data.cast;
        });
    },

    movieKeywords() {
      let url = `${this.$apiBaseUrl}/movie/${this.$route.params.id}/keywords?${this.queryString()}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.keywords = data.keywords;
        });
    },
  },

  created() {
    this.movieKeywords();
    this.movieInfo();
    this.movieCast();
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
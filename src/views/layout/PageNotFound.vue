<template>
  <section>
    <v-container class="py-4 text-center">
      <div class="not-found-bg">
        <h1>404</h1>
      </div>

      <div class="message">
        <h3>Parece que você está perdido</h3>
        <p>A página que você está procurando não está disponível!</p>

        <router-link :to="{ name: 'home' }">
          <v-btn rounded color="secondary">Voltar para a home</v-btn>
        </router-link>
      </div>
    </v-container>
  </section>
</template>
<script>
export default {
  name: 'PageNotFound',
};
</script>

<style>
.not-found-bg {
  background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
  height: 25rem;
  background-position: center;
  font-size: 3rem;
}

.message {
  margin-top: -50px;
}
</style>
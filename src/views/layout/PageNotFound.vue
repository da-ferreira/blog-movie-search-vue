<template>
  <section>
    <v-container class="py-4 text-center mt-15">
      <v-img
        alt="Not Found - 404"
        contain
        src="../../assets/404.jpg"
        height="60vh"
        transition="scale-transition"
      />
      
      <div>
        <h3>Parece que você está perdido</h3>
        <p>A página que você está procurando não está disponível!</p>
        <router-link :to="{ name: 'home' }">
          <v-btn rounded outlined>Voltar para a home</v-btn>
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
</style>
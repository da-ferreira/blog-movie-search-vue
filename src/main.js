import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$apiBaseUrl = 'https://api.themoviedb.org/3';
Vue.prototype.$apiImageBaseUrl = 'https://image.tmdb.org/t/p';

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

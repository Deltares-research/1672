import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'fullpage.js/vendors/scrolloverflow.min.js' // Optional. When using scrollOverflow:true
import VueFullPage from 'vue-fullpage.js'
import 'leaflet/dist/leaflet.css';

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
//
Vue.use(VueFullPage);
//
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')


import Vue from 'vue'
import 'fullpage.js/vendors/scrolloverflow' // Optional. When using scrollOverflow:true
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'fullpage.js/vendors/scrolloverflow' // Optional. When using scrollOverflow:true
import VueFullPage from 'vue-fullpage.js'

/**
@import 'https://unpkg.com/fullpage.js/dist/fullpage.min.css';
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100&display=swap');
@import url('https://js.arcgis.com/3.23/esri/css/esri.css');
@import url('bootstrap/dist/css/bootstrap.css');
@import url('bootstrap-vue/dist/bootstrap-vue.css');
**/

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


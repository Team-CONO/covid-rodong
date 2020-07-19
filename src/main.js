import Vue from 'vue'
import App from './App.vue'
import AOS from 'aos';
import VueTilt from "vue-tilt.js";
import 'aos/dist/aos.css';
import VueDarkMode from "@growthbunker/vuedarkmode"

Vue.config.productionTip = false
Vue.use(VueDarkMode);
Vue.use(VueTilt);

new Vue({
  created() {
    AOS.init({duration: 1500});
  },
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import AOS from 'aos';
import 'aos/dist/aos.css';
import VueDarkMode from "@growthbunker/vuedarkmode"

Vue.config.productionTip = false
Vue.use(VueDarkMode);

new Vue({
  created() {
    AOS.init({duration: 1500});
  },
  render: h => h(App),
}).$mount('#app')

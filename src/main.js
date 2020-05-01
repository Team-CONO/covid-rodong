import Vue from 'vue'
import App from './App.vue'

import AOS from 'aos';
import 'aos/dist/aos.css';

new Vue({
  el: '#app',
  created() {
    AOS.init({
      // duration: 3000
    });
  },
  render: h => h(App)
})

import Vue from 'vue'
import App from './App.vue'
import AOS from 'aos';
import VueTilt from "vue-tilt.js";
import 'aos/dist/aos.css';
import VueDarkMode from "@growthbunker/vuedarkmode"
import BootstrapVue from 'bootstrap-vue';
import JVectorMap from 'jvectormap';
// import 'expose-loader?$!expose-loader?jQuery!jquery'
// import './assets/jquery-jvectormap-2.0.5/jvectormap'
// import './assets/jquery-jvectormap-2.0.5/jquery-jvectormap.css'
// // import './assets/jquery-jvectormap-2.0.5/jquery-jvectormap'
// import './assets/jquery-jvectormap-2.0.5/jquery-jvectormap-map'
// // import './assets/jquery-jvectormap-2.0.5/jquery-jvectormap-2.0.5.css';
// // import './assets/jquery-jvectormap-2.0.5/jquery-jvectormap-2.0.5.min';
// // import './assets/jquery-jvectormap-2.0.5/jquery-jvectormap-kr-mill';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false
Vue.use(VueDarkMode);
Vue.use(VueTilt);
Vue.use(BootstrapVue);
Vue.use(JVectorMap);

new Vue({
  created() {
    AOS.init({duration: 1500});
  },
  render: h => h(App),
}).$mount('#app')

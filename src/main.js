import Vue from 'vue'
import App from './App.vue'
import VueDarkMode from "@growthbunker/vuedarkmode"

Vue.config.productionTip = false
Vue.use(VueDarkMode);

new Vue({
  render: h => h(App),
}).$mount('#app')

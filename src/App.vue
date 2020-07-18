<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <VirusIntro />
    <VirusSymptoms />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import VirusIntro from './components/VirusIntro.vue'
import VirusSymptoms from './components/VirusSymptoms.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    VirusIntro,
    VirusSymptoms
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body{
  background-color: #171E29;
}
</style>

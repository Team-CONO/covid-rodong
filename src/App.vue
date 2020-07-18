<template>
  <div id="app">
    <VirusIntro />
    <VirusSymptoms />
  </div>
</template>

<script>
import VirusIntro from './components/VirusIntro.vue'
import VirusSymptoms from './components/VirusSymptoms.vue'

export default {
  name: 'App',
  components: {
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

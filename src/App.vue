<template>
  <div id="app">
    <VirusIntro />
    <VirusSymptoms />
    <Guideline />
    <ThanksChallenge />
  </div>
</template>

<script>
import VirusIntro from './components/VirusIntro.vue'
import VirusSymptoms from './components/VirusSymptoms.vue'
import ThanksChallenge from './components/ThanksChallenge.vue'
import Guideline from "./components/Guideline";

export default {
  name: 'App',
  components: {
    VirusIntro,
    VirusSymptoms,
    ThanksChallenge,
    Guideline
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
  background-color: #18191A;
}
</style>

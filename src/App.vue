<template>
  <div id="app">
    <VirusIntro />
    <CovidTrigger />
    <VirusSymptoms />
    <MapView />
    <Guideline />
    <ThanksChallenge />
  </div>
</template>

<script>
import VirusIntro from './components/VirusIntro.vue'
import CovidTrigger from "./components/CovidTrigger";
import VirusSymptoms from './components/VirusSymptoms.vue'
import MapView from "./components/MapView";
import Guideline from "./components/Guideline";
import ThanksChallenge from './components/ThanksChallenge.vue'

export default {
  name: 'App',
  components: {
    VirusIntro,
    CovidTrigger,
    VirusSymptoms,
    MapView,
    Guideline,
    ThanksChallenge,
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
body {
  background-color: #18191A;
}

#world-map > div {
  max-height: 500px !important;
  height: 500px !important;
}
#world-map > div > svg {
  max-height: 500px !important;
  height: 500px !important;
}
</style>

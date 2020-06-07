<template>
  <div id="app" class="covid">
    <div class="intro">
        <h2>코로나 바이러스란?</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VirusIntro',
  props: {
    msg: String
  }
}
</script>

<style>
div.covid {
}
div.intro {
    background-image: url('../assets/covid.png');
    height: 500px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    vertical-align: middle;
    line-height: 500px;
}

div.intro h2 {
    text-align: center;
}
</style>

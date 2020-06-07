<template>
  <div id="app" class="covid">
    <div class="intro">
        <h2>코로나 바이러스란?</h2>
    </div>
    <div class="info">코로나바이러스과에 속하는 RNA 바이러스</div>
    <div class="info">사람과 동물의 호흡기와 소화기계 감염을 유발하며</div>
    <div class="info">점막전염 혹은 비말전파로 쉽게 전파된다</div>
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
div.info {
    text-align:center;
    color:white;
    margin-top: 50px;
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

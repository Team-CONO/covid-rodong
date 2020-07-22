<template>
  <div id="app" class="Trigger">
    <div class="part" data-aos="zoom-out">
      <h2 style="color:white">코로나 바이러스 시발점</h2>
    </div>
    <div  data-aos="zoom-in"  class="triggerimage">
    </div>
    <div data-aos="fade-right" class="trigger">SARS-CoV-2바이러스는 MERS-CoV 및 SARS-CoV와 같은 <span class="focus">베타코로나바이러스</span>입니다.
    <span data-aos="fade-right">이전의 두 바이러스는 모두 <span class="focus">박쥐</span>에서 기원했습니다.</span></div>
    <div data-aos="fade-up" class="trigger">박쥐의 코로나 바이러스와 기원이 알려지지 않은 코로나 바이러스 사이의 <span class="focus">재조합</span>에서 유래했을 것으로 <span class="focus">추측</span>되지만 아직 확인되지 않았습니다.</div>
    <div class="info"> </div>
  </div>
</template>

<script>
export default {
  name: 'CovidTrigger',
  props: {
    msg: String
  }
}
</script>

<style>
div.Trigger {
   margin-bottom: 200px;
}
span.focus {
    color: red;
    font-weight: bold;
}
div.trigger {
    text-align:center;
    color:white;
    margin-bottom: 30px
}
div.dump {
    height: 300px;
    line-height: 300px;
}
div.triggerimage {
    background-image: url('../assets/bat.png');
    height: 600px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    vertical-align: middle;
    line-height: 600px;
    margin-bottom: 30px;
}

div.intro h2 {
    text-align: center;
}
</style>

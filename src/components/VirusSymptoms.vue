<template>
  <article>
    <section id="left" data-aos="fade-down">
      <img class="img" src="../assets/icon-screening-cough.png" alt="a img">
      <p class="text">기침, 마른기침</p>
    </section>
    <section id="left" data-aos="fade-down">
      <img class="img" src="../assets/icon-screening-fever-chills.png" alt="b img">
      <p class="text">발열 또는 오한</p>
    </section>
    <section id="left" data-aos="fade-down">
      <img class="img" src="../assets/icon-screening-headache.png" alt="c img">
      <p class="text">두통</p>
    </section>
    <section id="left" data-aos='fade-up'>
      <img class="img" src="../assets/icon-screening-musclepain.png" alt="d img">
      <p class="text">근육통 또는 몸살</p>
    </section>
    <section id="left" data-aos='fade-up'>
      <img class="img" src="../assets/icon-screening-senses.png" alt="e img">
      <p class="text">미각 또는 후각 상실</p>
    </section>
    <section id="left" data-aos='fade-up'>
      <img class="img" src="../assets/icon-screening-sorethroat.png" alt="f img">
      <p class="text">목 아픔</p>
    </section>
  </article>
</template>

<style>
  #left {
    float: left;
    margin-left: 6rem;
  }
  #left .text {
    visibility: hidden;
  }
  #left .img {
    width: 500px; 
    height: 500px;
    opacity: 0.5;
  }
  #left:hover .img {
    opacity: 1.0;
  }
  #left:hover .text {
    visibility: visible;
  }
</style>
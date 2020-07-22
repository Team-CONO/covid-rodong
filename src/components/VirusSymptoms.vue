<template>
  <article id="app" class="container">
    <section class="part row" data-aos="fade-down">
      <div class="col-12 col-md-4">
        <img class ="img" src="../assets/icon-screening-cough.png" alt="Cough img">
        <p>기침, 마른기침</p>
      </div>
      <div class="col-12 col-md-4">
        <img src="../assets/icon-screening-fever-chills.png" alt="Feverr img">
        <p>발열 또는 오한</p>
      </div>
      <div class="col-12 col-md-4">
        <img src="../assets/icon-screening-headache.png" alt="Headache img">
        <p>두통</p>
      </div>
    </section>
    <section class="part row" data-aos="fade-up">
      <div class="col-12 col-md-4">
        <img src="../assets/icon-screening-musclepain.png" alt="Muscle or body aches img">
        <p>근육통 또는 몸살</p>
      </div>
      <div class="col-12 col-md-4">
        <img src="../assets/icon-screening-senses.png" alt="New loss of taste or smell img">
        <p>미각 또는 후각 상실</p>
      </div>
      <div class="col-12 col-md-4">
        <img src="../assets/icon-screening-sorethroat.png" alt="Sore throat img">
        <p>목 아픔</p>
      </div>
    </section>
  </article>
</template>

<style>
.part {
  /*display: inline-flex;*/
  margin-bottom: 5%;
}
.part img {
  width: 100%;
  opacity: 0.5;
}
.part:hover img {
  opacity: 1.0;
}
.part p {
  visibility: hidden;
  font-size: 2rem;
  color: white;
  margin: 10px;
}
.part:hover p {
  visibility: visible;
}
</style>
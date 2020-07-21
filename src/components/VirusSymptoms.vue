<template>
  <article id="app">
    <section class="part" data-aos="fade-down">
      <div>      
        <img class ="img" src="../assets/icon-screening-cough.png" alt="a img">
        <p>기침, 마른기침</p>
      </div>
      <div>
        <img src="../assets/icon-screening-fever-chills.png" alt="b img">
        <p>발열 또는 오한</p>
      </div>
      <div>
        <img src="../assets/icon-screening-headache.png" alt="c img">
        <p>두통</p>
      </div>
    </section>
    <section class="part" data-aos="fade-up">
      <div>
        <img src="../assets/icon-screening-musclepain.png" alt="d img">
        <p>근육통 또는 몸살</p>
      </div>
      <div>
        <img src="../assets/icon-screening-senses.png" alt="e img">
        <p>미각 또는 후각 상실</p>
      </div>
      <div>
        <img src="../assets/icon-screening-sorethroat.png" alt="f img">
        <p>목 아픔</p>
      </div>
    </section>
  </article>
</template>

<style>
.part {
  display: inline-flex;
  margin-bottom: 5%;
}
.part img {
  width: 500px;
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
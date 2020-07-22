<template>
    <div class="container">

        <div class="row" style="margin-bottom: 200px; margin-top: 200px" data-aos="fade-up">
            <div class="col-md-2">
            </div>
            <div class="col-12 col-md-8 text">
                <h2>코로나 예방 행동 수칙</h2>
            </div>
            <div class="col-md-2">
            </div>
        </div>

        <div class="row" style="margin-bottom: 200px" data-aos="fade-up">
            <div class="col-12 col-md-4 backImage peco">

            </div>
            <div class="col-12 col-md-8 text">
                <h4>마스크 꼭 착용하기</h4>
            </div>
        </div>
        <div class="row" style="margin-bottom: 200px" data-aos="fade-up">
            <div class="col-12 col-md-8 text">
                <h4>발열, 호흡기 증상이 나타날 시 외출자제 및 관할 보건소 문의하기</h4>
            </div>
            <div class="col-12 col-md-4 backImage kyaru">

            </div>
        </div>
        <div class="row" style="margin-bottom: 200px" data-aos="fade-up">
            <div class="col-12 col-md-4 backImage kokkoro">

            </div>
            <div class="col-12 col-md-8 text">
                <h4>흐르는 물에 비누로 꼼꼼하게 30초 손 씻기</h4>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Guideline"
    }
</script>

<style scoped>
    .backImage {
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        height: 350px;
    }

    .text {
        color: white;
        justify-content: center;
        align-items: center;
        display: inherit;
    }

    .backImage.peco {
        background-image: url("../assets/peco.png");
    }

    .backImage.kyaru {
        background-image: url("../assets/kyaru.png");
    }

    .backImage.kokkoro {
        background-image: url("../assets/kokkoro.png");
    }


</style>
<template>
    <div id="app">
        <div class="map-wrapper">
            <div id="world-map"></div>
        </div>
    </div>
</template>

<script>
    // https://github.com/jooeungen/coronaboard_kr/blob/master/kr_regional_daily.csv
    // https://jvectormap.com/maps/countries/south-korea/
    // https://smarttutorials.net/how-to-integrate-jvectormap-with-vuejs-using-vuecli-jquery/
    require('jvectormap');
    require('../assets/jquery-jvectormap-2.0.5/jquery-jvectormap-kr-mill');
    export default {
        name: "MapView",
        mounted() {
            $('#world-map').vectorMap({
                map: 'kr_mill'
            });
        }
    }
</script>

<style scoped>

</style>
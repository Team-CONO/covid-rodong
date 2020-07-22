<template>
    <div id="app">
        <div class="map-wrapper" style="height: 500px">
            <div id="world-map" style="height: 500px;"></div>
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
        data () {
            return {
            }
        },
        mounted() {
            this.$nextTick(this.initMap);
            this.getCovidData();
        },

        methods: {
            initMap: function() {
                $('#world-map').vectorMap({
                    map: 'kr_mill',
                });
                $('#world-map').vectorMap('get','mapObject').updateSize();
                $('#world-map').vectorMap('get','mapObject').updateSize();
                $('#world-map').vectorMap('get','mapObject').updateSize();
                $('#world-map').vectorMap('get','mapObject').updateSize();
                $('#world-map').vectorMap('get','mapObject').updateSize();
            },
          getCovidData: function () {
              $.ajax({
                  url: "https://raw.githubusercontent.com/jooeungen/coronaboard_kr/master/kr_regional_daily.csv",
              }).done((data) => {
                  console.log('data', data);
              });
          }
        }
    }
</script>

<style scoped>

</style>
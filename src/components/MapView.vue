<template>
    <div id="app" class="container">
        <div class="map-wrapper row" style="height: 500px">
            <div class="col-md-1"></div>
            <div id="world-map" class="col-12 col-md-10" style="height: 500px;"></div>
            <div class="col-md-1"></div>
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
                data: {},

                INDEX_DATE: 0,
                INDEX_REGION: 1,
                INDEX_CONFIRM: 2,
                INDEX_DEATH: 3,
                INDEX_RELEASED: 4
            }
        },
        mounted() {
            // this.$nextTick(this.initMap);
            this.initMap();
            this.getCovidData();
        },

        methods: {
            initMap: function() {
                $('#world-map').vectorMap({
                    map: 'kr_mill',
                });
                // $('#world-map').vectorMap('get','mapObject').updateSize();
                // $('#world-map').vectorMap('get','mapObject').updateSize();
                // $('#world-map').vectorMap('get','mapObject').updateSize();
                // $('#world-map').vectorMap('get','mapObject').updateSize();
                // $('#world-map').vectorMap('get','mapObject').updateSize();
            },
          getCovidData: function () {
              $.ajax({
                  url: "https://raw.githubusercontent.com/jooeungen/coronaboard_kr/master/kr_regional_daily.csv",
              }).done((data) => {
                  if (!data) {
                      return;
                  }
                  const splitedData = data.split('\n');
                  const splitedDataLen = splitedData.length;
                  const parsedData = splitedData.splice(1, splitedDataLen).map(i => i.split(','))
                  parsedData.forEach(i => {
                      if (i[this.INDEX_DATE] === '') {
                          return;
                      }
                      if (!this.data.hasOwnProperty(i[this.INDEX_DATE])) {
                          this.data[i[this.INDEX_DATE]] = {};
                      }
                      this.data[i[this.INDEX_DATE]][i[this.INDEX_REGION]] = {
                          date: i[this.INDEX_DATE],
                          region: i[this.INDEX_REGION],
                          confirm: Number(i[this.INDEX_CONFIRM]),
                          death: Number(i[this.INDEX_DEATH]),
                          released: Number(i[this.INDEX_RELEASED])
                      }
                  })
                  console.log('data', this.data);
              });
          }
        }
    }
</script>

<style scoped>
</style>
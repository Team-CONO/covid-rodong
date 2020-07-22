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
                INDEX_RELEASED: 4,

                REGIONS: {
                    '강원': 'KR-42',
                    '경기': 'KR-41',
                    '경남': 'KR-48',
                    '경북': 'KR-47',
                    '광주': 'KR-29',
                    '대구': 'KR-27',
                    '대전': 'KR-30',
                    '부산': 'KR-26',
                    '서울': 'KR-11',
                    '세종': 'KR-50',
                    '울산': 'KR-31',
                    '인천': 'KR-28',
                    '전남': 'KR-46',
                    '전북': 'KR-45',
                    '제주': 'KR-49',
                    '충남': 'KR-44',
                    '충북': 'KR-43'
                }
            }
        },
        mounted() {
            // this.$nextTick(this.initMap);
            this.initMap();
            this.getCovidData();
            this.setupColor();
        },

        methods: {
            initMap: function() {
                const vectorMap = $('#world-map').vectorMap({
                    map: 'kr_mill',
                    backgroundColor: 'none',
                    series: {
                        regions: [{
                            attribute: 'fill',
                            values: {
                                'KR-26': '#4E7387',
                                'KR-27': '#0071A4'
                            }
                        }]
                    },
                });
                // for (let index = 0; index < 17; index++) {
                //     vectorMap.series.regions[index].setValues(this.setupColor());
                // }
                console.log($('#world-map').vectorMap('get','mapObject'))

                // $('#world-map').vectorMap('get','mapObject').updateSize();
                // $('#world-map').vectorMap('get','mapObject').updateSize();
                // $('#world-map').vectorMap('get','mapObject').updateSize();
                // $('#world-map').vectorMap('get','mapObject').updateSize();
                // $('#world-map').vectorMap('get','mapObject').updateSize();
                this.getCovidData()
                    .then(data => {
                       console.log('promise data', data);
                       console.log('last key', this.getLastData(data));
                       const latestData = this.getLastData(data);
                       const regions = Object.keys(latestData);
                       const sortRegions = [];
                       regions.forEach(i => sortRegions.push(latestData[i]))
                        sortRegions.sort((a, b) => b.confirm - a.confirm);
                       sortRegions.map(item =>
                           item.code = this.REGIONS[item.region])
                       console.log('sorted', sortRegions);
                       const sortDict = {}
                       const palette = ['#ff0000', '#ff4000', '##ff8000', '#ffcccc','#ffbf00','#ffff00','#bfff00',
                           '#80ff00','#40ff00','#00ff00','#00ff40','#00ff80','#00ffbf','#0000ff','#0040ff','#0080ff','#00bfff','#00ffff'];
                       sortRegions.forEach((i, index) => {
                           // console.log('test', i, index)
                           sortDict[i.code || 'temp'] = palette[index]
                       })
                        console.log('sortDict',sortDict);
                        $('#world-map').vectorMap('get','mapObject').series.regions[0]
                            .setValues(sortDict)
                    });
            },
            getLastData: function(data) {
                const keys = Object.keys(data);
                return data[keys[keys.length - 1]];
            },
            getCovidData: function () {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: "https://raw.githubusercontent.com/jooeungen/coronaboard_kr/master/kr_regional_daily.csv",
                    }).done((data) => {
                        if (!data) {
                            reject(new Error('Failed to load data'))
                            return;
                        }
                        const resultData = {};
                        const splitedData = data.split('\n');
                        const splitedDataLen = splitedData.length;
                        const parsedData = splitedData.splice(1, splitedDataLen).map(i => i.split(','))
                        parsedData.forEach(i => {
                            if (i[this.INDEX_DATE] === '') {
                                return;
                            }
                            if (!resultData.hasOwnProperty(i[this.INDEX_DATE])) {
                                resultData[i[this.INDEX_DATE]] = {};
                            }
                            resultData[i[this.INDEX_DATE]][i[this.INDEX_REGION]] = {
                                date: i[this.INDEX_DATE],
                                region: i[this.INDEX_REGION],
                                confirm: Number(i[this.INDEX_CONFIRM]),
                                death: Number(i[this.INDEX_DEATH]),
                                released: Number(i[this.INDEX_RELEASED])
                            }
                        })
                        resolve(resultData);
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        reject(errorThrown);
                    });
                });

            },
            setupColor: function() {
                var palette = ['#ffcccc','#ffff00', '#ff9900', '#ff0000'];
                // var colors = {}, key;

                // for (key in this.getLastData) {
                //     colors[key] = palette[Math.floor(Math.random()*palette.length)];
                // }
                var color = palette[Math.floor(Math.random()*palette.length)];

                return color;
            }
        }
    }
</script>

<style scoped>
</style>
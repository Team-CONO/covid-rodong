<template>
    <div id="app" class="container">
        <div class="part" data-aos="flip-down">
            <h2 style="color:white">대한민국 코로나 바이러스 누적 현황</h2>
        </div>
        <div class="map-wrapper row" style="height: 500px" data-aos="zoom-in-down">
            <div class="col-md-1"></div>
            <div id="world-map" class="col-12 col-md-10" style="height: 500px;"></div>
        </div>
        <div class="row" data-aos="fade-up">
            <div class="col-12" style="text-align: right; color: white">
                색이 진한 곳일수록 확진자가 많이 나온 지역
            </div>
            <div class="col-12" style="text-align: right; color: white">
                마지막 갱신일
                {{covidDataLatestDate}}
            </div>
        </div>
        <div class="row" data-aos="fade-up">
            <div class="col-12" style="height: 15px">
                <span
                    style="display: inline-block; height: 100%; width: calc(100% / 18);"
                    v-for="color in palette"
                    v-bind:style="{backgroundColor: color}"></span>
            </div>
        </div>
    </div>
</template>

<script>
    // https://github.com/jooeungen/coronaboard_kr/blob/master/kr_regional_daily.csv
    // https://jvectormap.com/maps/countries/south-korea/
    // https://smarttutorials.net/how-to-integrate-jvectormap-with-vuejs-using-vuecli-jquery/
    import $ from 'jquery';
    require('jvectormap');
    require('../assets/jquery-jvectormap-2.0.5/jquery-jvectormap-kr-mill');

    export default {
        data() {
            return {
                data: {},
                covidDataLatestDate: '',

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
                },
                palette: [
                    '#800000',
                    '#A52A2A',
                    '#A0522D',
                    '#8B4513',
                    '#808000',
                    '#D2691E',
                    '#CD853F',
                    '#B8860B',
                    '#DAA520',
                    '#F4A460',
                    '#BC8F8F',
                    '#D2B48C',
                    '#DEB887',
                    '#F5DEB3',
                    '#FFDEAD',
                    '#FFE4C4',
                    '#FFEBCD',
                    '#FFF8DC'
                ]
            }
        },
        mounted() {
            this.initMap();
            this.getCovidData();
        },
        methods: {
            initMap: function () {
                $('#world-map').vectorMap({
                    map: 'kr_mill',
                    backgroundColor: 'none',
                    series: {
                        regions: [
                            {
                                attribute: 'fill'
                            }
                        ]
                    }
                });
                // console.log($('#world-map').vectorMap('get', 'mapObject'))

                this
                    .getCovidData()
                    .then(data => {
                        // console.log('promise data', data); console.log('last key',
                        // this.getLastData(data));
                        const latestData = this.getLastData(data);
                        this.covidDataLatestDate = this.getLastDate(data);
                        const regions = Object.keys(latestData);
                        const sortRegions = [];
                        regions.forEach(i => sortRegions.push(latestData[i]))
                        sortRegions.sort((a, b) => b.confirm - a.confirm);
                        sortRegions.map(item => item.code = this.REGIONS[item.region])
                        // console.log('sorted', sortRegions);

                        const sortDict = {}
                        // https://www.w3schools.com/colors/colors_groups.asp;
                        sortRegions.forEach((i, index) => {
                            // console.log('test', i, index)
                            sortDict[i.code || 'temp'] = this.palette[index]
                        })
                        // console.log('sortDict', sortDict);
                        $('#world-map')
                            .vectorMap('get', 'mapObject')
                            .series
                            .regions[0]
                            .setValues(sortDict)
                    });
            },
            getLastData: function (data) {
                return data[this.getLastDate(data)];
            },
            getLastDate: function (data) {
                const keys = Object.keys(data);
                return keys[keys.length - 1];
            },
            getCovidData: function () {
                return new Promise((resolve, reject) => {
                    $.ajax({
                            url: "https://raw.githubusercontent.com/jooeungen/coronaboard_kr/master/kr_regional_" +
                                    "daily.csv"
                        })
                        .done((data) => {
                            if (!data) {
                                reject(new Error('Failed to load data'))
                                return;
                            }
                            const resultData = {};
                            const splitedData = data.split('\n');
                            const splitedDataLen = splitedData.length;
                            const parsedData = splitedData
                                .splice(1, splitedDataLen)
                                .map(i => i.split(','))
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
                        })
                        .fail(function (jqXHR, textStatus, errorThrown) {
                            reject(errorThrown);
                        });
                });
            }
        }
    }
</script>
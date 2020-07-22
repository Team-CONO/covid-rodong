<template>
    <div id="app">
        <div class="map-wrapper">
            <div id="world-map"></div>
        </div>
    </div>
</template>

<script>
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
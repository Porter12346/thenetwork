<script setup>
import { computed, onMounted } from 'vue';
import { adsService } from '../services/AdsService.js';
import Pop from '../utils/Pop.js';
import { Ad } from '../models/Ad.js';
import { AppState } from '../AppState.js';

onMounted(() => getAds())
let ads = computed(() => AppState.Ads)



async function getAds() {
    try {
        await adsService.getAds()
    }
    catch (error) {
        Pop.error(error);
    }

}
</script>


<template>
    <div v-for="ad in ads" :key="ad.title" class="my-5">
        <img :src="ad.imgTallUrl" :alt="ad.title" class="img-fluid">
        </div>
</template>


<style lang="scss" scoped></style>
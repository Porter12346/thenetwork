<script setup>
import { Post } from '../models/Post.js';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';

const props = defineProps({
    currentPageProp: { type: Number, required: true},
    totalPagesProp: { type: Number, required: true}

})

async function nextPage() {
    try {
        await postsService.nextPage()
    }
    catch (error) {
        Pop.error(error);
    }
}

async function prevPage() {
    try {
        await postsService.prevPage()
    }
    catch (error) {
        Pop.error(error);
    }
}
</script>


<template>
    <div class="d-flex justify-content-between">
        <button v-if="currentPageProp > 1" @click="prevPage()" class="btn btn-primary">previous</button>
        <button v-else class="btn btn-primary disabled">previous</button>
        <p>{{ currentPageProp }} / {{ totalPagesProp }} </p>
        <button v-if="currentPageProp < totalPagesProp" @click="nextPage()" class="btn btn-primary">next</button>
        <button v-else class="btn btn-primary disabled">next</button>
    </div>
</template>


<style lang="scss" scoped></style>
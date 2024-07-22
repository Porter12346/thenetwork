<script setup>
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';

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
        <button @click="prevPage()" class="btn btn-primary">previous</button>
        <p>page num / max page </p>
        <button @click="nextPage()" class="btn btn-primary">next</button>
    </div>
</template>


<style lang="scss" scoped></style>
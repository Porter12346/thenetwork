<script setup>
import { Post } from '../models/Post.js';

const props= defineProps({
    postProp: {type: Post, required: true}
})
</script>


<template>
    <p>{{ postProp?.body }}</p>
</template>


<style lang="scss" scoped>

</style>
<script setup>
import { Post } from '../models/Post.js';

const props= defineProps({
    postProp: {type: Post, required: true}
})
</script>


<template>
    <p>post name</p>
</template>


<style lang="scss" scoped>

</style>
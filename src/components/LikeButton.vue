<script setup>
import { onMounted, onUpdated, ref } from 'vue';
import { Post } from '../models/Post.js';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';

const props = defineProps({
    postProp: { type: Post, required: true }
})


// onUpdated(() => {
//     checkLiked(props.postProp)
// })


function likePost() {
    postsService.likePost(props.postProp.id)
    // checkLiked(props.postProp)
}


// async function checkLiked(post) {
//     try {
//         await postsService.checkLiked(post)
//         if (props.postProp.liked) {
//             console.log(true);
//         }
//         else console.log(false);
//     }
//     catch (error) {
//         Pop.error(error);
//     }

// }
</script>


<template>
        <span v-if="postProp?.liked" @click="likePost()"><span>{{ postProp.likeIds.length }}</span><i type="button"
                class="mdi mdi-heart text-danger fs-1"></i></span>
        <span v-else @click="likePost()"><span> {{ postProp.likeIds.length }}</span><i type="button"
                class="mdi mdi-heart-outline fs-1"></i></span>
</template>


<style lang="scss" scoped></style>
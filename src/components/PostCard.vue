<script setup>
import { format } from 'timeago.js';
import { Post } from '../models/Post.js';
import { RouterLink } from 'vue-router';
import { Account } from '../models/Account.js';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';
import { onMounted, ref } from 'vue';

const props = defineProps({
    postProp: { type: Post, required: true },
    accountProp: { type: Account, required: true }
})

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
    <div class="col-8">
        <p></p>

    </div>
    <div class="card mb-3">
        <RouterLink :to="{ name: 'Profile', params: { profileId: postProp.creator.id } }">
            <div class="d-flex align-items-center mt-2">
                <img :src="postProp.creator.picture" :alt="postProp.creator.name" class="profile-img mx-2">
                <h2>{{ postProp.creator.name }}</h2>
            </div>
        </RouterLink>
        <p class="card-text">{{ postProp?.body }}</p>
        <p class="card-text"><small class="text-muted">Posted {{ format(postProp.createdAt) }}</small></p>
        <img v-if="postProp.imgUrl" :src="postProp.imgUrl" class="card-img-top" alt="post Image">
        <div class="card-body d-flex justify-content-end">
            <LikeButton :postProp='postProp' />
        </div>
    </div>

</template>


<style lang="scss" scoped>
.card-img-top {
    max-height: 40vh;
}

.profile-img {
    height: 8vh;
    width: 8vh;
    aspect-ratio: 1/1;
    border-radius: 50%;
    object-fit: cover;
}
</style>
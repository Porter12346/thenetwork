<script setup>
import { computed, onMounted } from 'vue';
import { profilesService } from '../services/ProfilesService.js';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';

const route = useRoute()
const profile = computed(() => AppState.activeProfile)
const account = computed(() => AppState.account)
const posts = computed(() => AppState.activePosts)

onMounted(() => {getProfileById(); getPostsById()})

async function getProfileById() {
    try {
        await profilesService.getProfileById(route.params.profileId)
    }
    catch (error) {
        Pop.error(error);
    }

}

async function getPostsById() {
    try {
        await postsService.getPostsById(route.params.profileId)
    }
    catch (error) {
        Pop.error(error);
    }
}
</script>


<template>
    <ProfileCard :profileProp="profile" />
    <div class="container">
        <div v-for="post in posts" :key="post.id" class="row mx-1">
            <PostCard :postProp="post" />
        </div>
    </div>
</template>


<style lang="scss" scoped>
.cover-img {
    height: 35vh;
    width: 100%;
}

.text-shadow {
    text-shadow: 1px 1px 3px black;
}

.profile-bg {
    background-color: rgba(0, 0, 0, 0.216);
    width: 70%
}

.profile-pic {
    height: 30vh;
    width: 50%;
    aspect-ratio: 1/1;
}

.col-12 {
    margin-top: -25vh;
}
</style>
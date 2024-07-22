<script setup>
import { computed, onBeforeUnmount, onMounted, watchEffect } from 'vue';
import { profilesService } from '../services/ProfilesService.js';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import AccountFormModal from '../components/AccountFormModal.vue';
import { accountService } from '../services/AccountService.js';

const route = useRoute()
const profile = computed(() => AppState.activeProfile)
const account = computed(() => AppState.account)
const posts = computed(() => AppState.activePosts)
const currentPage = computed(() => AppState.currentPage)
const totalPages = computed(() => AppState.totalPages)

onMounted(() => {
    setPage()
    getProfileById();
    getPostsById()
    setInterval(getPostsById, 5000)
})

onBeforeUnmount(() => {
    prepareUnload()
})

async function getProfileById() {
    try {
        await profilesService.getProfileById(route.params.profileId)
    }
    catch (error) {
        Pop.error(error);
    }

}

watchEffect(() => {
    getProfileById() // pass down the id from the URL as an argument
    getPostsById()
})

async function getPostsById() {
    try {
        if (route.path != '/')
            await postsService.getPostsById(route.params.profileId, currentPage)
    }
    catch (error) {
        Pop.error(error);
    }
}

function prepareUnload() {
    postsService.prepareUnload()
}




function setPage() {
    postsService.setPage()
}
</script>


<template>
    <ProfileCard :profileProp="profile" :accountProp="account" />
    <PostForm v-if="account?.id == profile?.id" :accountProp="profile" />
    <div class="container">
        <div v-for="post in posts" :key="post.id" class="row mx-1">
            <PostCard :postProp="post" :accountProp="account" />
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Edit account data</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <AccountFormModal />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                </div>
            </div>
        </div>
    </div>
    <PageButtons />
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
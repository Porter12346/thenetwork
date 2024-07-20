<script setup>
import { computed, onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import { useRoute } from 'vue-router';

const posts = computed(() =>
  AppState.activePosts
)

const account = computed(() =>
  AppState.account
)

let route = useRoute()

onMounted(() => {
  getPosts()
  setInterval(getPosts, 5000)
})

onBeforeMount(()=>{
  prepareUnload()
})

function getLiked() {
  try {
    if (account.value) {
      postsService.getLiked(account.value.id)
    }
  }
  catch (error) {
    Pop.error(error)
  }
}

async function getPosts() {
  try {
    if (route.path == '/') {
      await postsService.getPosts()
      getLiked()
    }
  } catch (error) {
    Pop.error(error)
  }
}

function prepareUnload() {
    postsService.prepareUnload()
}

</script>

<template>
  <div v-if="account">
    <PostForm :accountProp="account" />
  </div>
  <div v-for="post in posts" :key="post.id" class="row mx-1">
    <PostCard :postProp="post" :accountProp="account" />
  </div>
</template>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }


}
</style>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';

const posts = computed(() =>
  AppState.activePosts
)

const account = computed(() =>
  AppState.account
)



onMounted(() => {
  getPosts()
  setInterval(getPosts, 10000)
})

async function getPosts() {
  try {
    await postsService.getPosts()
  } catch (error) {
    Pop.error(error)
  }
}



</script>

<template>
  <div v-if="account">
  <PostForm :accountProp="account" />
</div>
  <div v-for="post in posts" :key="post.id" class="row mx-1">
    <PostCard :postProp="post" />
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

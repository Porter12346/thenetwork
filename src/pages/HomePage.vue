<script setup>
import { computed, onMounted } from 'vue';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';

const posts = computed(() => 
  AppState.activePosts
)

onMounted(() => {
  getPosts()
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
  <div class="container-fluid">
    <div class="row">
      <div class="col-2 bg-body-secondary"></div>
      <div class="col-10 d-flex justify-content-between bg-primary-subtle p-1">
        <h1>Network</h1>
        <input type="text" class="m-2">
      </div>
    </div>
    <div class="row">
      <div class="col-2 bg-body-secondary">
        <p>profile info here</p>
      </div>
      <div class="col-8">
        <div v-for="post in posts" :key="post.id" class="row">
          <PostCard :postProp="post"/>
        </div>
      </div>
      <div class="col-2">
        ads go here 🤮
      </div>
    </div>
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

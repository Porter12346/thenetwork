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

const editablePostData = ref({
  body: '',
  imgUrl: '',
})

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

async function makePost() {
  try {
    console.log(editablePostData.value);
    await postsService.makePost(editablePostData.value)
  }
  catch (error) {
    Pop.error(error);
  }
}

</script>

<template>


  <form @submit.prevent="makePost()" class="card my-3 d-flex">
    <div class="container-fluid">
      <div class="row">
        <div class="col-1">
          <img :src="account.picture" :alt="account.name" class="profile-img m-2">
        </div>
        <div class="col-11">
          <textarea v-model="editablePostData.body" class="form-control m-2" id="exampleFormControlTextarea1" rows="3" style="resize: none"
            placeholder="Post body"></textarea>
        </div>
      </div>
      <div class="row">
        <div class="col-1"></div>
        <div class="col-9">
          <input v-model="editablePostData.imgUrl" type="url" class="form-control m-2" id="exampleFormControlInput1" placeholder="Image Url">
        </div>
        <div class="col-2">
          <button class="btn btn-primary m-2 px-4">Submit</button>
        </div>
      </div>
    </div>

  </form>
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

.profile-img {
  height: 8vh;
  width: 8vh;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
}
</style>

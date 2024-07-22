<script setup>
import { RouterLink } from 'vue-router';
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import { computed, ref } from 'vue';
import { postsService } from './services/PostsService.js';

const editableQuery = ref({
  query: ''
})


async function updateQuery() {
  postsService.updateQuery(editableQuery.value.query)
}

</script>

<template>

  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-2 bg-body-secondary"></div>
        <div class="col-10 d-flex justify-content-between bg-primary-subtle p-1">
          <RouterLink :to="{ name: 'Home' }">
            <h1>Network</h1>
          </RouterLink>
          <div>
          <form @submit.prevent="updateQuery()" class="input-group my-2">
            <input v-model="editableQuery.query" type="text" class="form-control" placeholder="Search"
              aria-label="Search Bar" aria-describedby="button-addon2">
            <button class="btn btn-outline-secondary" type="submit" id="button-addon2">submit</button>
          </form>
        </div>
        </div>
      </div>
      <div class="row">
        <div class="col-2 bg-body-secondary">
          <Login />
        </div>
        <div class="col-8">
          <router-view />
        </div>
        <div class="col-2">

          <Ad />
        </div>

      </div>
    </div>
    <!-- <router-view /> -->
  </main>
</template>

<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>

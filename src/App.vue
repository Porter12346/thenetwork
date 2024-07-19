<script setup>
import { RouterLink } from 'vue-router';
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'


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
          <input type="text" class="m-2">
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
          ads go here 🤮
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

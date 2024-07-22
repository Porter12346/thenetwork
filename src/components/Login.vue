<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState';
import { AuthService } from '../services/AuthService';

const identity = computed(() => AppState.identity)
const account = computed(() => AppState.account)
async function login() {
  AuthService.loginWithPopup()
}
async function logout() {
  AuthService.logout()
}

</script>

<template>
  <span class="navbar-text">
    <button class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0" @click="login" v-if="!identity">
      Login
    </button>
    <div v-else class="d-flex align-items-center justify-content-center flex-column">
      <RouterLink v-if="account" :to="{ name: 'Profile', params: { profileId: account.id } }">
        <img :src="account?.picture" :alt="account?.name" class="profile-img">
        <i v-if="account?.graduated" class="mdi mdi-school"></i>
        <h4>{{ account?.class }}</h4>
        <h1 class="text-center">{{ account?.name }}</h1>
      </RouterLink>
      <a v-if="account?.github" :href="account?.github" target="_blank">
        <i class="mdi mdi-github fs-2"></i>
      </a>
      <a v-if="account?.linkedin" :href="account?.linkedin" target="_blank">
        <i class="mdi mdi-linkedin fs-2"></i>
      </a>
      <button @click="logout" class="btn btn-danger mt-5"><i class="mdi mdi-logout"></i></button>
    </div>
  </span>
</template>

<style lang="scss" scoped>
.profile-img {
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
  width: 100%
}
</style>

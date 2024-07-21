<script setup>
import { Account } from '../models/Account.js';

const props = defineProps({
    profileProp: { type: Account, required: true },
    accountProp: { type: Account, required: true }
})
</script>


<template>

    <div class="col-8">
        <p></p>

    </div>
    <div v-if="profileProp?.id" class="card mb-3">
        <img :src="profileProp.coverImg" :alt="profileProp.name" class="img-fluid cover-img">

        <div class="d-flex align-items-center justify-content-between mt-2">
            <div>
                <img :src="profileProp.picture" :alt="profileProp.name" class="profile-img mx-2">
                <button v-if="profileProp?.id == accountProp?.id" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i  class="mdi mdi-pencil fs-6"></i>
                </button>

            </div>
            <div class="fs-1">
                <i v-if="profileProp.github" class="mdi mdi-github m-3"></i>
                <i v-if="profileProp.linkedin" class="mdi mdi-linkedin m-3"></i>
            </div>
        </div>
        <div class="mx-3 my-2">
            <h5 class="m-0 text-black-50">{{ profileProp.class }}</h5>
            <h2 class="m-0">{{ profileProp.name }}</h2>
        </div>
        <p class="card-text m-3">{{ profileProp.bio }}</p>
    </div>
</template>


<style lang="scss" scoped>
.profile-img {
    height: 32vh;
    width: 32vh;
    aspect-ratio: 1/1;
    border-radius: 50%;
    object-fit: cover;
    margin-top: -15vh
}

.cover-img {
    max-height: 30vh;


}
</style>
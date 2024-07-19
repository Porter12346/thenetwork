<script setup>
import { ref } from 'vue';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';
import { Account } from '../models/Account.js';


const props = defineProps({
    accountProp: { type: Account, required: true }
})

async function makePost() {
    try {
        console.log(editablePostData.value);
        await postsService.makePost(editablePostData.value)
        editablePostData.value = {body: '', imgUrl: ''}
    }
    catch (error) {
        Pop.error(error);
    }
}

const editablePostData = ref({
    body: '',
    imgUrl: '',
})

</script>


<template>
    <form @submit.prevent="makePost()" class="card my-3 d-flex">
        <div class="container-fluid">
            <div class="row">
                <div class="col-1">
                    <img :src="accountProp.picture" :alt="accountProp.name" class="profile-img m-2">
                </div>
                <div class="col-11">
                    <textarea v-model="editablePostData.body" class="form-control m-2" id="exampleFormControlTextarea1"
                        rows="3" style="resize: none" placeholder="Post body"></textarea>
                </div>
            </div>
            <div class="row">
                <div class="col-1"></div>
                <div class="col-9">
                    <input v-model="editablePostData.imgUrl" type="url" class="form-control m-2"
                        id="exampleFormControlInput1" placeholder="Image Url">
                </div>
                <div class="col-2">
                    <button class="btn btn-primary m-2 px-4">Submit</button>
                </div>
            </div>
        </div>
    </form>
</template>


<style lang="scss" scoped>
.profile-img {
    height: 8vh;
    width: 8vh;
    aspect-ratio: 1/1;
    border-radius: 50%;
    object-fit: cover;
}
</style>
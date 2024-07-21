<script setup>
import { ref } from 'vue';
import { accountService } from '../services/AccountService.js';
import Pop from '../utils/Pop.js';


const editableAccountData = ref({
    name: '',
    picture: '',
    coverImg: '',
    linkedin: '',
    bio: '',
    graduated: false
})

async function updateProfile() {
    try {
        accountService.updateAccount(editableAccountData)
    }
    catch (error) {
        Pop.error(error);
    }
}


</script>


<template>
    <form @submit.prevent="updateProfile()">
    <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input v-model="editableAccountData.name" type="text" class="form-control" id="name" required maxlength="100">
    </div>
    <div class="mb-3">
        <label for="picture" class="form-label">Picture</label>
        <input v-model="editableAccountData.picture" type="url" class="form-control" id="picture" required
            maxlength="500">
    </div>
    <div class="mb-3">
        <label for="coverImg" class="form-label">CoverImg</label>
        <input v-model="editableAccountData.coverImg" type="url" class="form-control" id="coverImg" maxlength="500">
    </div>
    <div class="mb-3">
        <label for="linkedin" class="form-label">Linkedin</label>
        <input v-model="editableAccountData.linkedin" type="url" class="form-control" id="linkedin" maxlength="500">
    </div>

    <div class="mb-3">
        <label for="bio" class="form-label">Bio</label>
        <textarea v-model="editableAccountData.bio" class="form-control" id="bio" rows="3" maxlength="1000"></textarea>
    </div>

    <div class="mb-3 form-check">
        <input v-model="editableAccountData.graduated" type="checkbox" class="form-check-input" id="graduated">
        <label class="form-check-label" for="graduated">Graduated?</label>
    </div>
    <button type="submit" class="btn btn-primary">Save changes</button>
    </form>
</template>


<style lang="scss" scoped></style>
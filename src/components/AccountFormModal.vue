<script setup>
import { ref } from 'vue';
import { accountService } from '../services/AccountService.js';
import Pop from '../utils/Pop.js';
import { profilesService } from '../services/ProfilesService.js';
import { useRoute } from 'vue-router';
import { Account } from '../models/Account.js';
import ProfilePage from '../pages/ProfilePage.vue';

const route = useRoute()

const props = defineProps({
    profileProp: { type: Account, required: true }
})

const editableAccountData = ref({
    name: props.profileProp.name,
    picture: props.profileProp.picture,
    coverImg: props.profileProp.coverImg,
    linkedin: props.profileProp.linkedin,
    github: props.profileProp.github,
    bio: props.profileProp.bio,
    class: props.profileProp.class,
    graduated: false
})

async function updateProfile() {
    try {
        await accountService.updateAccount(editableAccountData)
        await profilesService.getProfileById(route.params.profileId)
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
        <label for="github" class="form-label">github</label>
        <input v-model="editableAccountData.github" type="url" class="form-control" id="github" maxlength="500">
    </div>
    <div class="mb-3">
        <label for="bio" class="form-label">Bio</label>
        <textarea v-model="editableAccountData.bio" class="form-control" id="bio" rows="3" maxlength="1000"></textarea>
    </div>

    <div class="mb-3">
        <label for="class" class="form-label">class</label>
        <input v-model="editableAccountData.class" class="form-control" id="class" maxlength="1000">
    </div>

    <div class="mb-3 form-check">
        <input v-model="editableAccountData.graduated" type="checkbox" class="form-check-input" id="graduated">
        <label class="form-check-label" for="graduated">Graduated?</label>
    </div>

    <button type="submit" class="btn btn-primary">Save changes</button>
    </form>
</template>


<style lang="scss" scoped></style>
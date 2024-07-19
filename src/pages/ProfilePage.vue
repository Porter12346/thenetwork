<script setup>
import { computed, onMounted } from 'vue';
import { profilesService } from '../services/ProfilesService.js';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';

const route = useRoute()
const profile = computed(() => AppState.activeProfile)
const profileCoverImg = computed(() => `url(${profile.value?.coverImg})`)

onMounted(() => getProfileById())

async function getProfileById() {
    try {
        await profilesService.getProfileById(route.params.profileId)
    }
    catch (error) {
        Pop.error(error);
    }

}
</script>


<template>
    <div class="container cover-img">
        <div class="row profile-bg">
            <div class="col-12">
                <div class="m-5 d-flex flex-column">
                    <img :src="profile?.picture" :alt="profile?.name">
                    <h1 class="text-center text-light text-shadow">{{ profile?.name }}</h1>
                    <p>{{ profile?.class }}</p>
                    <p>{{ profile?.bio }}</p>
                    <h4 v-if="profile?.github"><i class="mdi mdi-github"></i>{{ profile.github }}</h4>
                    <h4 v-if="profile?.linkedin" class="mb-5"><i class="mdi mdi-linkedin"></i>{{ profile.github }}</h4>
                    <button class="btn btn-outline-primary">Edit</button>
                </div>

            </div>
        </div>
    </div>

</template>


<style lang="scss" scoped>
.cover-img {
    height: 60vh;
    background-image: v-bind(profileCoverImg);
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.text-shadow {
    text-shadow: 1px 1px 3px black;
}

.profile-bg {
    background-color: rgba(0, 0, 0, 0.595);
}
</style>
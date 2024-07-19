import { AppState } from "../AppState.js"
import { Account } from "../models/Account.js"
import { api } from "./AxiosService.js"

class ProfilesService{

    async getProfileById(profileId) {
        const response = await api.get(`api/profiles/${profileId}`)
        const profile = new Account(response.data)
        console.log(profile);
        AppState.activeProfile = profile
    }

}
export const profilesService = new ProfilesService()
import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { api } from "./AxiosService.js"

class PostsService {

    async getPostsById(profileId) {
        AppState.activePosts = null
        const response = await api.get(`api/posts?creatorId=${profileId}`)
        const posts = response.data.posts.map((postData) => new Post(postData))
        AppState.activePosts = posts
    }

    async makePost(editablePostData) {
        console.log(editablePostData);
        const response = await api.post('api/posts', editablePostData)
        console.log(response);
    }

    async getPosts() {
        const response = await api.get('api/posts')
        let posts = response.data.posts.map((postData) => new Post(postData))
        AppState.activePosts = posts
        console.log(AppState.activePosts);
    }

}
export const postsService = new PostsService()
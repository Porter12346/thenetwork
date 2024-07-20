import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { api } from "./AxiosService.js"

class PostsService {

    prepareUnload() {
        AppState.activePosts = null
    }

    getLiked(id, posts) {
        console.log(posts);
        if (posts) {
            posts.forEach((post) => {
                post.likeIds.forEach(like => {
                    if (like == id) {
                        post.liked = true
                    }
                })
            })
        }
    }

    async likePost(id) {
        if (AppState.account) {
            let response = await api.post(`api/posts/${id}/like`)
            let editPost = AppState.activePosts.find((post) => post.id == id)
            editPost.liked = !editPost.liked
            console.log(response);
        }
    }

    async getPostsById(profileId) {
        // AppState.activePosts = null
        const response = await api.get(`api/posts?creatorId=${profileId}`)
        const posts = response.data.posts.map((postData) => new Post(postData))
        if (AppState.account) { this.getLiked(AppState.account.id, posts) }
        AppState.activePosts = posts
    }

    async makePost(editablePostData) {
        console.log(editablePostData);
        const response = await api.post('api/posts', editablePostData)
        console.log(response);
    }

    async getPosts() {
        const response = await api.get('api/posts')
        let posts = response.data.posts.map((postData) => new Post(postData, AppState?.account?.id))
        console.log(posts);
        if (AppState.account) { this.getLiked(AppState.account.id, posts) }
        AppState.activePosts = posts
        console.log(AppState.activePosts);
    }

}
export const postsService = new PostsService()
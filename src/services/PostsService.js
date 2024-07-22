import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { api } from "./AxiosService.js"

class PostsService {

    updateQuery(query) {
        AppState.activePosts = null
        AppState.query = query
    }
    prevPage() {
        AppState.activePosts = null
        AppState.currentPage--
    }
    nextPage() {
        AppState.activePosts = null
        AppState.currentPage++
    }

    setPage() {
        AppState.currentPage = 1
    }

    deletePost(id) {
        api.delete(`api/posts/${id}`)
    }

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

    async getPostsById(profileId, page) {
        // AppState.activePosts = null
        const response = await api.get(`api/posts?page=${page.value}&creatorId=${profileId}&query=${AppState.query}`)
        const posts = response.data.posts.map((postData) => new Post(postData))
        if (AppState.account) { this.getLiked(AppState.account.id, posts) }
        AppState.activePosts = posts
        AppState.totalPages = response.data.totalPages
    }

    async makePost(editablePostData) {
        console.log(editablePostData);
        const response = await api.post(`api/posts`, editablePostData)
        console.log(response);
    }

    async getPosts(page) {
        const response = await api.get(`api/posts?page=${page.value}&query=${AppState.query}`)
        let posts = response.data.posts.map((postData) => new Post(postData, AppState?.account?.id))
        console.log(posts);
        if (AppState.account) { this.getLiked(AppState.account.id, posts) }
        AppState.activePosts = posts
        console.log(AppState.activePosts);
        AppState.totalPages = response.data.totalPages
    }

}
export const postsService = new PostsService()
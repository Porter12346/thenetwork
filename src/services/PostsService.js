import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { api } from "./AxiosService.js"

class PostsService{

  async getPosts() {
    const response = await api.get('api/posts')
    let posts = response.data.posts.map((postData)=>new Post(postData))
    AppState.activePosts = posts
    console.log(AppState.activePosts);
  }

}
export const postsService = new PostsService()
export class Post{
    constructor(data, accountId){
        this.id = data._id
        this.body =  data.body
        this.imgUrl =  data.imgUrl
        this.creator =  data.creator
        this.likes =  data.likes
        this.createdAt =  new Date(data.createdAt)
        this.likeIds =  data.likeIds
        this.updatedAt =  new Date(data.updatedAt)
        this.liked = false
        // this.likeIds.forEach(like => {
        //     if(like == accountId)this.liked=true
        // });
        
    }
}

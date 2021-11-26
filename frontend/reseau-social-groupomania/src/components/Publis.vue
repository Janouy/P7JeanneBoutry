<template>
    <div>
        <div class="card border-info my-3 mx-5" v-if="text">
            <div class="card-text border" v-if="text"> 
                {{name}} a publié: 
            </div>
            <div :id="'post'+ postId" :class="'card-text border' + ' ' +name" v-if="text">
                {{text}}
                    <div>
                        <button :id="'like'+postId" type="submit" @click="liked(userIdLike), likePost(postId)" class="btn" :disabled ="disabledLike(userIdDislike)"><font-awesome-icon icon="thumbs-up"/><span>{{likes}}{{updatedLikes}}</span></button>
                        <button @click="incrementLike">like</button>
                        <button :id="'unlike'+postId" type="submit" @click="unliked(userIdDislike), likePost(postId)" class="btn" :disabled ="disabledUnlike(userIdLike)"><font-awesome-icon icon="thumbs-down"/><span>{{dislikes}}</span></button>
                    </div>
                      <Comments 
                        v-for= "comment in comments" 
                        :commentId= "comment.commentId"
                        :comment= "comment.comment"
                        :userId= "comment.userId"
                        :idPost = "comment.idPost"
                        :name= "comment.name"
                        :postId = "postId"
                        @dropComment = "deleteComment"
                        :key= "comment.id"
                      /> 
                <div  class="card-text"> 
                    <input v-model="comment" :id="'post' + postId" type="textarea" class="form-control" placeholder="Ajoutez un commentaire..." > 
                    <button type="submit" @click="addComment(postId, comment)" class="card-btn" > Ajouter un commentaire</button>
                </div>
            </div>
        </div>
        <div class="card border-primary my-3 mx-5" v-if="media">
            <div class="card-text border" v-if="media"> 
                {{name}} a publié:
            </div>
            <div :class="'card-img border' + ' ' +name" v-if="media">
                <img class="publication_image" :src=media>
                <div>
                    <button :id="'like'+postId" type="submit" @click="liked(userIdLike), likePost(postId)" class="btn" :disabled ="disabledLike(userIdDislike)"><font-awesome-icon icon="thumbs-up"/><span>{{likes}}</span></button>
                    <button :id="'unlike'+postId" type="submit" @click="unliked(userIdDislike), likePost(postId)" class="btn" :disabled ="disabledUnlike(userIdLike)"><font-awesome-icon icon="thumbs-down"/><span>{{dislikes}}</span></button>
                </div>
                    <Comments 
                        v-for="comment in comments" 
                        :commentId= "comment.commentId"
                        :comment= "comment.comment"
                        :userId= "comment.userId"
                        :idPost= "comment.idPost"
                        :name= "comment.name"
                        :postId = "postId"
                        @dropComment = "deleteComment"
                        :key= "comment.id"
                    /> 
                <div class="card-text"> <input v-model="comment" :id="'post' + postId" type="textarea" class="form-control" placeholder="Ajoutez un commentaire..." > 
                    <button type="submit" @click="addComment(postId, comment)" class="card-btn"> Ajouter un commentaire</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Comments from "../components/Comments"
import { mapState } from 'vuex'
export default{
    name: "Publis",
    components:{
        Comments,
    },
    props:{
        name: String,
        text: String,
        media: String,
        postId: Number,
        likes: Number,
        dislikes: Number,
        userIdDislike: Array,
        userIdLike: Array,
    },
    data: function(){
        return{
            comments:[
                {thisUserId: localStorage.getItem("userId")}
            ],
            comment:'',
            like: 0,
        }
    }, 
     computed:{
         ...mapState(['updatedLikes'])
    },
    methods: {
        incrementLike() {
            this.$store.commit("INCREMENT_LIKE", this.likes)
        },
        addComment(postId, comment) {
			this.$emit("sendComment", postId,comment)
		},
        recoverComments: function(){
            let url = "http://localhost:3000/api/comments";
            fetch(url,{
                method: "GET",
                headers: { "Content-Type": "application/json"},
            })
            .then(async res => {
                const data = await res.json();
                if (!res.ok) {
                    const error = (data && data.message) || res.statusText;
                    return Promise.reject(error);
                }
                for (let i=0; i<data.data.length; i++){
                    this.comments.push({userId: data.data[i].id_user, idPost: data.data[i].id_post , comment :data.data[i].comment, name :data.data[i].firstName + ' ' + data.data[i].lastName + ' ' + 'a commenté:', commentId: data.data[i].id_comment}) 
                } 
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
            });
        },
        deleteComment: function(e){
            localStorage.setItem("commentId", e)
            let commentId = localStorage.getItem('commentId');
            let url = "http://localhost:3000/api/comments/" + commentId;
            fetch(url,{
                method: "delete",
                headers: {"Content-Type": "application/json", Authorization: "Bearer " + localStorage.getItem("token")}
            })
            .then(async res => {
                const data = await res.json();
                if (!res.ok) {
                    const error = (data && data.message) || res.statusText;
                    return Promise.reject(error);
                }
                alert("Votre commentaire a bien été supprimé.");
                location.reload();
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
            }); 
        },
        liked: function(e){
            let userId = localStorage.getItem('userId');
            if(e.includes(userId)){
                this.like = 0
                }else if (!e.includes(userId)){
                    this.like += 1
                }
        },
        unliked: function(e){
            let userId = localStorage.getItem('userId');
            if(e.includes(userId)){
                this.like = 0
                }else if (!e.includes(userId)){
                    this.like += -1
                }
        },
        likePost: function(e){
            const userId = localStorage.getItem('userId');
            localStorage.setItem("postId", e);
            let postId = localStorage.getItem("postId");
            let url = "http://localhost:3000/api/texts/" + postId;
            fetch(url,{
                method: "POST",
                headers: {"Content-Type": "application/json",Authorization: "Bearer " + localStorage.getItem("token") },
                body: JSON.stringify({ 
                like: this.like,
                userId: userId,
                })
            })
            .then(async res => {
                const data = await res.json();
                if (!res.ok) {
                    const error = (data && data.message) || res.statusText;
                    return Promise.reject(error);
                }
            let url = "http://localhost:3000/api/texts";
            fetch(url,{
                method: "GET",
                headers: { "Content-Type": "application/json"},
            })
            .then(async res => {
                const data = await res.json();
                if (!res.ok) {
                    const error = (data && data.message) || res.statusText;
                    return Promise.reject(error);
                }
                console.log(this.likes)
                for (let i=0; i<data.data.length; i++){
                    this.thatLike = data.data[i].likes
                } 
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
            })
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
            }); 
        },
        disabledLike: function(e){
            let userId = localStorage.getItem('userId');
            if(e.includes(userId)){
                return true;
            }else{
                return false;
            }
        },
        disabledUnlike: function(e){
            let userId = localStorage.getItem('userId');
            if(e.includes(userId)){
                return true;
            }else{
                return false;
            }
        },
    },
    created(){
            this.recoverComments()
        },
}
</script>
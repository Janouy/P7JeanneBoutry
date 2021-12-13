<template>
    <div class="col-12">
        <div class="card my-3 bg-secondary" v-if="text">
            <div class="card-text bg-light pt-2 mt-2 mx-2 rounded-top text-left" v-if="text"> 
                <div v-if="picture =='NULL' || !picture"><img class="pict mt-2" src="../assets/logos/user.png"/></div>
                <div class="pict" v-else :style="{backgroundImage: `url(${picture})`}"></div>
                {{name}}
            </div>
            <div :id="'post'+ postId" :class="'bg-light mx-2 mb-2 rounded-bottom card-text' + ' ' +name" v-if="text">
                {{text}}
                    <div class="my-2">
                        <button :id="'like'+postId" type="submit" @click="liked(userIdLike), likePost(postId)" class="btn" :disabled ="disabledLike(userIdDislike)"><font-awesome-icon icon="thumbs-up"/><span>{{likes}}</span></button>
                        <button :id="'unlike'+postId" type="submit" @click="unliked(userIdDislike), likePost(postId)" class="btn" :disabled ="disabledUnlike(userIdLike)"><font-awesome-icon icon="thumbs-down"/><span>{{dislikes}}</span></button>
                    </div>
                      <Comments 
                        v-for= "comment in comms" 
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
                    <button @click="deletePost(postId)" :id="postId" class="card-btn rounded mb-2" v-if="userId == comments[0].thisUserId || admin==1"> <font-awesome-icon icon="times-circle" alt='suppression de la photo' aria-hidden="true" title="supprimer cette publication"/></button>
                    <input v-model="comment" :id="'post' + postId" type="textarea" maxlength="120" class="form-control" placeholder="Ajoutez un commentaire..." > 
                    <button type="submit" @click="addComment(postId, comment)" class="card-btn rounded mx-1 my-1" >Commentez</button>
                </div>
            </div>
        </div>
        <div class="card bg-secondary my-3" v-if="media">
            <div class="card-text bg-light pt-2 mt-2 mx-2 rounded-top text-left" v-if="media"> 
                <div v-if="picture =='NULL' || !picture"><img class="pict mt-2" src="../assets/logos/user.png"/></div>
                <div class="pict" v-else :style="{backgroundImage: `url(${picture})`}"></div>
                {{name}}
            </div>
            <div :class="' bg-light border-success rounded-bottom mx-2 mb-2' + ' ' +name" v-if="media">
                <img class="publication_image rounded mt-3" :src=media>
                <div class="my-2">
                    <button :id="'like'+postId" type="submit" @click="liked(userIdLike), likePost(postId)" class="btn" :disabled ="disabledLike(userIdDislike)"><font-awesome-icon icon="thumbs-up"/><span>{{likes}}</span></button>
                    <button :id="'unlike'+postId" type="submit" @click="unliked(userIdDislike), likePost(postId)" class="btn" :disabled ="disabledUnlike(userIdLike)"><font-awesome-icon icon="thumbs-down"/><span>{{dislikes}}</span></button>
                </div>
                <div class="card-text"> 
                    <button @click="deletePost(postId)" :id="postId" class="card-btn rounded mb-2" v-if="userId == comments[0].thisUserId || admin==1"> <font-awesome-icon icon="times-circle" alt='suppression de la photo' aria-hidden="true" title="supprimer cette publication"/></button>
                    <input v-model="comment" :id="'post' + postId" type="textarea" maxlength="120" class="form-control" placeholder="Ajoutez un commentaire..." > 
                    <button type="submit" @click="addComment(postId, comment)" class="card-btn rounded mx-1 my-1"> Commentez </button>
                </div>
                <Comments 
                v-for="comment in comms" 
                :commentId= "comment.commentId"
                :comment= "comment.comment"
                :userId= "comment.userId"
                :idPost= "comment.idPost"
                :name= "comment.name"
                :postId = "postId"
                @dropComment = "deleteComment"
                :key= "comment.id"
                /> 
            </div>
        </div>
    </div>
</template>

<script>
import Comments from "../components/Comments"
import {mapActions, mapState} from 'vuex'
export default{
    name: "Publis",
    components:{
        Comments,
    },
    props:{
        userId: Number,
        name: String,
        text: String,
        picture: String,
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
                {thisUserId: sessionStorage.getItem("userId")}
            ],
            comment:'',
            like: 0,
            admin: sessionStorage.getItem('isAdmin'),
        }
    }, 
    computed:{
        ...mapState(['comms']),
    },
    methods: {
        ...mapActions(['recoverPosts', 'recoverComments']),
        addComment(postId, comment){
            this.$emit("sendComment", postId,comment)
            this.comment='';
        },
        deletePost: function(e){
            sessionStorage.setItem("publiId", e)
            let postId = sessionStorage.getItem('publiId');
            let url = "http://localhost:3000/api/texts/" + postId;
            fetch(url,{
                method: "delete",
                headers: {"Content-Type": "application/json", Authorization: "Bearer " + sessionStorage.getItem("token")}
            })
            .then(async res => {
                const data = await res.json();
                if (!res.ok) {
                const error = (data && data.message) || res.statusText;
                return Promise.reject(error);
            }
            alert("Votre post a bien été supprimé.");
            this.recoverPosts()
            })
            .catch(error => {
                if(error == 'Unauthorized'){
                    alert('Votre session a expiré vous allez être redirigé vers la page de connexion')
                    sessionStorage.clear();
                    window.location.href = '/';
                }else{
                    console.error('There was an error!', error);
                }
            });
        },
        deleteComment: function(e){
            sessionStorage.setItem("commentId", e)
            let commentId = sessionStorage.getItem('commentId');
            let url = "http://localhost:3000/api/comments/" + commentId;
            fetch(url,{
                method: "delete",
                headers: {"Content-Type": "application/json", Authorization: "Bearer " + sessionStorage.getItem("token")}
            })
            .then(async res => {
                const data = await res.json();
                if (!res.ok) {
                const error = (data && data.message) || res.statusText;
                return Promise.reject(error);
                }
                alert("Votre commentaire a bien été supprimé.");
                this.recoverComments();
            })
            .catch(error => {
                if(error == 'Unauthorized'){
                    alert('Votre session a expiré vous allez être redirigé vers la page de connexion')
                    sessionStorage.clear();
                    window.location.href = '/';
                }else{
                    console.error('There was an error!', error);
                }
            }); 
        },
        liked: function(e){
            let userId = sessionStorage.getItem('userId');
            if(e.includes(userId)){
                this.like = 0
            }else if (!e.includes(userId)){
                this.like += 1
            }
        },
        unliked: function(e){
            let userId = sessionStorage.getItem('userId');
            if(e.includes(userId)){
                this.like = 0
            }else if (!e.includes(userId)){
                this.like += -1
            }
        },
        likePost: function(e){
            const userId = sessionStorage.getItem('userId');
            sessionStorage.setItem("postId", e);
            let postId = sessionStorage.getItem("postId");
            let url = "http://localhost:3000/api/texts/" + postId;
            fetch(url,{
                method: "POST",
                headers: {"Content-Type": "application/json",Authorization: "Bearer " + sessionStorage.getItem("token") },
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
                this.recoverPosts()
            })
            .catch(error => {
                if(error == 'Unauthorized'){
                    alert('Votre session a expiré vous allez être redirigé vers la page de connexion')
                    sessionStorage.clear();
                    window.location.href = '/';
                }else{
                    console.error('There was an error!', error);
                }
            }); 
        },
        disabledLike: function(e){
            let userId = sessionStorage.getItem('userId');
            if(e.includes(userId)){
                return true;
            }else{
                return false;
            }
        },
        disabledUnlike: function(e){
            let userId = sessionStorage.getItem('userId');
            if(e.includes(userId)){
                return true;
            }else{
                return false;
            }
        },
    },
    mounted(){
        this.recoverComments()
    },
}
</script>

<style scoped lang="scss">
.pict{
    float: left;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    height: 40px;
    width: 40px;
    border-radius: 80px;
    border: 2px solid #169342;
    margin-top: -0.2%;
    margin-bottom: 0.2%;
    margin-left: 2%;
    margin-right: 0.5%;
}
.form-control{
    width: 80%;
    margin: auto;
}
.publication_image{
    height: 50%;
    width: 50%;
    @media screen and (max-width: 768px){
        height: 80%;
        width: 80%;
    }
}
</style>
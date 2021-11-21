<template>
    <div>
          <div v-for="publi in publis" :key='publi.id'>
            <div class="card border-info my-3 mx-5" v-if="publi.text">
                <div class="card-text border" v-if="publi.text"> 
                    {{publi.name}}
                </div>
                <div :id="'post'+ publi.postId" class="card-text border" v-if="publi.text">
                    {{publi.text}}
                        <div>
                            <Likes/>
                            <button :id="'like'+publi.postId" type="submit" @click="liked(publi.likes, publi.userIdLikes), likedPost(publi.postId)" class="btn" :disabled ="disabledLike(publi.dislikes)"><font-awesome-icon icon="thumbs-up"/><span>compteur</span></button>
                            <button :id="'unlike'+publi.postId" type="submit" @click="unliked(publi.dislikes, publi.userIdDislikes), likedPost(publi.postId)" class="btn" :disabled ="disabledUnlike(publi.likes, publi.userIdLikes)"><font-awesome-icon icon="thumbs-down"/><span> compteur</span></button>
                        </div>
                    <div v-for="comment in comments" :key="comment.id">
                        <div :class="'comm'+ comment.commentId" v-if="comment.postId == publi.postId"> 
                        {{comment.name}} {{comment.comment}}
                        <button @click="deleteComment(comment.commentId)" :id="comment.commentId" class="btn-primary" v-if="comment.userId == comments[0].thisUserId"> Supprimer ce commentaire </button>
                        </div>
                        </div>
                    <div  class="card-text"> 
                        <input v-model="publi.comment" :id="'post' + publi.postId" type="textarea" class="form-control" placeholder="Ajoutez un commentaire..." > 
                        <button type="submit" @click="addComment(publi.postId, publi.comment)" class="card-btn" > Ajouter un commentaire</button>
                    </div>
                </div>
            </div>
            <div class="card border-primary my-3 mx-5" v-if="publi.media">
                <div class="card-text border" v-if="publi.media"> 
                    {{publi.name}}
                </div>
                <div class="card-img border" v-if="publi.media">
                    <img class="publication_image" :src=publi.media>
                    <div>
                        <Likes/>
                        <button :id="'like'+publi.postId" type="submit" @click="liked(), likedPost(publi.postId)" class="btn" :disabled ="disabledLike()"><font-awesome-icon icon="thumbs-up" /><span> compteur </span></button>
                        <button :id="'unlike'+publi.postId" type="submit" @click="unliked(), likedPost(publi.postId)" class="btn" :disabled ="disabledUnlike()" ><font-awesome-icon icon="thumbs-down"/><span>  </span></button>
                    </div>
                    <div v-for="comment in comments" :key="comment.id">
                        <div :class="'comm'+ comment.commentId" v-if="comment.postId == publi.postId"> 
                        {{comment.name}} {{comment.comment}} 
                        <button @click="deleteComment(comment.commentId)" class="btn-primary" v-if="comment.userId == comments[0].thisUserId"> Supprimer ce commentaire </button>
                        </div>
                    </div>
                    <div  class="card-text"> <input v-model="publi.comment" :id="'post' + publi.postId" type="textarea" class="form-control" placeholder="Ajoutez un commentaire..." > 
                        <button type="submit" @click="addComment(publi.postId, publi.comment)" class="card-btn" > Ajouter un commentaire</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
import Likes from "../components/Likes.vue"
export default{
name: "Publis",
  components:{
        Likes,
    },
   data: function(){
        return{
            publis:[
            ],
        }
    },
methods: {
        displayPosts: function(){
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
                for (let i=0; i<data.data.length; i++){
                    if (data.data[i].user_id == null){
                        this.publis.push({name: 'Utilisateur supprimé' + ' ' + 'a publié:', text : data.data[i].text, media :data.data[i].media, postId :data.data[i].id_post, display:false, likes: data.data[i].likes, dislikes: data.data[i].dislikes, comment:'', userIdDislikes: data.data[i].usersDisliked, userIdLikes: data.data[i].usersLiked})
                    }else{
                        this.publis.push({name :data.data[i].firstName + ' ' + data.data[i].lastName + ' ' + 'a publié:', text : data.data[i].text, media :data.data[i].media, postId :data.data[i].id_post, display:false, likes: data.data[i].likes, dislikes: data.data[i].dislikes, comment:'', userIdDislikes: data.data[i].usersDisliked, userIdLikes: data.data[i].usersLiked})
                    }
                }
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
            });
        },
},
    created(){
            this.displayPosts()
        },
}
</script>
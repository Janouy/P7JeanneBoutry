<template>
    <div>
        <div class="card border-info my-3 mx-5" v-if="text">
            <div class="card-text border" v-if="text"> 
                {{name}}
            </div>
            <div :id="'post'+ postId" class="card-text border" v-if="text">
                {{text}}
                    <div>
                        <button :id="'like'+postId" type="submit" @click="liked(userIdLike), likedPost(postId)" class="btn" :disabled ="disabledLike(userIdDislike)"><font-awesome-icon icon="thumbs-up"/><span>{{likes}}</span></button>
                        <button :id="'unlike'+postId" type="submit" @click="unliked(userIdDislike), likedPost(postId)" class="btn" :disabled ="disabledUnlike(userIdLike)"><font-awesome-icon icon="thumbs-down"/><span>{{dislikes}}</span></button>
                    </div>
                    <div v-for="comment in comments" :key="comment.id">
                        <div :class="'comm'+ comment.commentId" v-if="comment.postId == postId"> 
                            {{comment.name}} {{comment.comment}}
                            <button @click="deleteComment(comment.commentId)" :id="comment.commentId" class="btn-primary" v-if="comment.userId == comments[0].thisUserId"> Supprimer ce commentaire </button>
                        </div>
                    </div>
                <div  class="card-text"> 
                    <input v-model="comment" :id="'post' + postId" type="textarea" class="form-control" placeholder="Ajoutez un commentaire..." > 
                    <button type="submit" @click="addComment(postId, comment)" class="card-btn" > Ajouter un commentaire</button>
                </div>
            </div>
        </div>
        <div class="card border-primary my-3 mx-5" v-if="media">
            <div class="card-text border" v-if="media"> 
                {{name}}
            </div>
            <div class="card-img border" v-if="media">
                <img class="publication_image" :src=media>
                <div>
                    <button :id="'like'+postId" type="submit" @click="liked(userIdLike), likedPost(postId)" class="btn" :disabled ="disabledLike(userIdDislike)"><font-awesome-icon icon="thumbs-up"/><span>{{likes}}</span></button>
                    <button :id="'unlike'+postId" type="submit" @click="unliked(userIdDislike), likedPost(postId)" class="btn" :disabled ="disabledUnlike(userIdLike)"><font-awesome-icon icon="thumbs-down"/><span>{{dislikes}}</span></button>
                </div>
                <div>
                     <div v-for="comment in comments" :key="comment.id">
                        <div :class="'comm'+ comment.commentId" v-if="comment.postId == postId"> 
                            {{comment.name}} {{comment.comment}}
                            <button @click="deleteComment(comment.commentId)" :id="comment.commentId" class="btn-primary" v-if="comment.userId == comments[0].thisUserId"> Supprimer ce commentaire </button>
                        </div>
                    </div>
                </div>
                <div class="card-text"> <input v-model="comment" :id="'post' + postId" type="textarea" class="form-control" placeholder="Ajoutez un commentaire..." > 
                    <button type="submit" @click="addComment(postId, comment)" class="card-btn"> Ajouter un commentaire</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name: "Publis",
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
    methods: {
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
                    if (data.data[i].id_user== null){
                        this.comments.push({postId: data.data[i].id_post , comment :data.data[i].comment, name : 'Utilisateur supprimé' + ' ' + 'a commenté:', commentId: data.data[i].id_comment})
                    }else{
                        this.comments.push({userId: data.data[i].id_user, postId: data.data[i].id_post , comment :data.data[i].comment, name :data.data[i].firstName + ' ' + data.data[i].lastName + ' ' + 'a commenté:', commentId: data.data[i].id_comment})
                    }
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
        likedPost: function(e){
            console.log(this.like)
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
                location.reload();
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
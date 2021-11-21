<template>
    <div>
        <h1> Page principale </h1>
        <div class="container">
            <form>
                <div class="form-row">
                    <input v-model="text" type="textarea" class="form-control" placeholder="Publiez quelque chose...">
                    <button type="submit" @click="addPost()" class="btn btn-primary col-3 my-3 mx-3"> Publier</button>
                    <form enctype="multipart/form-data">
                        <input @change="onFileChange()" id='image' type="file" ref="file" name="image" accept="image/x-png,image/gif,image/jpeg,image/jpg">
                        <button type="submit" @click="sendMedia()">Poster une photo </button>
                    </form>
                </div>
            </form>
           
        </div>
        <div v-for="publi in publis" :key='publi.id'>
            <div class="card border-info my-3 mx-5" v-if="publi.text">
                <div class="card-text border" v-if="publi.text"> 
                    {{publi.name}}
                </div>
                <div :id="'post'+ publi.postId" class="card-text border" v-if="publi.text">
                    {{publi.text}}
                        <div>
                            <button :id="'like'+publi.postId" type="submit" @click="liked(publi.userIdLike), likedPost(publi.postId)" class="btn" :disabled ="disabledLike(publi.userIdDislike)"><font-awesome-icon icon="thumbs-up"/><span>compteur</span></button>
                            <button :id="'unlike'+publi.postId" type="submit" @click="unliked(publi.userIdDislike), likedPost(publi.postId)" class="btn" :disabled ="disabledUnlike(publi.userIdLike)"><font-awesome-icon icon="thumbs-down"/><span> compteur</span></button>
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

export default {
    name: 'Main',
    data: function(){
        return{
            publis:[
            ],
            comments:[
                {thisUserId: localStorage.getItem('userId')}
            ],
            text:'',
            userId:'',
            file: null, 
            image:'',
            imageUrl:'',
            newImage:'',
            like: 0,
            idUser: localStorage.getItem('UserId'),
            }
    }, 
    computed:{
    
    },
    methods:{
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
        onFileChange() {
            this.file = this.$refs.file.files[0];
            this.newImage = URL.createObjectURL(this.file);
            console.log(this.file);
            console.log(this.newImage);
        },
        onVideoChange() {
            this.video = this.$refs.file.files[0];
            this.newVideo = URL.createObjectURL(this.video);
            console.log(this.video);
            console.log(this.newVideo);
    },
        sendMedia: function(){
            const formData = new FormData();
            formData.set("image", this.file)
            let userId = localStorage.getItem("userId");
            let url = "http://localhost:3000/api/medias/" + userId;
            fetch(url,{
                method: "POST",
                headers: {Authorization: "Bearer " + localStorage.getItem("token") },
                body: formData,
            })
            .then(async res => {
                const data = await res.json();
                if (!res.ok) {
                    const error = (data && data.message) || res.statusText;
                    return Promise.reject(error);
                }
                location.reload();
                this.newImage ='';
                this.file = '';
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
            });
        },   
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
                        this.publis.push({name: 'Utilisateur supprimé' + ' ' + 'a publié:', text : data.data[i].text, media :data.data[i].media, postId :data.data[i].id_post, likes: data.data[i].likes, dislikes: data.data[i].dislikes, comment:'', userIdDislike: data.data[i].userDislikes, userIdLike: data.data[i].userLikes})
                    }else{
                        this.publis.push({name :data.data[i].firstName + ' ' + data.data[i].lastName + ' ' + 'a publié:', text : data.data[i].text, media :data.data[i].media, postId :data.data[i].id_post, likes: data.data[i].likes, dislikes: data.data[i].dislikes, comment:'', userIdDislike: (data.data[i].userDislikes).split(','), userIdLike: (data.data[i].userLikes).split(',')})
                    }
                    console.log(this.publis[i]);
                }
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
            });
        },
        displayComments: function(){
            console.log(this.like);
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
        addPost: function(){
            let userId = localStorage.getItem("userId");
            let url = "http://localhost:3000/api/texts/";
            fetch(url, {    
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + localStorage.getItem("token") },
                body: JSON.stringify({ 
                id: userId,
                text: this.text,
                })
            })
            .then(async res => {
                const data = await res.json();
                if (!res.ok) {
                    const error = (data && data.message) || res.status;
                    return Promise.reject(error);
                }
                this.postId = data.id;
                location.reload();
            })
            .catch(error => {
                this.errorMessage = error;
                console.error('There was an error!', error);
                alert("Une erreur est survenue.")
            });
        },
        addComment: function(e, f){
            this.publis[0].comment = f
            localStorage.setItem("publiId", e)
            this.userId = localStorage.getItem('userId');
            let postId = localStorage.getItem('publiId');
            let url = "http://localhost:3000/api/comments/" + postId;
            fetch(url, {    
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + localStorage.getItem("token") },
                body: JSON.stringify({ 
                    comment: this.publis[0].comment,
                    userId: this.userId,
                })
            })
            .then(async res => {
                const data = await res.json();
                if (!res.ok) {
                    const error = (data && data.message) || res.status;
                    return Promise.reject(error);
                }
                this.postId = data.id;
                location.reload();
            })
            .catch(error => {
                this.errorMessage = error;
                console.error('There was an error!', error);
                alert("Une erreur est survenue.")
            }); 
        },
        deleteComment: function(e){
            localStorage.setItem("commentId", e)
            let commentId = localStorage.getItem('commentId');
            console.log(commentId);
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
                console.log(this.like)
        },
        unliked: function(e){
            let userId = localStorage.getItem('userId');
            if(e.includes(userId)){
                this.like = 0
                }else if (!e.includes(userId)){
                    this.like += -1
                }
                console.log(this.like)
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
        /*displayLikes: function(){
            let url = "http://localhost:3000/api/likes";
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
                    this.likes.push({userIdLike: data.data[i].usersLiked, userIdDisliked: data.data[i].usersDisliked, postId: data.data[i].id_post, like: data.data[i].likes, dislike: data.data[i].dislikes})
                console.log(this.likes[i])
                }
                
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
            }); 
      }, */
    },
        created(){
            this.displayPosts()
            this.displayComments()
        },
}
</script>

<style lang="scss">
.publication_image{
    max-width: 150px
}
</style>
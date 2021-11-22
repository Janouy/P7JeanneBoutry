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

        <Publis
            v-for="publi in publis" 
            :name = "publi.name"
            :text = "publi.text"
            :media = "publi.media"
            :postId = "publi.postId"
            :likes = "publi.likes"
            :dislikes = "publi.dislikes"
            :comment = "publi.comment"
            :userIdDislike = "publi.userIdDislike"
            :userIdLike = "publi.userIdLike"
            @disablingLike = "disabledLike"
            @disablingUnlike = 'disabledUnlike'
            :key='publi.id'
        />

    </div>
</template>

<script>
import Publis from "../components/Publis"
export default {
    name: 'Main',
    components:{
        Publis
    },
    data: function(){
        return{
            publis:[
                {}
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
        recoverPosts: function(){
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
                        this.publis.push({name :data.data[i].firstName + ' ' + data.data[i].lastName + ' ' + 'a publié:', text : data.data[i].text, media :data.data[i].media, postId :data.data[i].id_post, likes: data.data[i].likes, dislikes: data.data[i].dislikes, comment:'', userIdDislike: (data.data[i].userDislikes).split(' '), userIdLike: (data.data[i].userLikes).split(' ')})
                    }
                }
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
            });
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
            this.recoverPosts()
            this.recoverComments()
        },
}
</script>

<style lang="scss">
.publication_image{
    max-width: 150px
}
</style>
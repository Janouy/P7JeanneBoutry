<template>
    <div>
  <div id="nav">
      <router-link to="/profile"> Mon profil</router-link> 
    </div>
        <h1> Page principale </h1>
        <div class="container">
        <DisplayUsers/>
            <form>
                <div class="form col-9">
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
            :userIdDislike = "publi.userIdDislike"
            :userIdLike = "publi.userIdLike"
            @sendComment= "addComment"
            :key='publi.id'
        />
    </div>
</template>

<script>
import Publis from "../components/Publis"
import DisplayUsers from "../components/DisplayUsers"
export default {
    name: 'Main',
    components:{
        Publis,
        DisplayUsers
    },
    data: function(){
        return{
            publis:[
                {comment:''}
            ],
            text:'',
            userId:'',
            file: null, 
            image:'',
            imageUrl:'',
            newImage:'',
            idUser: localStorage.getItem('UserId'),
            }
    }, 
    computed:{
    
    },
    methods:{
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
    },
        created(){
            this.recoverPosts()
        },
}
</script>

<style lang="scss">
.publication_image{
    max-width: 150px
}
</style>
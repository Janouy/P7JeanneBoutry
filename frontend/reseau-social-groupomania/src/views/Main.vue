<template>
    <div>
        <div class="container-fluid background">
            <h1 class="col text-center pt-3"> Groupomania People </h1>
            <div class="col pt-3">
                <nav class='navbar navbar-expand bg-white rounded pt-2 text-left shadow' id="nav"> <ConnectedUser/></nav>
            </div>
            <div class="row">
                    <div class="col-5 mb-5 caroussel">
                    <Caroussel/>
                    </div>
            </div>
            <div class="row">
                <DisplayUsers/>
                <form class="col text_publi bg-light rounded shadow">
                    <input id="output" v-model="text" type="textarea" maxlength="1200" class="form-control textarea mt-5" placeholder="Ecrivez quelque chose...">
                    <button type="submit" @click="addPost()" class="btn btn-primary col-3 my-3 mx-3"> Publiez</button>
                </form>
                <form enctype="multipart/form-data" class="col bg-light mr-3 rounded shadow">
                    <input @change="onFileChange()" id='image' type="file" ref="file" name="image" accept="image/x-png,image/gif,image/jpeg,image/jpg">
                    <button type="submit" @click="sendMedia()">Postez une photo </button>
                </form>
            </div>
            <Publis
            v-for="publi in posts" 
            :userId = "publi.userId"
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
    </div>
</template>

<script>
import Publis from "../components/Publis"
import DisplayUsers from "../components/DisplayUsers"
import ConnectedUser from "../components/DisplayConnectedUser"
import Caroussel from "../components/Caroussel.vue"
import { mapState, mapActions} from 'vuex'
export default {
    name: 'Main',
    components:{
        Publis,
        DisplayUsers,
        ConnectedUser,
        Caroussel,
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
            idUser: sessionStorage.getItem('UserId'),
        }
    },
    computed:{
        ...mapState(['posts']),
    },
    methods:{
        ...mapActions(['recoverPosts', 'recoverComments']),
        onFileChange() {
            this.file = this.$refs.file.files[0];
            this.newImage = URL.createObjectURL(this.file);
        },
        sendMedia: function(){
            const formData = new FormData();
            formData.set("image", this.file)
            let userId = sessionStorage.getItem("userId");
            let url = "http://localhost:3000/api/medias/" + userId;
            fetch(url,{
                method: "POST",
                headers: {Authorization: "Bearer " + sessionStorage.getItem("token") },
                body: formData,
            })
            .then(async res => {
                const data = await res.json();
                if (!res.ok) {
                    const error = (data && data.message) || res.statusText;
                    return Promise.reject(error);
                }
                this.recoverPosts()
                this.newImage ='';
                this.file = '';
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
                alert('Votre session a expirée vous allez être redirigé vers la page de connexion')
                sessionStorage.clear();
                window.location.href = '/';
            });
        },   
        addPost: function(){
            let userId = sessionStorage.getItem("userId");
            let url = "http://localhost:3000/api/texts/";
            fetch(url, {    
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + sessionStorage.getItem("token") },
                body: JSON.stringify({ 
                    id: userId,
                    text: this.text,
                })
            })
            .then(async res => {
                const data = await res.json();
                if (!res.ok){
                    const error = (data && data.message) || res.status;
                    return Promise.reject(error);
                }
                this.text='';
                this.file='';
                this.recoverPosts();
            })
            .catch(error => {
                this.errorMessage = error;
                console.error('There was an error!', error);
                alert('Votre session a expirée vous allez être redirigé vers la page de connexion')
                sessionStorage.clear();
                window.location.href = '/';
            });
        },
        addComment: function(e, f){
            this.publis[0].comment = f;
            sessionStorage.setItem("publiId", e)
            this.userId = sessionStorage.getItem('userId');
            let postId = sessionStorage.getItem('publiId');
            let url = "http://localhost:3000/api/comments/" + postId;
            fetch(url, {    
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + sessionStorage.getItem("token") },
                body: JSON.stringify({ 
                    comment: this.publis[0].comment,
                    userId: this.userId,
                })
            })
            .then(async res => {
                const data = await res.json();
                if (!res.ok){
                    const error = (data && data.message) || res.status;
                    return Promise.reject(error);
                }
                this.recoverComments();
            })
            .catch(error => {
                this.errorMessage = error;
                console.error('There was an error!', error);
                alert('Votre session a expirée vous allez être redirigé vers la page de connexion')
                sessionStorage.clear();
                window.location.href = '/';
            }); 
        },
    },
    mounted(){
        this.recoverPosts()
    },
}
</script>

<style scoped lang="scss">
    h1{
        color: #169342;
        font-weight: bold;
        font-size: 8vmin;
        text-shadow: 1px 2px 2px #000;
    }
    .publication_image{
        max-width: 150px;
        height: auto;
    }
    #top_menu{
        display: flex;
    }
    .caroussel{
        float:none;
        margin: 0 auto;
    }
    .textarea {
        overflow-y: scroll;
        height: 100px;
        resize: none; 
    }
    .text_publi{
        height: 255px;
    }
</style>
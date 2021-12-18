<template>
    <div class="container-fluid">
        <h1 class="col text-center pt-3"> Groupomania People </h1>
            <div class="col pt-3">
                <nav class='navbar navbar-expand bg-white rounded pt-2 text-left shadow' id="nav"><ConnectedUser/></nav>
            </div>
            <div class="col-1"> <Disconnection/> </div>
            <div class="row">
                    <div class="col mb-5 caroussel">
                    <Caroussel/>
                    </div>
            </div>
            <div class="row">
                <div class="col-12 col-lg-3 col-xl-3 mb-2 displayusers">
                    <DisplayUsers/>
                </div>
                <div class="col-12 col-lg-8 col-xl-8">
                    <div class="row">
                        <form v-on:submit.prevent class="col text_publi mx-3 mb-2 rounded shadow">
                            <label for="output"> Ecrivez quelque chose...</label>
                            <textarea id="output" v-model="text" type="textarea" maxlength="500" class="form-control textarea mt-3 mt-xl-2"></textarea>
                            <button type="submit" @click="addPost()" class="btn btn-success col-4 col-md-4 col-lg-4 mt-3 mt-xl-2 mx-3" aria-label="publish">Publier</button>
                        </form>
                        <form v-on:submit.prevent enctype="multipart/form-data" class="col text_publi mx-3 pt-5 mb-2 rounded shadow ">
                            <label for="image"> Publiez une photo :</label>
                            <input @change="onFileChange()" id='image' type="file" ref="file" name="image" accept="image/x-png,image/gif,image/jpeg,image/jpg">
                            <button type="submit" @click="sendMedia()" class="btn btn-success col-4 col-md-3 col-xl-3 mt-5 my-xl-3 mx-3" aria-label="post picture"> Envoyer</button>
                            <button class="btn my-xl-3 mx-3" id='cross' type="reset" aria-label="reset form data"> <font-awesome-icon icon="times-circle" alt='suppression du fichier' aria-hidden="true" title="annuler l'envoi"/></button>
                        </form>
                        <Publis
                        v-for="publi in posts" 
                        :userId = "publi.userId"
                        :name = "publi.name"
                        :text = "publi.text"
                        :media = "publi.media"
                        :postId = "publi.postId"
                        :picture = "publi.picture"
                        :likes = "publi.likes"
                        :dislikes = "publi.dislikes"
                        :userIdDislike = "publi.userIdDislike"
                        :userIdLike = "publi.userIdLike"
                        @sendComment= "addComment"
                        :key='publi.id'
                        />
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
import Publis from "../components/Publis"
import DisplayUsers from "../components/DisplayUsers"
import ConnectedUser from "../components/ConnectedUser"
import Caroussel from "../components/Caroussel.vue"
import Disconnection from "../components/Deco.vue"
import { mapState, mapActions} from 'vuex'
export default {
    name: 'Main',
    components:{
        Publis,
        DisplayUsers,
        ConnectedUser,
        Caroussel,
        Disconnection,
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
                 this.newImage ='';
                this.file = '';
                document.getElementById("cross").click();
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
                if(error == 401){
                    alert('Votre session a expiré vous allez être redirigé vers la page de connexion')
                    sessionStorage.clear();
                    window.location.href = '/';
                }else{
                    console.error('There was an error!', error);
                }
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
                if(error == 401){
                    alert('Votre session a expiré vous allez être redirigé vers la page de connexion')
                    sessionStorage.clear();
                    window.location.href = '/';
                }else{
                    console.error('There was an error!', error);
                }
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
        resize: none; 
        @media screen and (max-width: 768px){
            height: 80px;
            width: 100%;
        }
        @media screen and (min-width: 768px) and (max-width: 1023px){
            height: 80px;
            width: 100%;
       }
        @media screen and (min-width: 1024px) and (max-width: 1366px){
            height: 100px;
            width: 100%;
       }
        @media screen and (min-width: 1367px){
            height: 120px;
            width: 100%;
       }
    }
    .text_publi{
        height: 210px;
    }
    button{
        color: black;
    }
</style>
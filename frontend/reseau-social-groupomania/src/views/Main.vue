<template>
    <div>
        <div class="container-fluid">
        <div id="top_menu" class="row">
            <ConnectedUser/>
        </div>
        <h1> Page principale</h1>
        <div class="container">
            <DisplayUsers/>
            <form>
                <div class="form col-9">
                    <input id="output" v-model="text" type="textarea" class="form-control" placeholder="Publiez quelque chose...">
                    <button type="submit" @click="addPost()" class="btn btn-primary col-3 my-3 mx-3"> Publier</button>
                    <form enctype="multipart/form-data">
                        <input @change="onFileChange()" id='image' type="file" ref="file" name="image" accept="image/x-png,image/gif,image/jpeg,image/jpg">
                        <button type="submit" @click="sendMedia()">Poster une photo </button>
                    </form>
                </div>
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
import { mapState, mapActions} from 'vuex'
export default {
    name: 'Main',
    components:{
        Publis,
        DisplayUsers,
        ConnectedUser,
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
                this.recoverPosts()
                this.newImage ='';
                this.file = '';
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
            });
        },
        addComment: function(e, f){
            this.publis[0].comment = f;
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
                if (!res.ok){
                    const error = (data && data.message) || res.status;
                    return Promise.reject(error);
                }
                this.recoverComments();
            })
            .catch(error => {
                this.errorMessage = error;
                console.error('There was an error!', error);
                alert("Une erreur est survenue.")
            }); 
        },
    },
    mounted(){
        this.recoverPosts()
    },
}
</script>

<style scoped lang="scss">
.publication_image{
    max-width: 150px;
    height: auto;
}
#top_menu{
    display: flex;
}
</style>
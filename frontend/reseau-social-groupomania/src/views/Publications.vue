<template>
    <div>
        <div class="container">
            <Navbar/>
            <h1> Mes publications </h1>
            <div class="card my-3">
                <div class="card-text my-2 " v-if="this.publis.length ==0"> Vous n'avez rien publié </div>
                <div v-for="publi in publis" :key='publi.id' class="card border rounded mx-2 my-2 shadow">
                    <div class="card-text my-2" v-if="publi.text">{{publi.text}} </div>
                    <div v-if="publi.media" v-show="display=true"><img class="card-img img_publication my-2 rounded" :src=publi.media alt="publication picture"></div>
                    <div v-else-if="!publi.media" v-show="display=false"> </div>
                    <span class="col text-center"><div @click="deletePost(publi.postId)" class="btn btn-dark button_publication border my-2" aria-label="delete post"> Supprimer ce post</div> </span>
                </div>
            </div>
        </div>
        <span class="col text-center mt-3"> <button type="submit" @click="backToProfile()" class="btn btn-info button_return col-2 mb-3" aria-label="return to profile"> Retour au profil</button> </span>
    </div>
</template>

<script>
import Navbar from "../components/Navbar.vue"
export default {
    name: 'Publications',
    components:{
        Navbar
    },
    data: function(){
        return{
            publis:[
            ],
            text:''
        }
    },
    methods:{
        backToProfile: function(){
            this.$router.go(-1)
        },
        displayText: function(){
            let userId = sessionStorage.getItem('userId');
            let url = "http://localhost:3000/api/texts/" + userId;
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
            this.publis=[]
            for(let i=0; i<data.data.length; i++){
                this.publis.push({text :data.data[i].text, media :data.data[i].media, postId :data.data[i].id_post})
            } 
        })
        .catch(error => {
            this.errorMessage = error;
            console.error("There was an error!", error);
        });
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
            this.displayText()
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
            });
        },
    },
    mounted(){
        this.displayText()
    },
}
</script>

<style scoped lang="scss">
.img_publication{
    max-width: 30%;
    margin: auto;
    @media screen and (max-width: 768px){
        max-width: 50%;
    }
}
.button_publication{
    font-size: 2vmin;
}
.button_return{
    font-size: 2vmin;
    color: black;
}
</style>

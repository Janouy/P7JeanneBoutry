<template>
    <div>
        <div class="container">
            <Navbar/>
            <h1> Mes publications </h1>
            <div class="card my-3">
                <span class="card-text my-2 " v-if="this.publis.length ==0"> Vous n'avez rien publié </span>
                <div v-for="publi in publis" :key='publi.id' class="border rounded mx-2 my-2 shadow">
                    <span class="card-text my-2" >{{publi.text}} </span>
                    <img class="publication_image my-2" :src=publi.media >
                    <button @click="deletePost(publi.postId)" class="btn btn-dark border my-2 ml-5"> Supprimer ce post</button> 
                </div>
            </div>
        </div>
        <span class="col text-center mt-3"> <button type="submit" @click="backToProfile()" class="btn btn-info col-2 ml-3 mb-3"> Retour au profil</button> </span>
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
            let userId = localStorage.getItem('userId');
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
            localStorage.setItem("publiId", e)
            let postId = localStorage.getItem('publiId');
            let url = "http://localhost:3000/api/texts/" + postId;
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
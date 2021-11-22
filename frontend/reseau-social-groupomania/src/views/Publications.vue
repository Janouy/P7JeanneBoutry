<template>
<div>
    <h1> Mes publications </h1>
    <div class="container">
    <div class="card">
    <div v-for="publi in publis" :key='publi.id'>
            <span class="card-text">{{publi.text}} </span>
            <img class="publication_image" :src=publi.media >
            <button @click="deletePost(publi.postId)" class="btn border"> Supprimer le post</button> 
    </div>
    </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Publications',
    data: function(){
    return{
        publis:[
        ],
        text:''
    }
    },
    methods:{
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
            location.reload();
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
            });
        },
    },
    created(){
        this.displayText()
    },
}
</script>
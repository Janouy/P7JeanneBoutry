<template>
<div>
    <h1> Page principale </h1>
    <div class="container">
    <form>
        <div class="form-row">
        <input v-model="text" type="textarea" class="form-control" placeholder="Publiez quelque chose...">
        <button type="submit" @click="addPost()" class="btn btn-primary col-3 my-3 mx-3"> Publier</button>
        <button type="submit" @click="addMedia()"> <font-awesome-icon icon="images"/> Ajouter Photo/Vidéo/Gif</button>
            </div>
        </form>
    </div>
    <div class="card">
    <div v-for="publi in publis" :key='publi.id'>
            <div class="card-text" v-if="!publi.media" v-show="publi.display==true"> 
                {{publi.name}}
                <img class="publication_image" :src=publi.media >
            </div>
            <div class="card-text" v-else v-show="publi.display==false"> 
                {{publi.name}}
                <img class="publication_image" :src=publi.media>
                <!--<video width="320" height="240" controls>
                <source :src=publi.media type=video/mp4>
                </video> -->
            </div>
            <div class="card-text"> 
                {{publi.name}}
                <span>{{publi.text}}</span>
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
        text:''
    }
    }, 
    methods:{
        addMedia: function(){
             var win = window.open(window.location.href + '/media', "nom_popup","menubar=no, status=no, scrollbars=no, menubar=no, width=800, height=800");
             var win_timer = setInterval(function() {  
                if(win.closed) {
                window.location.reload();
                clearInterval(win_timer);
            } 
      }, 100); 
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
                this.publis.push({name :data.data[i].firstName + ' ' + data.data[i].lastName + ' ' + 'a publié:', display:false}, {text : data.data[i].text}, {media :data.data[i].media,display:false})
                } 
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
            });
        },
        addPost: function(){
            let userId = localStorage.getItem("userId");
            let url = "http://localhost:3000/api/texts/" + userId;
            fetch(url, {    
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + localStorage.getItem("token") },
                body: JSON.stringify({ 
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
    },
    created(){
        this.displayPosts()
    },
}
</script>

<style lang="scss">
.publication_image{
    max-width: 150px
}
</style>
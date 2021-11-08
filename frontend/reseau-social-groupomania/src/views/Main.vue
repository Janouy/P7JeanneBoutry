<template>
<div>
    <h1> Page principale </h1>
    <div class="container">
    <form>
        <div class="form-row">
        <input v-model="text" type="textarea" class="form-control" placeholder="Publiez quelque chose...">
        <button type="submit" @click="addPost()" class="btn btn-primary col-3 my-3 mx-3"> Publier</button>
        <button type="submit" @click="addMedia()"> <font-awesome-icon icon="images"/></button>
            </div>
        </form>
    </div>
    <div>
    <div v-for="publi in publis" :key='publi.id'>
        <div class="card">
            <div class="card-text"> {{publi.name}}
                <img class="publication_image" :src=publi.media v-if="!publi.media" v-show="publi.display==false">
                <img class="publication_image" :src=publi.media v-else>
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
        displayText: function(){
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
                this.publis.push({name :data.data[i].firstName + ' ' + data.data[i].lastName + ' ' + 'a publié:' + ' ' + data.data[i].text, display:true}, {media :data.data[i].media,display:true})
                } 
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
            });
        },
       /* displayMedia: function(){
            let url = "http://localhost:3000/api/medias";
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
                this.publis.push({date :data.data[i].date}, {name2: data.data[i].firstName + ' ' + 'a partagé:'}, {media :data.data[i].media})
                } 
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
            });
        },*/
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
        this.displayText()
    },
}
</script>

<style lang="scss">
.publication_image{
    max-width: 150px
}
</style>
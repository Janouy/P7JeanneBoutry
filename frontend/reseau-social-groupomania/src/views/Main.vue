<template>
<div>
    <h1> Page principale </h1>
    <div class="container">
    <form>
        <div class="form-row">
        <input v-model="text" type="textarea" class="form-control" placeholder="Publiez quelque chose...">
        <button type="submit" @click="addPost()" class="btn btn-primary col-3 my-3 mx-3"> Publier</button>
            </div>
        </form>
    </div>
    <div class="card">
    <div v-for="publi in publis" :key='publi.id'>
        <div class="card-text "> {{publi.name}}</div>
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
                this.publis.push({name :data.data[i].firstName + ' ' + data.data[i].lastName + ' ' + 'a dit:' + ' ' + data.data[i].text})
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
        this.displayText()
    },
}
</script>
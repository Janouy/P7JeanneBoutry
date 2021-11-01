<template>
<div>
    <h1> Page principale </h1>
    <div class="container">
    <form>
        <div class="form-row">
        <input type="textarea" class="form-control" placeholder="Publiez quelque chose...">
        <button type="submit"> Publier</button>
            </div>
        </form>
    </div>
    <div class="container">
        
        <p v-for="publi in publis" :key='publi.id'> 
            {{publi.title}}
        </p>
        
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
                this.publis.push({title :data.data[i].text})
                }
                   
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
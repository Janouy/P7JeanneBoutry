<template>
    <div>
        <div class="container">
            <div class='card'>
                <div class="row">
                    <div class="card_title col-12 h2 ">{{this.firstName}} {{this.lastName}}</div>
                </div>
                <div class="card">
                    <div class="card-img-top" v-if="this.picture == 'NULL'" v-show="false"> <img class="publication_image" :src=this.picture> </div>
                    <div class="card-img-top" v-else v-show="true"> <img class="picture_profile" :src=this.picture> </div>
                    <div class="card-text my-3 mx-3 border"> {{this.description}}</div>
                    <router-link to="/groupomania/main"> Retour à l'accueil </router-link>
                </div>
            </div> 
        </div>
    </div>
</template>

<script>
export default {
    name: 'userPage',
    props:['id'],
    data: function(){
    return{
        firstName:'',
        lastName:'',
        description:'',
        picture:'',
    }
}, 
    methods:{
        displayUser: function(){
            let url = "http://localhost:3000/api/users/" + this.id ;
            fetch(url,{
                method: "GET",
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + localStorage.getItem("token")},
            })
            .then(async res => {
                const data = await res.json();
            if (!res.ok) {
                const error = (data && data.message) || res.statusText;
                return Promise.reject(error);
            }
            this.lastName = data.data[0].lastName;
            this.firstName = data.data[0].firstName;
            this.picture = data.data[0].picture;
            this.description = data.data[0].description;
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
            }); 
        },
    },
    created(){
        this.displayUser()
    },
}
</script>
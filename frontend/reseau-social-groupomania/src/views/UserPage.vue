<template>
    <div class="background">
        <div class="container py-5">
        <nav class='py-3 text-left' id="nav"> <router-link to="/groupomania/main"><font-awesome-icon class='icon_home' icon="home" alt='retour page principale' aria-hidden="true"/></router-link> Accueil</nav>
            <div class='card'>
                <div class="row">
                    <div class="card_title col-12 h2 ">{{this.firstName}} {{this.lastName}}</div>
                </div>
                <div class="card py-3">
                    <div class="card-img-top" v-if="this.picture == 'NULL' || !this.picture"> <img class="publication_image" src="../assets/logos/user.png"> </div>
                    <div class="card-img-top" v-else > <img class="picture_profile" :src=this.picture> </div>
                    <div class="card-text my-3 mx-3 border rounded " v-if="this.description"> {{this.description}}</div>
                    <div class="card-text my-3 mx-3 border rounded " v-else> {{this.firstName}} {{this.lastName}} n'a renseigné aucune bio...</div>
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
    mounted(){
        this.displayUser()
    },
}
</script>
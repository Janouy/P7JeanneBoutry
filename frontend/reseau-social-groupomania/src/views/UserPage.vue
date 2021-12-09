<template>
    <div class="background">
        <div class="container py-5">
            <Navbar/>
            <div class='card mt-5'>
                <div class="row">
                    <div class="card_title col-12 h2 mt-2">{{this.firstName}} {{this.lastName}}</div>
                </div>
                    <div class="card-img" v-if="this.picture == 'NULL' || !this.picture"> <img class="publication_image" src="../assets/logos/user.png"> </div>
                    <div class="card-img" v-else > <img class="picture_profile" :src=this.picture> </div>
                    <div class="card-text my-3 mx-3 border rounded " v-if="this.description"> {{this.description}}</div>
                    <div class="card-text my-3 mx-3 border rounded " v-else> {{this.firstName}} {{this.lastName}} n'a renseigné aucune bio...</div>
            </div> 
        </div>
    </div>
</template>

<script>
import Navbar from "../components/Navbar.vue"
export default {
    name: 'userPage',
    components:{
        Navbar
    },
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
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + sessionStorage.getItem("token")},
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
<template>
<div class="container">
    <div class='card'>
        <div class="row">
            <div class="card_title col-4 h2 " v-if="mode == 'view'"> Profil </div>
            <div class="card_title col-4 h2 " v-else> Modification de votre Profil... </div>
        </div>

        <div class="card" v-if="mode == 'view'">
            <div class="card-text my-3 mx-3 border"> {{this.email}} </div>
            <div class="card-text my-3 mx-3 border"> {{this.firstName}}</div>
            <div class="card-text my-3 mx-3 border"> {{this.lastName}}</div>
            <button class="btn col-3 my-3 mx-3" @click ="modifyProfile()"> Modifier mon profil</button>
            <Disconnection/>
        </div>
        <form v-else>
            <div class="form-group"> Email:
                <input v-model="email" type="email" class="form-control  my-3 mx-3"> 
            </div>
            <div class="form-group"> Prénom:
                <input v-model="firstName" type="text" class="form-control my-3 mx-3">
            </div>
            <div class="form-group"> Nom:
                <input v-model="lastName" type="text" class="form-control my-3 mx-3">
            </div>
            <button type="submit" @click="modify(), viewProfile()" class="btn btn-primary col-3 my-3 mx-3"> Valider les modifications</button>
        </form>
    </div>
</div>
</template>


<script>
import Disconnection from "../components/Deco.vue"

export default {
    name: 'Profile',
    components:{
        Disconnection
    },
    data: function(){
    return{
        mode: 'view',
        email: '',
        password:'',
        firstName: '',
        lastName: ''
    }
}, 
    methods:{
        viewProfile: function(){
            this.mode = 'view';
        },
        modifyProfile: function(){
            this.mode = 'modify';
        },
        displayProfile: function(){
            let userId = localStorage.getItem("userId");
            let url = "http://localhost:3000/api/users/" + userId;
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
            this.email = data.data[0].email;
            this.lastName = data.data[0].lastName;
            this.firstName = data.data[0].firstName;
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
            });
        },
        modify: function(){
            let userId = localStorage.getItem("userId");
            let url = "http://localhost:3000/api/users/" + userId;
            fetch(url,{
                method: "Put",
                headers: {"Content-Type": "application/json", Authorization: "Bearer " + localStorage.getItem("token")},
                body: JSON.stringify({ 
                    email: this.email,
                    firstName: this.firstName,
                    lastName: this.lastName
                }),
                
            })
            .then(async res => {
                const data = await res.json();
                if (!res.ok) {
                    const error = (data && data.message) || res.statusText;
                    return Promise.reject(error);
                }
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
            });
        },
    },
    created(){
        this.displayProfile()
    },
}
</script>

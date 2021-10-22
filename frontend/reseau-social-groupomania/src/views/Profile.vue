<template>
    <div class="container">
        <div class='card'>
            <div class="row">
                <div class="card_title col-4 h2 " v-if="mode == 'view'"> Profil </div>
                <div class="card_title col-4 h2 " v-else> Modification de votre Profil... </div>
                <div class="card-img col-5 border"></div>
            </div>
            <div class="card-text my-3 mx-3 border" v-if="mode == 'view'"> {{this.email}} </div>
            <div class="card-text my-3 mx-3 border" v-if="mode == 'view'"> {{this.firstName}}</div>
            <div class="card-text my-3 mx-3 border" v-if="mode == 'view'"> {{this.lastName}}</div>
            <div class='form-row'>
                <button class="btn col-3 my-3 mx-3" v-if="mode == 'view'" @click ="modifyProfile()"> Modifier mon profil</button>
                <button class="btn btn-primary col-3 my-3 mx-3" v-else @click ="viewProfile()"> Valider les modifications</button>
            </div>
            
        </div>
    </div>
</template>



<script>
 const userId = window.location.search;
            console.log(userId);
export default {
    name: 'Profile',
    data: function(){
    return{
        mode: 'view',
        email: '',
        password:'',
        firstName: '',
        lastName: '', 
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
    },
    created(){
        this.displayProfile()
    },
    
}
</script>

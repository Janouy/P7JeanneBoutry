<template>
    <div class="background">
        <div class="container py-5">
            <Navbar/>
            <div class='card mt-5'>
                <div class="row">
                    <div class="card_title col-12 h2 mt-2">{{this.firstName}} {{this.lastName}}</div>
                </div>
                    <div class="card-img" v-if="this.picture == 'NULL' || !this.picture"> <img class="picture_profile" src="../assets/logos/user.png" alt="user logo"> </div>
                    <div class="card-img" v-else > <img class="picture_profile" :src=this.picture alt="profile picture"> </div>
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
                if(error == 'Unauthorized'){
                    alert('Votre session a expiré vous allez être redirigé vers la page de connexion')
                    sessionStorage.clear();
                    window.location.href = '/';
                }else{
                    console.error('There was an error!', error);
                }
            }); 
        },
    },
    mounted(){
        this.displayUser()
    },
}
</script>

<style scoped lang="scss">
    .background{
        background-color: #F0F2F5;
        @media screen and (max-width: 768px){
            min-height: 900px;
        }
        @media screen and (min-width: 768px) and (max-width: 1023px){
            min-height: 1100px;
       }
        @media screen and (min-width: 1024px) and (max-width: 1366px){
            min-height:1300px;
       }
        @media screen and (min-width: 1367px){
            min-height: 800px;
       }
    }
    .background-card{
        background-color: rgba(63, 60, 59, 0.3);
    }
    .picture{
        display: flex;
        justify-content: center;
        width: 100%;
        height: 300px;
        padding: auto;
    }
    .picture_profile{
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        height: 250px;
        width: 250px;
        margin-top:25px;
        border-radius: 30px;
        border: 3px solid yellow;
    }
    .no_picture_profile{
        height: 250px;
        width: 250px;
        border-radius: 30px;
        background-color: black;
        margin-top:25px;
    }
    .info{
        font-size: 1.2vmin;
    }
    .delete_img{
        cursor: pointer;
        font-size: 1.8vmin;
    }
    .btn_profile:hover{
        font-size: 3vmin;
    }
    .card-group{
        @media screen and (max-width: 768px){
            flex-direction: column;
        }
        @media screen and (min-width: 768px) and (max-width: 1023px){
            flex-direction: column;
        }
    }
</style>
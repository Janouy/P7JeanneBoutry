<template>
    <div>
    <div id="nav">
        <router-link to="/groupomania/main" v-if="mode == 'view'"> Accueil </router-link>
    </div>
    <div class="container">
        <div class='card'>
        <div class="row">
        <div class="card_title col-4 h2 " v-if="mode == 'view'"> Profil </div>
        <div class="card_title col-4 h2 " v-else> Modification de votre Profil... </div>
    </div>

    <div class="card" v-if="mode == 'view'">
        <div class="card-img-top" v-if="this.profilePicture == 'NULL'" v-show="false"></div>
        <div class="card-img-top" v-else v-show="true">
            <img class="publication_image" :src=this.profilePicture>
        </div>
        <div class="card-text my-3 mx-3 border"> {{this.email}} </div>
        <div class="card-text my-3 mx-3 border"> {{this.firstName}}</div>
        <div class="card-text my-3 mx-3 border"> {{this.lastName}}</div>
        <div class="card-text my-3 mx-3 border"> {{this.description}}</div>
        <button class="btn col-3 my-3 mx-3" @click ="modifyProfile()"> Modifier mon profil</button>
        <button type="submit" @click="displayMyPosts()" class="btn btn-primary col-3 my-3 mx-3"> Voir mes publications</button>
        <Disconnection/> <DeleteProfile/>
    </div>
    <form v-else>
        <div class="card-img-top" v-if="this.profilePicture == 'NULL'" v-show="false"> <img class="publication_image" :src=this.profilePicture> </div>
        <div class="card-img-top" v-else v-show="true"> 
            <img class="picture_profile" :src=this.profilePicture> 
        </div>
        <form enctype="multipart/form-data">
            <input @change="onFileChange()" id='file' type="file" ref="file" name="image" accept="image/x-png,image/gif,image/jpeg">
            <button type="submit" @click="sendPicture()"> Envoi </button>
            <button @click="deletePicture()" class="btn border"> Supprimer ctte photo</button> 
        </form>
        <div class="form-group"> Email:
            <input v-model="email" type="email" class="form-control my-3 mx-3"> 
        </div>
        <div class="form-group"> Prénom:
            <input v-model="firstName" type="text" class="form-control my-3 mx-3">
        </div>
        <div class="form-group"> Nom:
            <input v-model="lastName" type="text" class="form-control my-3 mx-3">
        </div>
        <div class="form-group"> Description:
            <input v-model="description" type="text" class="form-control my-3 mx-3">
        </div>
        <div class="form-group"> Nouveau mot de passe:
            <input v-model="password" type="password" class="form-control my-3 mx-3">
        </div>
        <button type="submit" @click="viewProfile()" class="btn btn-primary col-3 my-3 mx-3"> Retour</button>
        <button type="submit" @click="modify(), viewProfile()" class="btn btn-primary col-3 my-3 mx-3" :disabled ="!validatedFields || checkData"> Valider les modifications</button>
        </form>
    </div>
    <p v-if="mode == 'view'"></p>
    <p v-else> * Le formulaire n'accepte pas les caractères spéciaux </p>
    </div>
    </div>
</template>


<script>
import Disconnection from "../components/Deco.vue"
import DeleteProfile from "../components/DeleteProfile.vue"
export default {
    name: 'Profile',
    components:{
        Disconnection,
        DeleteProfile
    },
    data: function(){
        return{
            mode: 'view',
            email: '',
            password:'',
            firstName: '',
            lastName: '',
            description:'',
            profilePicture:'',
            file: null,
            newImage:'',
        }
    }, 
    computed:{
        validatedFields: function(){
            if(this.email != "" && this.firstName != "" && this.lastName != ""){
            return true;
        }else{
            return false;
            }
        },
        checkData: function(){
            let nameVerif = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
            let emailVerif = /^[\w'\-,.][^!¡?÷?¿/\\+=" "#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
            let passwordVerif = /^[\w'\-,.][^_!¡?÷?¿/\\+=#$%ˆ&(){}|~<>;:[\]]{2,}$/;
            if(this.password){
                if(nameVerif.test(this.firstName)== false || nameVerif.test(this.lastName)== false || emailVerif.test(this.email)== false || !this.email.includes('@')|| passwordVerif.test(this.password)== false || this.password.length < 12){
                return true;
            }else{
                return false;
            }
            }else{
                if(nameVerif.test(this.firstName)== false || nameVerif.test(this.lastName)== false || emailVerif.test(this.email)== false || !this.email.includes('@')){
                return true;
            }else{
                return false;
            }
            }
        },
    },
    methods:{
        displayMyPosts:function(){
            window.location.href = window.location.href + '/publications';
        },
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
            this.profilePicture = data.data[0].picture;
            this.description = data.data[0].description;
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
                    lastName: this.lastName,
                    password: this.password,
                    description: this.description,
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
                location.reload();
                alert("Une erreur est survenue, merci de vérifier les informations entrées.")
            });
        },
        onFileChange() {
            this.file = this.$refs.file.files[0];
            this.newImage = URL.createObjectURL(this.file)
        },
        sendPicture: function(){
            const formData = new FormData();
            formData.set("image", this.file);
            let userId = localStorage.getItem("userId");
            let url = "http://localhost:3000/api/pictures/" + userId;
            fetch(url,{
                method: "POST",
                headers: {Authorization: "Bearer " + localStorage.getItem("token") },
                body: formData,
            })
            .then(async res => {
                const data = await res.json();
                if (!res.ok) {
                    const error = (data && data.message) || res.statusText;
                    return Promise.reject(error);
                }
            location.reload();
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
            });
        }, 
        deletePicture: function(){
            let userId = localStorage.getItem('userId');
            let url = "http://localhost:3000/api/pictures/" + userId;
            fetch(url,{
                method: "delete",
                headers: {"Content-Type": "application/json", Authorization: "Bearer " + localStorage.getItem("token")}
            })
            .then(async res => {
                const data = await res.json();
                if (!res.ok) {
                const error = (data && data.message) || res.statusText;
                return Promise.reject(error);
            }
            alert("Votre photo de profil a bien été supprimée.");
            location.reload();
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
            });
        },
    },
    mounted(){
        this.displayProfile()
    },
}
</script>

<style lang="scss">
.picture_profile{
background-color: blue;
display: block;
max-width: 200px;
};

</style>

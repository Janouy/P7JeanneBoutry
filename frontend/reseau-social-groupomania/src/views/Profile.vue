<template>
    <div class="background">
        <div class="container pb-5">
            <navbar/>
            <header>
                <h1 class="col py-4">{{this.firstName}} {{this.lastName}}</h1>
            </header>
                <div class="card background-card" v-if="mode == 'view'">
                    <div class="card-img picture" v-if="this.profilePicture=='NULL' || !this.profilePicture"><img class="no_picture_profile" src="../assets/logos/user.png"/></div>
                    <div class="card-img picture" v-else>
                    <div class="picture_profile" :style="{backgroundImage: `url(${profilePicture})`}"  ></div>
                    </div>
                    <div class="card-group card_inside rounded mx-2 my-2">
                        <div class="card card_inside card_inside_1 rounded mx-2 pb-2 pb-md-0">
                            <div class="card-title text-left ml-4 mt-2 h5"> Ma bio: </div>
                            <div class="card-text mx-3 mb-3 px-2 py-2 border rounded text-left bg-light text-secondary" v-if="this.description =='null' || !this.description"> Vous n'avez renseigné aucune information sur vous</div>
                            <div class="card-text mx-3 mb-3 px-2 py-2 border rounded text-left bg-light" v-else> {{this.description}}</div>
                        </div>

                        <div class="card card_inside card_inside_2 rounded mx-2 py-2 mt-2 mt-lg-0">
                           <div>
                                <button class="btn btn_profile" @click ="modifyProfile()"> Modifier mon profil</button>
                            </div>
                            <div>
                                <button class="btn btn_profile" @click="displayMyPosts()"> Gérer mes publications </button>
                            </div>
                            <Disconnection/> 
                        </div>
                    </div>
                </div>
                <div class="card card_modify" v-else>
                    <div class="card-title h3 text-info my-4" > Modification de votre Profil... </div>
                    <div class="card-group">
                    <div class="card card_modify card_modify_inside rounded mx-4 mb-2 mb-xl-0">
                        <div class="card-img picture" v-if="this.profilePicture =='NULL' || !this.profilePicture"><img class="no_picture_profile" src="../assets/logos/user.png"/></div>
                        <div class="card-img picture" v-else>
                        <div class="picture_profile" :style="{backgroundImage: `url(${profilePicture})`}"  ></div>
                        </div>
                        <div @click="deletePicture(profilePicture)" class="delete_img text-right pr-2"><font-awesome-icon icon="times-circle" alt='suppression de la photo' aria-hidden="true"/><span>Supprimer cette photo</span> </div>
                        <form enctype="multipart/form-data" class="border bg-secondary text-light mx-2 mt-5 mb-2 rounded">
                            <label for="file" class="col-6 ml-3 mt-2 mb-3 h4 text-center">Modifier la photo:</label> <br/>
                            <input @change="onFileChange()" id='file' type="file" ref="file" name="image" accept="image/x-png,image/gif,image/jpeg"/>
                            <span> <button type="submit" class="btn btn-success col-5 my-4" @click="sendPicture()"> Envoi </button> </span>
                        </form>
                    </div>
                    <div class="card card_modify card_modify_inside rounded mx-4">
                        <form v-on:submit.prevent>
                            <div class="form-row">
                                <label for="firstNameInputModif" class="col-4 ml-3 mt-2 text-left">Prénom:*</label>
                                <input v-model="firstName" type="text" id="firstNameInputModif" class="form-control mb-3 mx-3 "/>
                            </div>
                            <div class="form-row">
                                <label for="lastNameInputModif" class="col-4 ml-3 mt-2 text-left">Nom:*</label>
                                <input v-model="lastName" type="text" id="lastNameInputModif" class="form-control mb-3 mx-3"/>
                            </div>
                            <div class="form-row">
                                <label for="bioInputModif" class="col-4 ml-3 mt-2 text-left">Bio:</label>
                                <textarea v-model="description" type="textarea" id="bioInputModif" maxlength="120" class="form-control mx-3 text-center" placeholder='Décrivez-vous...'></textarea>
                                <p class="info ml-4"> 120 caractères maximum</p>
                            </div>
                            <div class="form-row"> 
                                <label for="emailInputModif" class="col-4 ml-3 mt-2 text-left">Email:*</label>
                                <input v-model="email" type="email" id="emailInputModif" class="form-control mb-3 mx-3"/> 
                            </div>
                            <div class="form-row"> 
                                <label for="passwordInputModif" class="col-6 ml-3 mt-2 text-left">Nouveau mot de passe:</label>
                                <input v-model="password" type="password" id="passwordInputModif" class="form-control mb-3 mx-3"/>
                            </div>
                            <button type="submit" @click="modify(), viewProfile()" class="btn btn-success col-6 col-xs-4 col-xl-6 mb-3 ml-2" :disabled ="!validatedFields || checkData"> Valider les modifications</button>
                        </form>
                    </div>
                    </div>
                    <span class="card-footer text-center mt-3 pt-4"> <button type="submit" @click="viewProfile()" class="btn btn-info col-4 col-xs-4 col-xl-6 ml-3 mb-3"> Retour au profil</button> </span>
                </div>
            <p v-if="mode == 'view'"></p>
            <p v-else> * Le formulaire n'accepte pas les caractères spéciaux </p>
            <div class="row" v-if="mode == 'view'"> <DeleteProfile/></div>
        </div>
    </div>
</template>


<script>
import Disconnection from "../components/Deco.vue"
import DeleteProfile from "../components/DeleteProfile.vue"
import Navbar from "../components/Navbar.vue"
export default {
    name: 'Profile',
    components:{
        Disconnection,
        DeleteProfile,
        Navbar
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
            if(this.password){
                if(nameVerif.test(this.firstName)== false || nameVerif.test(this.lastName)== false || emailVerif.test(this.email)== false || !this.email.includes('@')|| this.password.length < 12){
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
            this.displayProfile();
        },
        modifyProfile: function(){
            this.mode = 'modify';
            this.displayProfile();
        },
        displayProfile: function(){
            let userId = sessionStorage.getItem("userId");
            let url = "http://localhost:3000/api/users/" + userId;
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
            this.email = data.data[0].email;
            this.lastName = data.data[0].lastName;
            this.firstName = data.data[0].firstName;
            this.profilePicture = data.data[0].picture;
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
        modify: function(){
            let userId = sessionStorage.getItem("userId");
            let url = "http://localhost:3000/api/users/" + userId;
            fetch(url,{
                method: "Put",
                headers: {"Content-Type": "application/json", Authorization: "Bearer " + sessionStorage.getItem("token")},
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
                alert('Votre profil a bien été modifié');
                this.displayProfile();
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
        onFileChange() {
            this.file = this.$refs.file.files[0];
            this.newImage = URL.createObjectURL(this.file)
        },
        sendPicture: function(){
            const formData = new FormData();
            formData.set("image", this.file);
            let userId = sessionStorage.getItem("userId");
            let url = "http://localhost:3000/api/pictures/" + userId;
            fetch(url,{
                method: "POST",
                headers: {Authorization: "Bearer " + sessionStorage.getItem("token") },
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
                if(error == 'Unauthorized'){
                    alert('Votre session a expiré vous allez être redirigé vers la page de connexion')
                    sessionStorage.clear();
                    window.location.href = '/';
                }else{
                    console.error('There was an error!', error);
                }
            });
        }, 
        deletePicture: function(element){
            if (element == 'null' || !element){
                alert("Vous n'avez aucune photo de profile")
            }else{
            let userId = sessionStorage.getItem('userId');
            let url = "http://localhost:3000/api/pictures/" + userId;
            fetch(url,{
                method: "delete",
                headers: {"Content-Type": "application/json", Authorization: "Bearer " + sessionStorage.getItem("token")}
            })
            .then(async res => {
                const data = await res.json();
                if (!res.ok) {
                const error = (data && data.message) || res.statusText;
                return Promise.reject(error);
            }
            alert("Votre photo de profil a bien été supprimée.");
            this.displayProfile();
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
            }
        },
    },
    mounted(){
        this.displayProfile();
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
    .icon_home{
        font-size: 3vmin;
    }
    .card{
        box-shadow: 2px 2px 2px rgb(43, 42, 42);
        &_inside{
            box-shadow: none;
                &_1{
                    @media screen and (max-width: 768px){
                    }
                    @media screen and (min-width: 768px) and (max-width: 1023px){
                    }
                    @media screen and (min-width: 1024px) and (max-width: 1366px){
                        min-width: 70%;
                    }
                    @media screen and (min-width: 1367px){
                        min-width: 70%;
                    } 
                }
                &_2{
                    @media screen and (max-width: 768px){
                        
                    }
                    @media screen and (min-width: 768px) and (max-width: 1023px){
                        
                    }
                    @media screen and (min-width: 1024px) and (max-width: 1366px){
                        min-width: 25%;
                    }
                    @media screen and (min-width: 1367px){
                        min-width: 25%;
                    } 
                }
        }
        &_modify{
            &_inside{
                border: 2px yellow solid;
                background-color: #c5c8cc;
                @media screen and (max-width: 768px){

                }
                @media screen and (min-width: 768px) and (max-width: 1023px){
                    
                }
                @media screen and (min-width: 1024px) and (max-width: 1366px){
                   
                }
                @media screen and (min-width: 1367px){
                   
                } 
            }
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

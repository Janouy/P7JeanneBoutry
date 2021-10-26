<template>
<div class="container">
    <div class='card'>
        <div class="row">
            <div class="card_title col-4 h2 " v-if="mode == 'view'"> Profil </div>
            <div class="card_title col-4 h2 " v-else> Modification de votre Profil... </div>
        </div>

        <div class="card" v-if="mode == 'view'">
            <div class="card-img col-5 border"><img :src="image"/> </div>
            <div class="card-text my-3 mx-3 border"> {{this.email}} </div>
            <div class="card-text my-3 mx-3 border"> {{this.firstName}}</div>
            <div class="card-text my-3 mx-3 border"> {{this.lastName}}</div>
            <button class="btn col-3 my-3 mx-3" @click ="modifyProfile()"> Modifier mon profil</button>
            <Disconnection/>
        </div>
        <form method="put" enctype="multipart/form-data" v-else>
            <div class="form-group">
                <div v-if="!image">
                    <h3> Choississez une image...</h3>
                        <input class="form-control-file" type="file" name='image' @change="onFileChange"/>
                </div>
                <div v-else>
                    <img :src="image" />
                    <button @click="removeImage">Supprimez l'image...</button>
                </div>
            </div>
            <div class="form-group"> Email:
                <input v-model="email" type="email" class="form-control  my-3 mx-3"> 
            </div>
            <div class="form-group"> Prénom:
                <input v-model="firstName" type="text" class="form-control my-3 mx-3">
            </div>
            <div class="form-group"> Nom:
                <input v-model="lastName" type="text" class="form-control my-3 mx-3">
            </div>
            <button type="button" @click="modify(), viewProfile()" class="btn btn-primary col-3 my-3 mx-3"> Valider les modifications</button>
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
        lastName: '', 
        image:'',
        imageUrl:''
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
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + localStorage.getItem("token")},
                body: JSON.stringify({ 
                    email: this.email,
                    firstName: this.firstName,
                    lastName: this.lastName, 
                    image: this.imageUrl,
                    imageUrl: this.image
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
        onFileChange(e){
            let files = e.target.files || e.dataTransfer.files;
            if(!files.length)
            return;
            this.createImage(files[0]);
            this.imageUrl = files[0].name;
        },
        createImage(file){
            let reader = new FileReader();
            reader.onload = (e) => {
              this.image = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        removeImage: function(){
            this.image = '';
            this.imageUrl = 'NULL';
        }

    },
    created(){
        this.displayProfile()
    },
}
</script>

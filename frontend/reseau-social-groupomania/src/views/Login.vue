<template>
<div class="container">
    <div class='card'>
        <p class="card_title h2" v-if="mode == 'login'"> Connexion </p>
        <p class="card_title h2" v-else> Inscription </p>
        <p class="card_subtitle" v-if="mode== 'login'"> Vous n'avez pas encore de compte?<span class="card_action" @click="switchToCreateAccount()"> Créer un compte </span> </p>
         <p class="card_subtitle" v-else> Vous possédez déjà un compte ?<span class="card_action" @click="switchToLogin()"> Se connecter. </span> </p>
            <div class="form-row">
                  <input v-model="email" type="email" class="form-control  my-3 mx-3" placeholder="Email">
            </div>
             <div class="form-row" v-if="mode == 'create'">
                  <input v-model="lastName" type="text" class="form-control my-3 mx-3" placeholder="Nom">

                  <input v-model="firstName" type="text" class="form-control my-3 mx-3" placeholder="prenom">
            </div>
            <div class="form-row">
                  <input v-model="password" type="password" class="form-control  my-3 mx-3" placeholder="mot de passe">
            </div>
                <div class='form-row'>
                <button @click ="loginAccount()" class="btn btn-primary col-3 my-3 mx-3" :class="{'disabled' : !validatedFields}" v-if="mode == 'login'">Se connecter</button>
                <button @click ="createAccount()" class="btn btn-primary col-3 my-3 mx-3" :class="{'disabled' : !validatedFields}" v-else> Créer un compte </button>
                </div>
            </div>
            </div>
</template>

<script>
export default{
    name: 'Login',
    data: function(){
        return{
            mode: 'login', 
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        }
    }, 
    computed:{
        validatedFields: function(){
            if (this.mode == 'create'){
            if(this.email != "" && this.password != "" && this.firstName != "" && this.lastName != ""){
                return true;
            }else{
                return false;
            }
            }else{
                if(this.email != "" && this.password != ""){
                    return true;
                }else{
                    return false;
                }
            }
        }
    },
    methods:{ 
        switchToCreateAccount: function(){
            this.mode = 'create';
        },
        switchToLogin: function(){
            this.mode = 'login';
        },
        createAccount: function(){
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                email: this.email,
                password: this.password,
                firstName: this.firstName,
                lastName: this.lastName
            })
        };
        fetch("http://localhost:3000/api/users/signup", requestOptions)
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
            }
            this.postId = data.id;
            alert ("Utilisateur créé !!");
        })
        .catch(error => {
            this.errorMessage = error;
            console.error('There was an error!', error);
            alert ("Cette adresse email est déjà utilisée sur un autre compte.")
        });
        },
        loginAccount: function(){
                  const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                email: this.email,
                password: this.password
            })
        };
        fetch("http://localhost:3000/api/users/login", requestOptions)
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
            }
            this.postId = data.id;
            alert ("Connexion réussie !!");
        })
        .catch(error => {
            this.errorMessage = error;
            console.error('There was an error!', error);
            alert ("Utilisateur non trouvé.")
        });
        },
    }
}

</script>

<style scoped lang='scss'>

</style>





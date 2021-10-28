<template>
<div class="container">
    <div class='card'>
        <p class="card_title h2" v-if="mode == 'login'"> Connexion </p>
        <p class="card_title h2" v-else> Inscription </p>
        <p class="card_subtitle" v-if="mode== 'login'"> Vous n'avez pas encore de compte?<span class="card_action" @click="switchToCreateAccount()"> Créer un compte </span> </p>
         <p class="card_subtitle" v-else> Vous possédez déjà un compte ?<span class="card_action" @click="switchToLogin()"> Se connecter. </span> </p>
            <div class="form-row">
                  <input v-model="email" type="email" class="form-control  my-3 mx-3" placeholder="jean.dupont@email.fr*">
            </div>
             <div class="form-row" v-if="mode == 'create'">
                  <input v-model="lastName" type="text" class="form-control my-3 mx-3" placeholder="Nom*">
                  <input v-model="firstName" type="text" class="form-control my-3 mx-3" placeholder="prénom*">
            </div>
            <div class="form-row">
                  <input v-model="password" type="password" class="form-control my-3 mx-3" placeholder="le mot de passe doit contenir plus de 8 caractères*">
            </div>
                <div class='form-row'>
                <button @click="login()" class="btn btn-primary col-3 my-3 mx-3" :disabled ="!validatedFields || checkData" v-if="mode =='login'">Se connecter</button>
                <button @click="signup()" class="btn btn-primary col-3 my-3 mx-3" :disabled="!validatedFields || checkData" v-else> Créer un compte </button>
                </div>
            </div>
            <p> * Le formulaire n'accepte pas les caractères spéciaux </p>
            </div>
</template> 

<script>
export default{
    name: 'Login',
    data: function(){
        return{
            mode: 'login', 
            id: '',
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
        },
        checkData: function(){
            let nameVerif = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
            let emailVerif = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
            if(this.mode == 'create'){
            if(nameVerif.test(this.firstName)== false || nameVerif.test(this.lastName)== false || nameVerif.test(this.password)== false || emailVerif.test(this.email)== false || !this.email.includes('@')){
                return true;
            }
            return false;
            }else{
                 if(nameVerif.test(this.password)== false || emailVerif.test(this.email)== false || !this.email.includes('@')){
                     return true;
                 }else{
                     return false;
                 }

            }
        },
    },
    methods:{ 
        switchToCreateAccount: function(){
            this.mode = 'create';
        },
        switchToLogin: function(){
            this.mode = 'login';
        },
        signup: function(){
            this.mode = 'signup';
            fetch("http://localhost:3000/api/users/signup", {    
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    email: this.email,
                    password: this.password,
                    firstName: this.firstName,
                    lastName: this.lastName, 
                })
            })
            .then(async res => {
                const data = await res.json();
                if (!res.ok) {
                    const error = (data && data.message) || res.status;
                    return Promise.reject(error);
                }
                this.postId = data.id;
                fetch("http://localhost:3000/api/users/login",{
                    method: "POST",
                    headers: { "Content-Type": "application/json", Authorization: "Bearer " + localStorage.getItem("token")},
                    body: JSON.stringify({ 
                        email: this.email,
                        password: this.password, 
                    })
                })
                .then(async res => {
                const data = await res.json();
                if (!res.ok) {
                const error = (data && data.message) || res.status;
                return Promise.reject(error);
                }
                this.postId = data.id;
                localStorage.setItem("token", data.token);
                localStorage.setItem('userId', data.id);
                window.location.href = window.location.href + 'groupomania/main';
                
        })
            })
            .catch(error => {
                this.errorMessage = error;
                console.error('There was an error!', error);
                alert("Un compte existe déjà avec cette adresse email, en cas d'oublie de mot de passe, merci de contacter le support.")
                this.switchToCreateAccount();
                });
        },
        login: function(){
        fetch("http://localhost:3000/api/users/login",{
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: "Bearer " + localStorage.getItem("token")},
            body: JSON.stringify({ 
                email: this.email,
                password: this.password, 
            })
        })
        .then(async res => {
            const data = await res.json();
            if (!res.ok) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
            }
            this.postId = data.id;
            localStorage.setItem("token", data.token);
            localStorage.setItem('userId', data.id);
            window.location.href = window.location.href + 'groupomania/main';
        })
        .catch(error => {
            this.errorMessage = error;
            console.error('There was an error!', error);
            alert ("Identifiants incorrects.")
            });
        },
    },
}

</script>

<style scoped lang='scss'>

</style>





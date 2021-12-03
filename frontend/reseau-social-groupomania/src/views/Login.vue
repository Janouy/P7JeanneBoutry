<template>
    <div class="container-fluid background-logo">
    <h1 class="col-12 my-4"> Bienvenue sur Groupomania People </h1>
    <div class="container">
        <div class='card'>
            <header>
                <h2 class="card_title h2" v-if="mode == 'login'"> Connexion </h2>
                <p class="card_title h2" v-else> Inscription </p>
                <p class="card_subtitle" v-if="mode== 'login'"> Vous n'avez pas encore de compte ?<span class="card_action" @click="switchToCreateAccount()"> Créer un compte </span> </p>
                <p class="card_subtitle" v-else> Vous possédez déjà un compte ?<span class="card_action" @click="switchToLogin()"> Se connecter. </span> </p>
            </header>
            <section>
                <form v-on:submit.prevent>
                    <div class="form-row" v-if="mode == 'create'">
                        <label for="emailInput" class="mx-3">Email:</label>
                        <input v-model="email" type="email" class="form-control mx-3" id="emailInput" placeholder="*">
                    </div>
                    <div class="form-row" v-else>
                        <label for="email" class="mx-3">Email:</label>
                        <input v-model="email" type="email" class="form-control mx-3" id="email" placeholder="email">
                    </div>
                    <div class="form-row" v-if="mode == 'create'">
                        <label for="lastnameInput" class="mx-3">Nom:</label>
                        <input v-model="lastName" type="text" class="form-control mx-3" id="lastnameInput" placeholder="*">
                        <label for="firstnameInput" class="mx-3">Prénom:</label>
                        <input v-model="firstName" type="text" class="form-control mx-3" id="firstnameInput" placeholder="*">
                    </div>
                    <div class="form-row" v-if="mode == 'create'">
                        <label for="passwordInput" class="mx-3">Mot de passe:</label>
                        <input v-model="password" type="password" class="form-control my-3 mx-3" id="passwordInput" placeholder="le mot de passe doit contenir au moins 12 caractères*">
                    </div>
                    <div class="form-row" v-else>
                        <label for="password" class="mx-3">Mot de passe:</label>
                        <input v-model="password" type="password" class="form-control my-3 mx-3" id="password" placeholder="mot de passe">
                    </div>
                    <div class='form-row'>
                        <button id="connectButton" type="submit" @click="login()" class="btn btn-primary col-3 my-3 mx-3" :disabled ="!validatedFields || checkData" v-if="mode =='login'">Se connecter</button>
                        <button id="createAccountButton" type="submit" @click="signup()" class="btn btn-primary col-3 my-3 mx-3" :disabled="!validatedFields || checkData" v-else> Créer un compte </button>
                    </div>
                </form>
            </section>
        </div>
        <p  v-if="mode == 'create'">  * Le formulaire n'accepte pas les caractères spéciaux</p>
        <p v-else></p>
        </div>
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
            let emailVerif = /^[\w'\-,.][^!¡?÷?¿/\\+=" "#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
            let passwordVerif = /^[\w'\-,.][^_!¡?÷?¿/\\+=#$%ˆ&(){}|~<>;:[\]]{2,}$/;
            if(this.mode == 'create'){
            if(nameVerif.test(this.firstName)== false || nameVerif.test(this.lastName)== false || passwordVerif.test(this.password)== false || this.password.length < 12 || emailVerif.test(this.email)== false || !this.email.includes('@')){
                return true;
            }
            return false;
            }else{
                 if(passwordVerif.test(this.password)== false || emailVerif.test(this.email)== false || !this.email.includes('@')){
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
                    console.log(data.err);
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
                localStorage.setItem("token", data.token);
                localStorage.setItem('userId', data.id);
                localStorage.setItem('isAdmin', data.admin);
                window.location.href = window.location.href + 'groupomania/main';
                
        })
            })
            .catch(error => {
                this.errorMessage = error;
                console.error('There was an error!', error);
                alert("Une erreur est survenue, merci de vérifier les informations entrées.")
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
            localStorage.setItem("token", data.token);
            localStorage.setItem('userId', data.id);
            localStorage.setItem('isAdmin', data.admin);
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
.background-logo{
    background-image: url("../assets/logos/icon.png");
    background-repeat: no-repeat;
    background-size: 50%;
    background-position-x: 50%;
    background-position-y: 50%;
}
.card{
    opacity: .8;
}

</style>





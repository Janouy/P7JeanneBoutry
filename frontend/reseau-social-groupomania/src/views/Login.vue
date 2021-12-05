<template>

    <div class="background">
            <header>
                <h1 class="col-12 pt-4"> Bienvenue sur Groupomania People </h1>
            </header>
            <div class="container background-logo">
                <div class="container-fluid rounded">
                <div class='card card-login col-12 col-md-10 col-lg-6' v-if="mode == 'login'">
                    <section class="mt-3 bg-dark text-light rounded">
                        <h2 class="card_title pt-2 pt-md-0 "> Connexion </h2>
                        <p class="card_subtitle"> Vous n'avez pas encore de compte ?<span class="card_action" @click="switchToCreateAccount()"> Créez un compte </span> </p>
                    </section>
                    <section>
                        <form v-on:submit.prevent>
                            <div class="form-row">
                                <label for="email" class="mx-3 mt-3">Email:*</label>
                                <input v-model="email" type="email" class="form-control mx-3" id="email" required pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$">
                            </div>
                            <div class="form-row">
                                <label for="password" class="mx-3 mt-3">Mot de passe:*</label>
                                <input v-model="password" type="password" class="form-control mx-3" id="password" required minlength='12' pattern="^[\w'\-,.][^_!¡?÷?¿/\\+=#$%ˆ(){}|~<>;:[\]]{2,}$">
                            </div>
                            <div class='form-row mt-5'>
                                <button id="connectButton" type="submit" @click="login()" class="btn btn-success col-3 my-3 ml-3" :disabled ="!validatedFields || !checkData">Connexion</button>
                                <button class="btn btn-dark col-5 my-3 ml-2" type="reset"> Effacer les données</button>
                            </div>
                        </form>
                    </section>
                </div>
                <div class='card card-create col-12 col-md-12 col-lg-6 border-shadow-sm' v-else>
                    <section class="mt-3 bg-dark text-light rounded">
                        <h2 class="card_title pt-2 pt-md-0"> Inscription </h2>
                        <p class="card_subtitle"> Vous possédez déjà un compte ?<span class="card_action" @click="switchToLogin()"> Se connecter. </span> </p>
                    </section>
                    <section>
                        <form v-on:submit.prevent>
                            <div class="form-row">
                                <label for="lastnameInput" class="col-md-4 ml-3 mr-5 mt-3 text-left">Nom:*</label>
                                <label for="firstnameInputMd" class="d-none d-md-block col-md-4 ml-5 mt-3 text-left">Prénom:*</label>
                                <input v-model="firstName" type="text" class="form-control d-none d-md-block col-md-5 mx-3" id="firstnameInputMd"  required pattern="[A-Za-z' -]+">
                                <input v-model="lastName" type="text" class="form-control d-md-block col-md-5 mx-3 " id="lastnameInput"  required pattern="[A-Za-z' -]+">
                                <label for="firstnameInput" class="d-sm-block d-md-none col-md-4 ml-3 mt-3 text-left">Prénom:*</label>
                                <input v-model="firstName" type="text" class="form-control d-block d-md-none col-md-5 mx-3" id="firstnameInput"  required pattern="[A-Za-z' -]+">
                            </div>
                            <div class="form-row">
                                <label for="emailInput" class="mx-3 mt-3">Email:*</label>
                                <input v-model="email" type="email" class="form-control mx-3" id="emailInput"  required pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$">
                            </div>
                            <div class="form-row">
                                <label for="passwordInput" class="mx-3 mt-3">Mot de passe:*</label>
                                <input v-model="password" type="password" class="form-control mx-3" id="passwordInput" minlength='12' required pattern="^[\w'\-,.][^_!¡?÷?¿/\\+=#$%ˆ(){}|~<>;:[\]]{2,}$">
                                <div class="text-left">
                                    <div class="color valid-form ml-3 mt-1" :class="{color: isActive, 'text-danger': !checkPasswordLength}">le mot de passe contient plus de 12 caractères</div>                         
                                    <div class="color valid-form ml-3" :class="{color: isActive, 'text-danger': checkPassword }"> le mot de passe ne contient pas de caractères spéciaux</div>
                                </div>
                            </div>
                            <div class='form-row'>
                                <button id="createAccountButton" type="submit" @click="signup()" class="btn btn-info col-4 my-3 ml-3" :disabled="!validatedFields || !checkData"> Créer un compte </button>
                                <button class="btn btn-dark col-4 my-3 ml-2" type="reset"> Effacer les données</button>
                            </div>
                        </form>
                    </section>
                </div>
                <p  class="validForm mt-2" v-if="mode == 'create'">Le formulaire n'accepte pas les caractères spéciaux</p>
                <p v-else></p>
                </div>
            </div>
        <div><img class="img-fluid logoFooter" src="../assets/logos/icon-left-font.svg" alt="logo Groupomania"></div>
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
            lastName: '',
            isActive: true,
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
                return false;
            }
            return true;
            }else{
                 if(passwordVerif.test(this.password)== false || this.password.length < 12 || emailVerif.test(this.email)== false || !this.email.includes('@')){
                     return false;
                 }else{
                     return true;
                 }

            }
        },
        checkPassword: function(){
            let passwordVerif = /^[\w'\-,.][^_!¡?÷?¿/\\+=#$%ˆ&(){}|~<>;:[\]]{2,}$/;
            if(passwordVerif.test(this.password)== false){
                return true;
            }else{
                return false
            }
        },
        checkPasswordLength: function(){
            if(this.password.length >= 12 ){
                return true
            }else{
                return false
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
    mounted(){
        this.email='',
        this.password='',
        this.firstName= '',
        this.lastName= ''
    },
}
</script>

<style scoped lang='scss'>
    .logoFooter{
        background-color: rgb(240, 242, 245);
        margin-top: -3%;
        width: auto;
        height: 200px;
        z-index: 1;
    }
    .background-logo{
        background-image: url("../assets/logos/icon.svg");
        background-repeat: no-repeat;
        position: relative;
        z-index: 3;
        background-position: 50% 50%;
    } 
    .background{
        background-color: rgb(240, 242, 245);
        @media screen and (max-width: 768px){
            height: 900px;
        }
        @media screen and (min-width: 768px) and (max-width: 1023px){
            min-height: 1100px;
       }
        @media screen and (min-width: 1024px) and (max-width: 1366px){
            min-height:1300px;
       }
        @media screen and (min-width: 1367px){
            min-height:800px;
       }
    }
    .card-login{
        margin: 0 auto; 
        box-shadow: 6px 6px 6px rgb(43, 42, 42);
        opacity: 0.8;
        position: relative;
        z-index: 3;
        margin-top: 6%;
        @media screen and (max-width: 767px){
            height: 350px;
        }
        @media screen and (min-width: 768px) and (max-width: 1023px){
            height: 330px;
        }
        @media screen and (min-width: 1024px) and (max-width: 1366px){
            height: 400px;
        }
        @media screen and (min-width: 1367px){
            height: 400px;
        }
    }
    .card-create{
        margin: 0 auto; 
        box-shadow: 6px 6px 6px rgb(43, 42, 42);
        opacity: 0.8;
        position: relative;
        z-index: 3;
        margin-top: 6%;
    }
    h1{
        font-size: 7vmin;
        font-weight: bold;
        color:#FD2D01;
    }
    h2{
        font-size: 5vmin;
    }
    p{
        font-size: 2vmin;
    }
   input:focus:invalid{
        border: 2px dashed red;
    }
    .color{
        color: green;
        font-size: 1.8vmin;
    }
    .validForm, button, label{
        font-size: 1.8vmin;
        position: relative;
        z-index: 2;
    }
</style>





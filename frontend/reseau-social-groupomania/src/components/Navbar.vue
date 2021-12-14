<template>
    <div class="pt-3">
        <nav class='navbar navbar-expand bg-white rounded pt-3 text-left' id="nav"> <router-link to="/groupomania/main" class="return"><font-awesome-icon class='icon_home mr-2' icon="home" alt='retour page principale' aria-hidden="true"/>Accueil</router-link></nav>
    </div>
</template>

<script>
export default{
    name: "Navbar",
    methods: {
      
    }
}
</script>

<style lang="scss">
.navbar{
    font-size: 3vmin;
    background-image: url("../assets/logos/icon-left-font.png");
    background-size: 20%;
    background-position: 100% 50%;
    background-repeat: no-repeat;
    @media screen and (max-width: 768px){
        background-size: 50%;
    }
    @media screen and (min-width: 768px) and (max-width: 1023px){
            background-size: 50%;
    }
}
.return{
    color: #0B4720;
    font-size: 2.5vmin;
    font-weight: bold;
    &:hover{
    text-decoration: none;
    }
}
</style>
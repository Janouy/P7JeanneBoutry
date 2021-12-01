<template>
    <div class="btn-deco">
        <button @click = "disconnect()" class="btn-primary"> Déconnexion </button>
    </div>
</template>

<script>
export default{
    name: "Disconnection",
    methods: {
        disconnect(){
            localStorage.clear();
            window.location.href = '/';
        }
    }
}
</script>

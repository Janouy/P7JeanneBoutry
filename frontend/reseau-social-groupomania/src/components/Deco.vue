<template>
    <div class="btn-deco">
        <button @click = "disconnect()" class="btn btn_profile" aria-label="disconnection"> Déconnexion </button>
    </div>
</template>

<script>
export default{
    name: "Disconnection",
    methods: {
        disconnect(){
            sessionStorage.clear();
            window.location.href = '/';
        }
    }
}
</script>

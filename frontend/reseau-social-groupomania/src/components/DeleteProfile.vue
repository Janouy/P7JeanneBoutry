<template>
    <div class="col text-right btn-delete mr-2">
        <button @click = "deleteProfile()" class="btn-secondary rounded" aria-label="delete profile"><font-awesome-icon icon="user-times" alt='suppression du compte' aria-hidden="true"/></button>
        <span class="delete"> Supprimez définitivement votre compte et vos informations </span>
    </div>
</template>

<script>
export default{
    name: "DeleteProfile",
    methods: {
        deleteProfile: function(){
            let userId = sessionStorage.getItem("userId");
            let url = "http://localhost:3000/api/users/" + userId;
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
                sessionStorage.clear();
                window.location.href = '/';
                alert("Votre compte a bien été supprimé.");
                window.location.href = '/';
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
    }
}
</script>

<style scoped lang='scss'>
    .delete{
        font-size: 1.8vmin;
        color: #A30000;
    }
</style>

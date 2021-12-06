<template>
    <div class="col text-right btn-delete">
        <button @click = "deleteProfile()" class="btn-secondary rounded"><font-awesome-icon icon="user-times" alt='suppression du compte' aria-hidden="true"/></button>
        <span class="delete"> Supprimez définitivement votre compte et vos informations </span>
    </div>
</template>

<script>
export default{
    name: "DeleteProfile",
    methods: {
        deleteProfile: function(){
            let userId = localStorage.getItem("userId");
            let url = "http://localhost:3000/api/users/" + userId;
            fetch(url,{
                    method: "delete",
                    headers: {"Content-Type": "application/json", Authorization: "Bearer " + localStorage.getItem("token")}
            })
            .then(async res => {
                const data = await res.json();
                if (!res.ok) {
                    const error = (data && data.message) || res.statusText;
                    return Promise.reject(error);
                }
                localStorage.clear();
                window.location.href = '/';
                alert("Votre compte a bien été supprimé.");
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
                location.reload();
            });
        }
    }
}
</script>

<style scoped lang='scss'>
    .btn-delete{
        
    }
    .delete{
        font-size: 1.5vmin;
        color: #A30000;
    }
</style>

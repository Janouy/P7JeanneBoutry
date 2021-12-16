<template>
        <div class="row userName ml-0 ml-md-3 mb-4 pt-3">
            <div  v-if="this.picture =='NULL' || !this.picture"><img class="pict" src="../assets/logos/user.png"/></div>
            <div class="pict" v-else :style="{backgroundImage: `url(${picture})`}"></div>
            <div class="text-left mt-3 ml-3"><router-link to="/profile" class="connected">{{this.lastName}} {{this.firstName}}</router-link> </div>
        </div>
</template>

<script>
export default{
    name: "ConnectedUser",
    data: function(){
        return{
            lastName :'',
            firstName :'',
            picture: '',
            userId: sessionStorage.getItem('userId'),
        }
    },
    methods:{
        displayUser: function(){
            let userId = sessionStorage.getItem("userId");
            let url = "http://localhost:3000/api/users/" + userId;
            fetch(url,{
                method: "GET",
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + sessionStorage.getItem("token")},
            })
            .then(async res => {
                const data = await res.json();
            if (!res.ok) {
                const error = (data && data.message) || res.statusText;
                return Promise.reject(error);
            }
            this.lastName = data.data[0].lastName;
            this.firstName = data.data[0].firstName;
            this.picture = data.data[0].picture;
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
            });
        },
    },
    mounted(){
            this.displayUser()
        },
}
</script>

<style lang="scss">
.pict{
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    height: 50px;
    width: 50px;
    border-radius: 80px;
    border: 2px solid #169342;
}
.connected{
    color: #3d3d3d;
    font-weight: bold;
}
.connected:link{
    text-decoration:none;
}

</style>
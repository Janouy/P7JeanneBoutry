<template>
    <div class="row userName ml-5">
            <div class="pict" :style="{backgroundImage: `url(${picture})`}"></div>
            <div class="text-left mt-3 ml-1"><router-link to="/profile">{{this.lastName}} {{this.firstName}}</router-link> </div>
    </div>
</template>

<script>
export default{
    name: "DisplayConnectedUser",
    data: function(){
        return{
            lastName :'',
            firstName :'',
            picture: '',
            userId: localStorage.getItem('userId'),
        }
    },
    methods:{
        inlineBgImage(src) {
            let bgImage = require(src)

            return {
                backgroundImage: `url("${bgImage}")`,
            }
        },
        displayUser: function(){
            let userId = localStorage.getItem("userId");
            let url = "http://localhost:3000/api/users/" + userId;
            fetch(url,{
                method: "GET",
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + localStorage.getItem("token")},
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
}
</style>
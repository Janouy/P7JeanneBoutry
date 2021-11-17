<template>
<div class="btn-like">
    <button @click="liked(), likedPost()" class="btn" :disabled ="disabledLike"><font-awesome-icon icon="thumbs-up" /></button>
    <button @click="unliked(), likedPost()" class="btn" :disabled ="disabledUnlike" ><font-awesome-icon icon="thumbs-down"/></button>
    </div>
</template>

<script>
export default{
name: "LikePost",
    data: function(){
        return{
            like: 0,
            }
    },
    computed:{
        disabledLike: function(){
            if(this.like == -1){
                return true;
            }else{
                return false;
            }
        },
        disabledUnlike: function(){
            if(this.like == 1){
                return true;
            }else{
                return false;
            }
        },
    },
    methods: {
        liked: function(){
            if(this.like == 0){
                this.like +=  +1
            }else if (this.like == 1){
                this.like += -1
            }
        },
        unliked: function(){
            if(this.like == 0){
                this.like +=  -1
            }else if (this.like == -1){
                this.like += +1
            }
        },
        likedPost: function(){
        let userId = localStorage.getItem("userId"); 
        let url = "http://localhost:3000/api/texts/" + userId;
        fetch(url,{
            method: "POST",
            headers: {"Content-Type": "application/json",Authorization: "Bearer " + localStorage.getItem("token") },
            body: JSON.stringify({ 
            userId: userId,
            like: this.like,
            })
        })
        .then(async res => {
            const data = await res.json();
            if (!res.ok) {
                const error = (data && data.message) || res.statusText;
                return Promise.reject(error);
            }
        })
        .catch(error => {
            this.errorMessage = error;
            console.error("There was an error!", error);
        }); 
        },
    }
}
</script>
<template>
    <div class="col-3" >
    <div v-for="user in users" :key="user.id">
    <router-link :to="{name:'userPage', params:{id: user.userId}}"> {{user.name}} </router-link>
    </div>
    </div>
</template>

<script>
export default{
    name: "DisplayUsers",
    data: function(){
        return{
            users:[
            ],
        }
    },
    methods:{
        displayUsers: function(){
            let url = "http://localhost:3000/api/users"
            fetch(url,{
                method: "GET",
                headers: { "Content-Type": "application/json"},
            })
            .then(async res => {
                const data = await res.json();
            if (!res.ok) {
                const error = (data && data.message) || res.statusText;
                return Promise.reject(error);
            }
            for (let i=0; i<data.data.length; i++){
                this.users.push({name: data.data[i].firstName + ' ' + data.data[i].lastName, userId:data.data[i].id})
            }
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
            });
        },
        findId: function(e){
            this.userId += e
        }
    },
    created(){
            this.displayUsers()
        },
}
</script>

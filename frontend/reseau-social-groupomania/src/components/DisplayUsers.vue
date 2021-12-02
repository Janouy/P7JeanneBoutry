<template>
    <div class="col-3 allUsers">
        <p> Découvrez vos collaborateurs <p/>
        <form>
            <ul>
                <input type="text" v-model="inputFilter"/>
                <li v-for="user in filteredUsers" :key="user.id">
                    <router-link :to="{name:'userPage', params:{id: user.userId}}" v-if="user.userId == userId" v-show="display=false">{{user.name}}</router-link>
                    <router-link :to="{name:'userPage', params:{id: user.userId}}" v-else v-show="display=true">{{user.name}}</router-link>
                </li>
            </ul>
        </form>
    </div>
</template>

<script>
export default{
    name: "DisplayUsers",
    data: function(){
        return{
            users:[ 
            ],
            inputFilter:'',
            userId: localStorage.getItem('userId'),
        }
    },
    computed:{
        filteredUsers(){
            return this.users.filter((user) =>{
                const lowerCase = user.name.toLowerCase();
                return lowerCase.startsWith(this.inputFilter);
            })
        },
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
                    this.users.push({name: data.data[i].lastName + ' ' +data.data[i].firstName, userId:data.data[i].id})
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
    mounted(){
            this.displayUsers()
        },
}
</script>

<style lang="scss">
.allUsers{
    border: 1px black solid;

}
ul {
    list-style: none;
}
</style>
<template>
    <div class="col-2 ml-3 mb-5 rounded bg-light shadow">
        <div class="row">
            <p class="col-12 mt-2 "> Découvrez vos collaborateurs <p/>
            <form class="col-12 scroller">
                    <input type="text" v-model="inputFilter"/>
                    <li v-for="user in filteredUsers" :key="user.id">
                        <router-link :to="{name:'userPage', params:{id: user.userId}}" v-if="user.userId == userId" v-show="display=false">{{user.name}}</router-link>
                        <router-link :to="{name:'userPage', params:{id: user.userId}}" v-else v-show="display=true" class="user_name">{{user.name}}</router-link>
                    </li>
            </form>
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
            inputFilter:'',
            userId: sessionStorage.getItem('userId'),
        }
    },
    computed:{
        filteredUsers(){
            return this.users.filter((user) =>{
                const lowerCase = user.name.toLowerCase();
                return lowerCase.match(this.inputFilter.toLowerCase());
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
li {
    list-style: none;
    margin:0;
}
.user_name{
    text-decoration:none;
    color: black;
}
.scroller {
  width: 300px;
  height: 200px;
  overflow-y: scroll;
  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;
}
p{
    color:#169342;
    font-size: 2.8vmin;
}
</style>
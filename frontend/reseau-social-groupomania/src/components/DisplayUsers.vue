<template>
    <div class="col-3 mx-auto mb-5 rounded bg-secondary text-light shadow">
        <div class="row">
            <p class="col-12 mt-2"> Découvrez vos collaborateurs <p/>
            <form class="col-12 scroller">
                    <input type="text" v-model="inputFilter" placeholder="Recherche"/>
                    <li v-for="user in filteredUsers" :key="user.id">
                        <div class="mini_pict" v-if="user.userId == userId" v-show="display=false"></div>
                        <div class="mini_pict mt-3 border rounded bg-light" v-else v-show="display=true">
                            <div v-if="user.picture =='NULL' || !user.picture"><img class="pict mt-2" src="../assets/logos/user.png"/></div>
                            <div class="pict" v-else :style="{backgroundImage: `url(${user.picture})`}"></div>
                            <router-link :to="{name:'userPage', params:{id: user.userId}}" class="user_name">{{user.name}}</router-link>
                        </div>
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
                    this.users.push({name: data.data[i].lastName + ' ' +data.data[i].firstName, userId:data.data[i].id, picture: data.data[i].picture})
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

<style scoped lang="scss">
li {
    list-style: none;
    margin:0;
}
.user_name{
    text-decoration:none;
    color: black;
    position: relative;
    top: 20%;
    left: -5%;
}
.user_name:hover{
    color: #169342;
}
.scroller {
  width: 300px;
  height: 200px;
  overflow-y: scroll;
  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;
}
p{
    font-size: 2.8vmin;
}
.pict{
    float: left;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    height: 40px;
    width: 40px;
    border-radius: 80px;
    border: 2px solid #169342;
    margin-top: 1.8%;
    margin-left: 2%;
}
.mini_pict{
    height: 50px;
}
</style>
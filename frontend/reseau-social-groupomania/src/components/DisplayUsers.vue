<template>
    <div class="col rounded bg-secondary shadow">
        <div class="row">
            <form class="col-12 scroller">
                <label for="searchPeople" class="search_title mx-3 my-3 h5"> Découvrez vos collaborateurs</label>
                <input id="searchPeople" type="text" v-model="inputFilter" placeholder="Recherche"/>
                <div v-for="user in filteredUsers" :key="user.id">
                <div class="mini_pict" v-if="user.userId == userId" v-show="display=false"></div>
                <div class="mini_pict mt-3 rounded bg-light" v-else v-show="display=true">
                    <div v-if="user.picture =='NULL' || !user.picture"><img class="pict" src="../assets/logos/user.png" alt="logo user"/></div>
                    <div class="pict" v-else :style="{backgroundImage: `url(${user.picture})`}"></div>
                    <router-link :to="{name:'userPage', params:{id: user.userId}}" class="user_name ml-2 pb-2">{{user.name}}</router-link>
                </div>
                </div>
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
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + sessionStorage.getItem("token")},
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
#searchPeople{
    max-width: 80%;
}
.scroller {
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;
    @media screen and (max-width: 768px){
        height: 200px;
    }
    @media screen and (min-width: 768px) and (max-width: 1023px){
        height: 200px;
    }
    @media screen and (min-width: 1024px) and (max-width: 1366px){
        height: 500px;
    }
    @media screen and (min-width: 1367px){
        height: 500px;
    }
}
p{
    font-size: 2.8vmin;
}
.pict{
    float: left;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    border-radius: 80px;
    border: 2px solid #169342;
    @media screen and (max-width: 768px){
        margin-top: 0.5%;
        margin-left: 2%;
        height: 40px;
        width: 40px;
    }
    @media screen and (min-width: 768px) and (max-width: 1023px){
      margin-top: 1.8%;
      margin-left: 2%;
      height: 40px;
      width: 40px;
    }
    @media screen and (min-width: 1024px) and (max-width: 1366px){
        margin-top: 8%;
        margin-left: 2.5%;
        height: 40px;
        width: 40px;
    }
    @media screen and (min-width: 1367px){
       margin-top: 1.5%;
       margin-left: 2%;
       height: 40px;
       width: 40px;
    }
    
}
.mini_pict{
    font-size: 2vmin;
    @media screen and (max-width: 768px){
        height: 45px;
        width: 70%;
        margin: auto;
    }
    @media screen and (min-width: 769px) and (max-width: 1023px){
        height: 70px;
    }
    @media screen and (min-width: 1024px) and (max-width: 1366px){
        height: 70px;
    }
    @media screen and (min-width: 1367px){
       height: 50px;
    }
    label{
        color: black;
    }
}
</style>
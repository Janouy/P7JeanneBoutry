import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        posts:[],
        comms:[],
  },
    mutations: {
        DISPLAY_POSTS: function(state){
            let url = "http://localhost:3000/api/texts";
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
                state.posts = [];
                for (let i=0; i<data.data.length; i++){
                    if (data.data[i].user_id == null){
                        state.posts.push({likes: data.data[i].likes, dislikes: data.data[i].dislikes, name: 'Utilisateur supprimé', text : data.data[i].text, media :data.data[i].media, postId :data.data[i].id_post, comment:'', userIdDislike: (data.data[i].userDislikes).split(' '), userIdLike: (data.data[i].userLikes).split(' ')})
                    }else{
                        state.posts.push({userId: data.data[i].user_id, likes: data.data[i].likes, dislikes: data.data[i].dislikes, name :data.data[i].firstName + ' ' + data.data[i].lastName, text : data.data[i].text, media :data.data[i].media, postId :data.data[i].id_post, comment:'', userIdDislike: (data.data[i].userDislikes).split(' '), userIdLike: (data.data[i].userLikes).split(' '), picture:(data.data[i].picture)})
                    }
                }  
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
            });
        },
        DISPLAY_COMMENTS: function(state){
            let url = "http://localhost:3000/api/comments";
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
                state.comms = [];
                for (let i=0; i<data.data.length; i++){
                    state.comms.push({userId: data.data[i].id_user, idPost: data.data[i].id_post , comment :data.data[i].comment, name :data.data[i].firstName + ' ' + data.data[i].lastName + ' ' + 'a commenté:', commentId: data.data[i].id_comment}) 
                } 
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
            });
            },
    },
    actions: {
        recoverPosts({commit}){
            commit("DISPLAY_POSTS")
        },
        recoverComments({commit}){
            commit("DISPLAY_COMMENTS")
        },
    },
  modules: {
  }
})

<template>
    <div> 
        <div :id="'comm'+ commentId" class="comment px-2 mb-2 border bg-secondary text-white text-left" v-if="postId == idPost && userId != null"> 
            {{name}} {{comment}} 
            <button @click="deleteComment(commentId)" :id="commentId" class="btn" v-if="userId == comments[0].thisUserId || admin== 1"> <font-awesome-icon icon="times-circle" alt='suppression de la photo' aria-hidden="true" title="supprimer ce commentaire"/></button>
        </div>
        <div :class=" 'comment px-2 pt-2 mb-2 border bg-secondary text-white text-left comm'+ commentId" v-else-if="postId == idPost && userId == null"> 
            Utilisateur supprimé a commenté:  {{comment}} 
        </div>
    </div>
</template>

<script>
export default{
    name:'Comments',
    props:{
        commentId: Number,
        comment: String,
        userId: Number,
        idPost: Number,
        postId:Number,
        name: String,
    },
    data: function(){
        return{
            comments:[
                {thisUserId: sessionStorage.getItem("userId")}
            ],
            publis:[
            ],
            admin: sessionStorage.getItem('isAdmin'),
        }
    },
    methods:{
        deleteComment(commentId) {
			this.$emit("dropComment", commentId)
		},
    },
}
</script>

<style scoped lang="scss">
.comment{
    border-radius: 80px;
    display: inline-block;
    height: 35px;
    @media screen and (max-width: 768px){
        font-size: 12px;
    }
}
.btn{
    color: white;
}
</style>
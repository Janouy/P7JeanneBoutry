<template>
    <div class="mt-2"> 
        <div :id="'comm'+ commentId" class="comment pt-2 px-2 border bg-dark text-white text-left" v-if="postId == idPost && userId != null"> 
            {{name}} {{comment}} 
        </div>
        <button @click="deleteComment(commentId)" :id="commentId" class="btn" v-if="(postId == idPost && userId != null) && (userId == comments[0].thisUserId || admin== 1)" aria-label="delete picture"> <font-awesome-icon icon="times-circle" alt='suppression de la photo' aria-hidden="true" title="supprimer ce commentaire"/></button>
        <div :class=" 'comment pt-2 px-2 border bg-dark text-white text-left comm'+ commentId" v-else-if="postId == idPost && userId == null"> 
            Utilisateur supprimé a commenté:  {{comment}} 
        </div>
        <button @click="deleteComment(commentId)" :id="commentId" class="btn" v-if="(userId == comments[0].thisUserId || admin== 1) && (postId == idPost && userId == null)" aria-label="delete picture"> <font-awesome-icon icon="times-circle" alt='suppression de la photo' aria-hidden="true" title="supprimer ce commentaire"/></button>
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
    height: 42px;
    @media screen and (max-width: 768px){
        font-size: 12px;
    }
}
.btn{
    color: black;
}
</style>
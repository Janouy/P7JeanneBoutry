<template>
    <div>
        <div :class="'comm'+ commentId" v-if="postId == idPost && userId != null"> 
            {{name}} {{comment}} 
            <button @click="deleteComment(commentId)" :id="commentId" class="btn-primary" v-if="userId == comments[0].thisUserId"> Supprimer ce commentaire </button>
        </div>
        <div :class="'comm'+ commentId" v-else-if="postId == idPost && userId == null"> 
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
                {thisUserId: localStorage.getItem("userId")}
            ],
            publis:[
            ],
        }
    },
    methods:{
        deleteComment(commentId) {
			this.$emit("dropComment", commentId)
		},
    },
}
</script>

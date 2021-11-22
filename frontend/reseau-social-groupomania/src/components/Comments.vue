<template>
    <div>
        <div :class="'comm'+ commentId" v-if="postId == idpost"> 
            {{name}} {{comment}}
            <button @click="deleteComment(commentId)" :id="commentId" class="btn-primary" v-if="userId == comments[0].thisUserId"> Supprimer ce commentaire </button>
        </div>
    </div>
</template>

<script>
export default{
    name: "Comments",
    props:{
        userId: Number,
        postId: Number,
        comment: String,
        name: String,
        commentId: Number,
    },
    data: function(){
        return{
            idpost : '' // definir //
        }
    }, 
    methods: {
		deleteComment(commentId) {
			this.$emit("dropTheComment", commentId)
		}, 
	},
}
</script>

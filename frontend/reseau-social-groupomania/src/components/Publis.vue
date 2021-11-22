<template>
    <div>
        <div class="card border-info my-3 mx-5" v-if="text">
            <div class="card-text border" v-if="text"> 
                {{name}}
            </div>
            <div :id="'post'+ postId" class="card-text border" v-if="text">
                {{text}}
                    <div>
                        <button :id="'like'+postId" type="submit" @click="liked(userIdLike), likedPost(postId)" class="btn" :disabled ="disabledLike(userIdDislike)"><font-awesome-icon icon="thumbs-up"/><span>{{likes}}</span></button>
                        <button :id="'unlike'+postId" type="submit" @click="unliked(userIdDislike), likedPost(postId)" class="btn" :disabled ="disabledUnlike(userIdLike)"><font-awesome-icon icon="thumbs-down"/><span>{{dislikes}}</span></button>
                    </div>
                <div v-for="comment in comments" :key="comment.id">
                    <div :class="'comm'+ comment.commentId" v-if="comment.postId == postId"> 
                    {{comment.name}} {{comment.comment}}
                    <button @click="deleteComment(comment.commentId)" :id="comment.commentId" class="btn-primary" v-if="comment.userId == comments[0].thisUserId"> Supprimer ce commentaire </button>
                    </div>
                    </div>
                <div  class="card-text"> 
                    <input v-model="comment" :id="'post' + postId" type="textarea" class="form-control" placeholder="Ajoutez un commentaire..." > 
                    <button type="submit" @click="addComment(postId, comment)" class="card-btn" > Ajouter un commentaire</button>
                </div>
            </div>
        </div>
        <div class="card border-primary my-3 mx-5" v-if="media">
            <div class="card-text border" v-if="media"> 
                {{name}}
            </div>
            <div class="card-img border" v-if="media">
                <img class="publication_image" :src=media>
                <div>
                    <button :id="'like'+postId" type="submit" @click="liked(userIdLike), likedPost(postId)" class="btn" :disabled ="disabledLike(userIdDislike)"><font-awesome-icon icon="thumbs-up"/><span>{{likes}}</span></button>
                    <button :id="'unlike'+postId" type="submit" @click="unliked(userIdDislike), likedPost(postId)" class="btn" :disabled ="disabledUnlike(userIdLike)"><font-awesome-icon icon="thumbs-down"/><span>{{dislikes}}</span></button>
                </div>
                <div v-for="comment in comments" :key="comment.id">
                    <div :class="'comm'+ comment.commentId" v-if="comment.postId == postId"> 
                    {{comment.name}} {{comment.comment}} 
                    <button @click="deleteComment(comment.commentId)" class="btn-primary" v-if="comment.userId == comments[0].thisUserId"> Supprimer ce commentaire </button>
                    </div>
                </div>
                <div  class="card-text"> <input v-model="comment" :id="'post' + postId" type="textarea" class="form-control" placeholder="Ajoutez un commentaire..." > 
                    <button type="submit" @click="addComment(postId, comment)" class="card-btn" > Ajouter un commentaire</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name: "Publis",
    props:{
        name: String,
        text: String,
        media: String,
        postId: Number,
        likes: Number,
        dislikes: Number,
        comment: String,
        userIdDislike: Array,
        userIdLike: Array,
    },
    methods: {
		disabledLike(userIdDislike) {
			this.$emit("disablingLike", userIdDislike)
		},
        disabledUnlike(userIdLike) {
			this.$emit("disablingUnlike", userIdLike)
		},
    },
}
</script>
<template>
    <form enctype="multipart/form-data">
    <input @change="onFileChange()" id='file' type="file" ref="file" name="image" accept="image/x-png,image/gif,image/jpeg,image/jpg">
    <input @change="onFileChange()" id='file' type="file" ref="file" name="video" accept="video/mp4">
    <button type="submit" @click="sendMedia(), sendVideo()">Poster</button>
</form>
</template>

<script>
export default {
    name: 'Media',
    data: function(){
    return{
        file: null, 
        image:'',
        imageUrl:'',
        newImage:'',
        }
    },
    methods:{
         onFileChange() {
            this.file = this.$refs.file.files[0];
            this.newImage = URL.createObjectURL(this.file);
            console.log(this.file);
        },
        sendMedia: function(){
            const formData = new FormData();
            formData.set("image", this.file)
            let userId = localStorage.getItem("userId");
            let url = "http://localhost:3000/api/medias/" + userId;
            fetch(url,{
                method: "POST",
                headers: {Authorization: "Bearer " + localStorage.getItem("token") },
                body: formData,
            })
            .then(async res => {
                const data = await res.json();
                if (!res.ok) {
                    const error = (data && data.message) || res.statusText;
                    return Promise.reject(error);
                }
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
            });
        },    
        sendVideo: function(){
            console.log('test');
            const formData = new FormData();
            formData.set("video", this.file)
            let userId = localStorage.getItem("userId");
            let url = "http://localhost:3000/api/videos/" + userId;
            fetch(url,{
                method: "POST",
                headers: {Authorization: "Bearer " + localStorage.getItem("token") },
                body: formData,
            })
            .then(async res => {
                const data = await res.json();
                if (!res.ok) {
                    const error = (data && data.message) || res.statusText;
                    return Promise.reject(error);
                }
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
            });
        },      
    },     
}
</script>

<style scoped>

</style>

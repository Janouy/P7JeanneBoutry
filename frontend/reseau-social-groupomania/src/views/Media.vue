<template>
    <form enctype="multipart/form-data">
    <input @change="onFileChange()" id='file' type="file" ref="file" name="image">
    <button type="submit" @click="sendData()"> Envoi </button>
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
            this.newImage = URL.createObjectURL(this.file)
        },
        sendData: function(){
            const formData = new FormData();
            formData.set("image", this.file)
            let url = "http://localhost:3000/api/medias";
            fetch(url,{
                method: "POST",
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

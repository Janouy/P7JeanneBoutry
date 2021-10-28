<template>
    <form method="post" enctype="multipart/form-data" action="/upload">
    <input id='input' type="file" name="image">
    <button type="submit"  @click="sendData()"> clic </button>
</form>
</template>

<script>
export default {
    name: 'Test',

    data: function(){
    return{
        formData:{
        file:''
        }
        }
    },
    methods:{
        sendData: function(){
            let file = document.getElementById('input').file[0];
            console.log(file);
            
            fetch('http://localhost:3000/api/users/upload', { // Your POST endpoint
                method: 'POST',
                headers: {
                "Content-Type": "multipart/form-data"
                },
            body: 'test'
            }).then(
                response => response.json() 
            ).then(
                success => console.log(success) 
            ).catch(
                error => console.log(error) 
            );
            
        }
    }
}
</script>

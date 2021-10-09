<template>
    <div class='container'>
        <p> Test</p>
        <div class='row'>
            <div class='card bg-light'>
                 <div class="card-body px-0">
                      <a href='#' type="button" class='btn'><font-awesome-icon  icon="plus-circle" size='lg'/></a>
                     <div class='card-title bg-white pt-4 mt-3'> Créer un compte </div>
                     
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name: 'Connection'
}
</script>

<style scoped lang='scss'>
.card{
    width: 10rem;
    height: 180px;
}
.card:hover{
    box-shadow: 6px 6px 6px grey;
    
}
.card-title{
    width: 100%;
    height: 70px;
}
</style>





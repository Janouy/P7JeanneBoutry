<template>
  <div class="home">
    <Navigation/>
    <!-- <div class='logo'><img alt="Vue logo" src='../assets/logos/icon-left-font.png'></div> -->
    <HelloWorld msg="Bienvenue sur Groupomania People"/>
    <Connection/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Navigation from '@/components/Navigation.vue'
import Connection from '@/components/Connection.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Navigation, 
    Connection
  }
}
</script>

<style lang=scss>
.logo{
  border: 2px black solid;

}
</style>
<template>
  <div id="app">
    <font-awesome-icon icon="user-secret"/>
    <div id="nav">
      <router-link to="/profile"> profile</router-link> 
      <router-link to="/groupomania/main"> main</router-link>
    </div>
    <router-view/>

  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<Script>

   
</Script>

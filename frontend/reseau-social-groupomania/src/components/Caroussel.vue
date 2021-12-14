<template>
  <div id="carousel">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="5000"
      controls
      img-width="853"
      img-height="490"
      style="text-shadow: 1px 1px 2px #000;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
     <b-carousel-slide>
        <template #img >
          <img
            class="d-block img-fluid"
            width="853"
            height="490"
            src="../assets/caroussel/Groupomania_1.png"
            alt="image slot"
          >
        </template>
        <h2 class="h2_1"> "Spécialisé dans la grande distribution"</h2>
      </b-carousel-slide>
    
   <b-carousel-slide>
        <template #img>
          <img
            class="d-block img-fluid"
            width="853"
            height="490"
            src="../assets/caroussel/Groupomania_2.png"
            alt="image slot"
          >
        </template>
        <h2 class="h2_2"> "Nous sommes en pleine expansion"</h2>
      </b-carousel-slide>

     <b-carousel-slide >
        <template #img>
          <img
            class="d-block img-fluid"
            width="853"
            height="490"
            src="../assets/caroussel/Groupomania_3.png"
            alt="image slot"
          >
        </template>
         <h2 class="h2_3"> "Nous comptons actuellement plus de 600 collaborateurs"</h2>
      </b-carousel-slide>

  <b-carousel-slide>
        <template #img>
          <img
            class="d-block img-fluid"
            width="853"
            height="490"
            src="../assets/caroussel/Groupomania_4.png"
            alt="image slot"
          >
        </template>
        <h2 class="h2_4"> "Vous êtes 300 à nous avoir rejoint en 3 ans !"</h2>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
  export default {
    name:'Caroussel',
    methods: {
      onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = false
      }
    }
  }
</script>

<style scoped lang="scss">
#carousel{
    @media screen and (max-width: 1023px){
            display: none
    }
}
h2{
  font-size: 3vmin;
  color: black;
}

</style>
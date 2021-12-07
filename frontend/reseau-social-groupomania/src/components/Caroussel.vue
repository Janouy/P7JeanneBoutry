<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="5000"
      controls
      indicators
      img-width="853"
      img-height="490"
      style="text-shadow: 1px 1px 2px #000; color: #000"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
     <b-carousel-slide caption="Spécialisé dans la grande distribution">
        <template #img >
          <img
            class="d-block img-fluid"
            width="853"
            height="490"
            src="../assets/caroussel/Groupomania_1.png"
            alt="image slot"
          >
        </template>
      </b-carousel-slide>
    
   <b-carousel-slide caption="Groupomania est en pleine expansion">
        <template #img>
          <img
            class="d-block img-fluid"
            width="853"
            height="490"
            src="../assets/caroussel/Groupomania_2.png"
            alt="image slot"
          >
        </template>
      </b-carousel-slide>

     <b-carousel-slide caption="Nous comptons actuellement plus de 600 collaborateurs">
        <template #img>
          <img
            class="d-block img-fluid"
            width="853"
            height="490"
            src="../assets/caroussel/Groupomania_3.png"
            alt="image slot"
          >
        </template>
      </b-carousel-slide>

  <b-carousel-slide caption="Vous êtes 300 à nous avoir rejoint en 3 ans">
        <template #img>
          <img
            class="d-block img-fluid"
            width="853"
            height="490"
            src="../assets/caroussel/Groupomania_4.png"
            alt="image slot"
          >
        </template>
      </b-carousel-slide>

    </b-carousel>
  </div>
</template>

<script>
  export default {
    name:'Caroussel',
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
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
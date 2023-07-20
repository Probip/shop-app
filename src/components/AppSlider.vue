<template>
  <div class="slick-slider slider-container" id="slider-container">
    <img
      src="@/assets/Shape 1 copy 2.png"
      alt="Previous"
      class="app-slider-arrow app-slider-arrow-prev"
      @click="previousSlide"
    />
    <img
      src="@/assets/Shape 1 copy.png"
      alt="Next"
      class="app-slider-arrow app-slider-arrow-next"
      @click="nextSlide"
    />

    <transition-group :name="direction" tag="div" class="slide row">
      <div
        class="single-item-app-slider slide"
        v-for="(slide, index) in slider"
        :key="index"
        v-show="current_slide === index"
      >
        <div class=" absolute  left-3/4 text-center" :class="index==1 ? 'left-2/3 bottom-1/4' : 'top-0 pt-12'">
          <h1 class="text-bold text-lg" :class="index==2 ? 'text-white' : 'text-amber-900'">{{ slide.headline }}</h1>
          <button class="bg-lime-500 text-white text-bold rounded-md px-6 py-3 hover:bg-lime-600">
            <router-link :to="slide.goTo">{{ slide.btn }}</router-link>
          </button>
        </div>
        <img :src="getImage(slide.img)" :alt="slide.img" class="img-slick-slider" />
      </div>
    </transition-group>
  </div>
</template>
<script>
export default {
  name: 'AppSlider',
  data() {
    return {
      toggle: false,
      current_slide: 0,
      direction: 'slide-in',
      slideInterval: null,
      isSlideAnimating: false,
      slider: [
        {
          img: 'img4.png',
          btn: 'Shop now',
          headline: "Whole fruits. ",
          goTo: '/products',
        },
        {
          img: 'img5.png',
          btn: 'See all products',
          headline: "Organic veggies.",
          goTo: '/products',
        },
        {
          img: 'img1.png',
          btn: 'Buy now',
          headline: "Serve award-winning, premium smoothies in seconds!.",
          goTo: '/products',
        }
      ]
    }
  },
  methods: {
    getImage(img) {
      return new URL(`../assets/images/${img}`, import.meta.url).href;
    },
    nextSlide() {
      if (!this.isSlideAnimating) {
        this.isSlideAnimating = true
        const index = this.current_slide == this.slider.length - 1 ? 0 : this.current_slide + 1
        this.current_slide = index
        this.direction = 'slide-in'
        //console.log("Metoda nextSlide.");
        if (this.isSlideAnimating) {
          setTimeout(() => {
            this.isSlideAnimating = false
          }, 1300)
        }
      }
    },
    previousSlide() {
      if (!this.isSlideAnimating) {
        this.isSlideAnimating = true
        const index = this.current_slide == 0 ? this.slider.length - 1 : this.current_slide - 1
        this.current_slide = index
        this.direction = 'slide-out'
        //console.log("Metoda previousSlide.");
        if (this.isSlideAnimating) {
          setTimeout(() => {
            this.isSlideAnimating = false
          }, 1300)
        }
      }
    },
  },
  mounted() {
    if (!this.isSlideAnimating) {
      this.slideInterval = setInterval(() => {
        if (!this.isSlideAnimating) {
          this.nextSlide()
        }
      }, 12000)
    }
  }
}
</script>
<style lang="scss">
@mixin flexCenter {
  display: flex;
  justify-content: center;
  align-items: center;
}

$slick-prev-character: url('../assets/Shape\ 1\ copy\ 2.png');
$slick-next-character: url('../assets/Shape\ 1\ copy.png');
.slick-slider {
  grid-column: span 3;
  display: flex;
  position: relative;
  &#slider-container {
    height: 480px;
    .single-item-app-slider {
      position: absolute;
    }
  }
  .single-item-app-slider {
    width: 100%;
    display: inline-block;
    position: relative;
    .img-slick-slider {
      display: flex;
      width: 100%;
    }
    .carousel-text {
      padding: 30px;
      width: 100%;
      text-align: center;
      //background-image: url('/src/assets/gradient.png');
      position: absolute;
      bottom: 0%;
      h1 {
        font-size: 34px;
      }
      .btn-article {
        padding: 8px 20px;
        margin-top: 15px;
      }
    }
  }
}
.slider-container {
  overflow: hidden;
  position: relative;
}
.slide {
  width: 100%;
  min-width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  margin: 0;
  padding: 0;
}
.app-slider-arrow {
  position: absolute;
  top: 40%;
  z-index: 2;
  padding: 0 10px;
  cursor: pointer;
  opacity: 60%;
  &:hover {
    transition: 0.3s linear;
    opacity: 1;
  }
  &-next {
    right: 0;
  }
  &-prev {
    left: 0;
  }
}
.slide-in-enter-active,
.slide-in-leave-active,
.slide-out-enter-active,
.slide-out-leave-active {
  transition: all 1s ease-in-out;
}
.slide-in-enter-from {
  transform: translateX(100%);
}
.slide-in-leave-to {
  transform: translateX(-100%);
}
.slide-out-enter-from {
  transform: translateX(-100%);
}
.slide-out-leave-to {
  transform: translateX(100%);
}
</style>

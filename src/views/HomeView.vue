<template>
  <main>
    <app-slider />
    
    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-12 mt-8 mb-12 py-6">
      <h1 class="text-lime-500 text-bold text-xl text-center col-span-3"> Our mission</h1>
      <p class="text-lg">Everything we make is built on sustainably-sourced fruits and vegetables and crafted into delicious food that is actually good for you. We’re frozen for a reason—because our method means more nutrients, better flavor, and food that keeps up with the pace of your life. And—when you're juggling way more than you think you can, or you're taking the night off—our food is delivered to you and ready in minutes.</p>
      <img :src="getImage('img7.jpg')" alt="" class="col-span-2 rounded-lg mb-12">
      <img :src="getImage('img6.jpg')" alt="" class="col-span-2 rounded-lg mb-12" />
      <p class="text-lg">We freeze our ingredients at peak ripeness, typically within 24 hours of harvest, to lock in flavor and nutrients, reduce food waste, and eradicate the need for additives or harmful preservatives. This way, our food is always ready when you are.
        Speaking of wins, even a small commitment to eat less of the other stuff and more fruits + veggies can cut your carbon footprint by a third.
      </p>
      <h1 class="text-lime-500 text-bold text-xl text-center col-span-3"> What people say about us?</h1>
      <div class="border border-zinc-400 rounded-lg flex flex-col" v-for="(review,i) in reviews" :key="i">
        <img :src="getImage('reviews/'+review.img)" :alt="review.img" class="mb-4 rounded-t-lg"/>
        <p class="text-zinc-800 px-6 text-md">{{ review.text }}</p>
        <h3 class="text-right mt-2 pr-6 pb-4"><i class="font-lg text-zinc-500 text-bold">{{ review.user }}</i></h3>
      </div>
    </div>
    <app-google-map />
  </main>
</template>
<script >
import AppGoogleMap from '../components/AppGoogleMap.vue';
import AppSlider from '../components/AppSlider.vue';
export default {
  name: 'HomeView',
  components: {
  AppSlider,
  AppGoogleMap,
  },
  data() {
    return {
      reviews: [
        {
          img: 'user1.jpg',
          text: 'Fruits, spices, vegetables... all in one, made from the best quality products, and packaged in environmentally friendly packaging. What else could you wish for. When I make my smoothie, it looks like it´s made with freesly peeled fruit.',
          user: 'John ',
        },
        {
          img: 'user2.jpg',
          text: 'Just love your smoothies They are full of nutrients and that are tasting like fresh. I’m in love 😍 with these products. Thank you',
          user: 'Sarah',
        },
        {
          img: 'user3.jpg',
          text: 'Delicious, healthy, fun - and I love the compostable packaging. ',
          user: 'Dana',
        },
      ]
    }
  },
  methods: {
        getImage(img) {
        return new URL(`../assets/images/${img}`, import.meta.url).href;
        },
    }
}
</script>


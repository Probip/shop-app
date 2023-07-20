<template>
  <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-12">
    <div
      class="border border-zinc-300 rounded-md flex flex-col items-center xs:w-1/2 md:w-fit mx-auto"
      v-for="product in products"
      :key="product.id">
      <div class="overflow-hidden relative">
        <img :src="getImage(product.img)" :alt="product.name" class="hover:scale-125 transition duration-300" />
      </div>
      
      <router-link :to="`/products/${product.id}`" class="underline mt-4">
        {{ product.name }}
      </router-link>
      <div>
        {{ product.price }}$
      </div>
      <br />
      <button
        class="text-white px-3 py-1 rounded m-2 btn-custom"
        @click.prevent="cartStore.addToCart(product)"
      >
        Add to cart
      </button>
    </div>
  </div>
</template>
<script>
import { mapWritableState } from 'pinia'
import { mapStores } from 'pinia';
import useProductStore from '@/stores/product.js'
import useCartStore from '@/stores/cart.js'
export default {
  name: 'ProductsView',
  computed: {
    ...mapWritableState(useProductStore, ['products']),
    ...mapStores(useCartStore),
  },
  methods: {
    getImage(img) {
      return new URL(`../assets/images/products/${img}`, import.meta.url).href;
    },
  }
}
</script>
<style lang="scss">
  .btn-custom {
    background-color: #900E1E;
    &:hover {
      background-color: #7a0d1a;
      transition: 0.3s;
    }
  }
</style>

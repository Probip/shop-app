<template>
    <div>
        <router-link to="/products" class="text-lime-600 text-bold underline">Back to products</router-link>
        <div v-for="product in products" :key="product.id" v-show="$route.params.id == product.id" class="flex mt-6">
            
            <div class="overflow-hidden w-1/2 rounded-lg">
                <img :src="getImage(product.img)" :alt="product.name" class="hover:scale-125 transition duration-300" />
            </div>
            <div class="w-1/3 px-12">
                <h1 class="mb-4">Name: {{ product.name }}</h1>
                <p>Price: {{ product.price }}$</p>
                <button
                class="text-white px-5 py-2 my-6 rounded btn-custom"
                @click.prevent="cartStore.addToCart(product)"
                >
                    Add to cart
            </button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapWritableState } from 'pinia';
import { mapStores } from 'pinia';
import useProductStore from '@/stores/product.js';
import useCartStore from '@/stores/cart.js'
export default {
    name: "ProductView",
    computed: {
        ...mapWritableState(useProductStore, ["products"]),
        ...mapStores(useCartStore),
    },
    methods: {
    getImage(img) {
      return new URL(`../assets/images/products/${img}`, import.meta.url).href;
    },
  }
}
</script>
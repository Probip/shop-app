<template>
    <div class="w-full min-w-max min-h-full h-full absolute flex justify-end z-50" style="background-color: rgba(38, 38, 38, 0.8);">
        <button 
            class="animate-cart-in z-50 text-zinc-400 hover:text-zinc-600 bg-white text-bold rounded px-4 cursor-pointer absolute right-0 mt-2 top-0"
            @click="cartStore.isCartVisible = false">X
        </button>
        
        <div class="bg-white h-full absolute p-12 min-w-1/3 w-1/3 xs:w-full sm:w-full md:w-full lg:w-1/3 xl:w-1/3 animate-cart-in">
        <h1 class="text-lime-600 text-bold text-lg mb-4">Cart</h1>
        <ul>
            <li v-if="cartStore.cartItems.length <1">
                <p class="text-zinc-700">No items in the cart.</p>
            </li>
            <li v-else v-for="(product, i) in cartStore.cartItems" :key="i" class="product-cart pt-2">
                <div class="flex flex-row flex-wrap relative">
                    <button 
                        class="z-50 text-zinc-400 hover:text-zinc-600 bg-white text-xs rounded cursor-pointer absolute right-0 top-0"
                        @click="cartStore.cartItems.splice(i,1), cartStore.countItems()">Remove
                    </button>
                    <img :src="getImage(product.img)" alt="">
                    <div class="py-4 px-2">
                        <h3 class="mb-2">Product: {{ product.name }}</h3>
                        <p class="mb-2 text-sm text-zinc-700">Price (single item): {{ product.price }}$</p>
                        Quantity: <input type="number" name="quantity" max="100" min="1" v-model="product.quantity" class="ml-1 pl-2 border text-zinc-700 rounded"
                        @change="cartStore.countItems" /> ( <span>{{ product.price*product.quantity }}$</span> )
                    </div>
                </div>
                <hr class="mt-2">
            </li>
            <div class="flex flex-row justify-between mt-2 pr-4 pb-12">
                <h1 class="text-lime-600 text-bold text-lg mt-2">Total: {{ totalPrice }}$</h1>
                <button v-show="totalPrice>0" class="bg-lime-500 hover:bg-lime-600 text-white text-bold px-3 rounded-lg">Checkout</button>
            </div>
            
        </ul>
        
        </div>
    </div>
</template>
<script>
import { mapStores } from "pinia"
import useCartStore from '@/stores/cart.js';
export default {
    name: "AppCart",
    computed: {
        ...mapStores(useCartStore),
        totalPrice() {
            let total = 0;
            if(this.cartStore.cartItems.length>0){
                this.cartStore.cartItems.forEach((product) => {
                    if(product.quantity<= 0){ product.quantity =1;}
                    total += product.price*product.quantity; 
                });
            }
            return total;
        },
    },
    methods: {
        getImage(img) {
        return new URL(`../assets/images/products/${img}`, import.meta.url).href;
        },
    }
}
</script>
<style lang="scss">
    .product-cart {
        img {
            width: 100px;
            max-width: 100px;
        }
    }
    .animate-cart {
        &-in{
            animation-name: cart-animation;
            animation-duration: 1s;
        }
    }
    @keyframes cart-animation {
    from {transform: translateX(100%);}
    to {transform: translateX(0%);}
    }
</style>
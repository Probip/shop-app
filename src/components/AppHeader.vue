<template>
<app-auth />
<app-cart v-if="cartStore.isCartVisible" />
<header>
    <nav class="bg-lime-500 p-4 mb-4 text-white text-bold flex justify-between px-12">
        <router-link :to="{name: 'home'}" class="w-1/3" exact-active-class="no-active">SMOOTHIE</router-link>
      <ul class="w-1/3 flex justify-center">
        <li class="mx-2 w-1/3 cursor-pointer inline hover:text-lime-900 text-right"><router-link :to="{name: 'home'}">HOME</router-link></li>
        <li class="mx-2 w-1/3 cursor-pointer inline hover:text-lime-900 text-center"><router-link :to="{name: 'products'}">PRODUCTS</router-link></li>
      </ul>
      
      <ul class="flex w-1/3 justify-end">
        <li v-if="!userLoggedIn" class=" cursor-pointer  hover:text-lime-900">
          <i class="fa fa-user" aria-hidden="true"></i>
          <a @click.prevent="toggleModal('form')" class="mr-4">
          Login / Register
          </a>
        </li>
        <li  v-else class=" hover:text-lime-900">
          <a class="mr-4 cursor-pointer" @click.prevent="signOut">
            <i class="fa fa-user mr-1" aria-hidden="true"></i>
            Log Out
          </a>
        </li>
        <li>
          <a href="#" @click.prevent="cartStore.isCartVisible = true" class="relative">
            <i class="fa fa-cart-arrow-down text-lg cursor-pointer hover:text-lime-900" aria-hidden="true"></i>
            <div class="rounded-full absolute bottom-0 bg-amber-700 px-1 text-xs left-0 ml-4 mb-3">{{ cartStore.countedItems>0 ? cartStore.countedItems : ''}}</div>
            
          </a>
          
        </li>
      </ul>
    </nav>
  </header>
</template>
<script>
import AppAuth from '@/components/AppAuth.vue'
import { mapWritableState } from "pinia"
import useUserStore from "@/stores/user"
import { authentification } from '@/includes/firebase';
import { mapStores } from 'pinia';
import useModalStore from '@/stores/modal.js';
import AppCart from './AppCart.vue';
import useCartStore from '@/stores/cart.js'
export default {
    name: "AppHeader",
    components: {
        AppAuth,
        AppCart,
    },
    computed: {
        ...mapStores(useModalStore),
        ...mapStores(useCartStore),
        ...mapWritableState(useUserStore, ["userLoggedIn"]),
    },
    methods: {
        toggleModal(){
            this.modalStore.isOpen = !this.modalStore.isOpen;
        },
        async signOut() {
        await authentification.signOut();
        this.userLoggedIn = false;
        window.location.reload();
        }
    },
    created() {
        if(authentification.currentUser) {
        this.userLoggedIn = true;
        }
    }
}
</script>
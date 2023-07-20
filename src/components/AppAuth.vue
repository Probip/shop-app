<template>
  <div class="w-full min-w-max min-h-full h-full absolute flex justify-center z-50" :class="hiddenClass" style="background-color: rgba(38, 38, 38, 0.8);">
    <div class="bg-white border-2 border-zinc-400 rounded-lg w-1/3 max-w-lg mt-2 p-4 pt-6 h-max min-w-fit">
      <!--<h1 class="text-bold text-zinc-800 text-center">{{ formTab }}</h1>-->
      <button 
        class="text-white w-1/2 mt-4 py-1 rounded" 
        :class="formTab=='Log In' ? 'bg-amber-700 hover:bg-amber-800' : 'text-zinc-400 bg-white hover:text-zinc-500'" 
        @click.prevent="formTab='Log In', password_visible=false">
        Log In
      </button>
      <button 
        class="text-white w-1/2 mt-4 py-1 rounded" 
        :class="formTab=='Register' ? 'bg-amber-700 hover:bg-amber-800' : 'text-zinc-400 bg-white hover:text-zinc-500'"  
        @click.prevent="formTab='Register', password_visible=false">
        Sign Up
      </button>
      <login-form v-if="formTab=='Log In'" />
      <registration-form  v-if="formTab=='Register'"/>
    </div>
    <button 
        class="text-zinc-400 hover:text-zinc-600 bg-white text-bold rounded px-4 cursor-pointer absolute right-0 mr-10  mt-2 top-0"
        @click="isOpen = false">X
    </button>
  </div>
</template>
<script>
import { mapState, mapWritableState } from 'pinia';
import useModalStore from '@/stores/modal.js';
import LoginForm from './LoginForm.vue';
import RegistrationForm from './RegistrationForm.vue';
export default {
    name: "AppAuth",
    data() {
        return {
            formTab: "Log In",
        };
    },
    computed: {
        ...mapState(useModalStore, ["hiddenClass"]),
        ...mapWritableState(useModalStore, ["isOpen"]),
    },
    components: {
      LoginForm,
      RegistrationForm,
    }
}
</script>
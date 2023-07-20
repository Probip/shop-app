<template>
    <vee-form 
        class="flex flex-col justify-center"
        :validation-schema="loginSchema"
        @submit="login">
        <div v-if="login_show_alert" class=" text-white text-center py-4 mt-4 rounded" :class="login_bg_alert">{{ login_text_alert }}</div>
       
        <!--Email-->
        <div class="relative flex flex-col">
            <label for="email" class="mt-4 text-zinc-900">E-mail</label>
            <vee-field name="email" type="email" id="email"  placeholder="E-mail" class="focus:outline-none focus:border-zinc-900 border border-zinc-400 rounded px-2 py-1"/>
            <ErrorMessage class="text-red-500 text-xs absolute top-14 pt-5 right-0" name="email" />
        </div>
        <!--Password-->
        <div class="relative flex flex-col">
            <label for="password" class="mt-4 text-zinc-900">Password</label>
            <i class="fa text-zinc-500 hover:text-zinc-800 absolute right-0 bottom-0 pb-2 pr-2 cursor-pointer" 
            :class="password_visible ? ' fa-eye' : 'fa-eye-slash'" 
            aria-hidden="true"
            @click="password_visible = !password_visible"></i>
            <vee-field :type="password_visible ? 'text' : 'password'" name="password" id="password" class="focus:outline-none focus:border-zinc-900 border border-zinc-400 rounded px-2 py-1"/>
            <ErrorMessage class="text-red-500 text-xs absolute top-14 pt-5 right-0" name="password" />
        </div>
        <button class="bg-lime-500 hover:bg-lime-600 text-white text-bold rounded-md px-4 py-2 w-1/3 mx-auto my-5 min-w-fit">LOG IN</button>
    </vee-form>
</template>
<script>
import { ErrorMessage } from 'vee-validate';
import {authentification} from '@/includes/firebase';
import { mapWritableState } from 'pinia';
import useUserStore from '@/stores/user';
export default {
    name: "LoginForm",
    components: { 
      ErrorMessage,
    },
    data() {
        return {
            password_visible: false,
            login_in_submission: false,
            login_show_alert: false,
            login_text_alert: "",
            login_bg_alert: "",
            loginSchema: {
              email: "required|min:2|max:100|email",
              password: "required|min:8|max:100",
            }
        }
    },
    computed: {
      ...mapWritableState(useUserStore, ["userLoggedIn"])
    },
    methods: {
      async login(values){
        console.log(values);

        try {
          await authentification.signInWithEmailAndPassword(values.email, values.password);
          this.userLoggedIn= true;
          this.login_in_submission= true;
          this.login_show_alert = true;
          this.login_bg_alert= "bg-lime-600";
          this.login_text_alert ="Success! You are logged in.";
          window.location.reload();
        } catch (error) {
          this.login_show_alert = true;
          this.login_in_submission= false;
          this.login_bg_alert= "bg-red-800";
          this.login_text_alert ="Unexpected error accured. Please try again later";
          return;
        }
      }
    },
}
</script>
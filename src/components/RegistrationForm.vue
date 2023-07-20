<template>
    <vee-form 
        class="flex flex-col justify-center"
        :validation-schema="schema"
        @submit="register">
        <div v-if="show_alert" class=" text-white text-center py-8 rounded absolute w-1/3 top-0 left-1/3" :class="bg_alert">{{ text_alert }}</div>
        <!--Name-->
        <div class="relative flex flex-col">
          <label for="name" class="mt-4 text-zinc-900">Name</label>
          <vee-field name="name" type="text"  placeholder="Name" id="name" class="focus:outline-none focus:border-zinc-900 border border-zinc-400 rounded px-2 py-1" />
          <ErrorMessage class="text-red-500 text-xs absolute top-14 pt-5 right-0" name="name" />
        </div>
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
        <!--Password Confirm-->
        <div class="relative flex flex-col">
          <label for="password_confirm" class="mt-4 text-zinc-900">Confirm password</label>
          <i class="fa text-zinc-500 hover:text-zinc-800 absolute right-0 bottom-0 pb-2 pr-2 cursor-pointer" 
          :class="password_confirm_visible ? ' fa-eye' : 'fa-eye-slash'" 
          aria-hidden="true"
          @click="password_confirm_visible = !password_confirm_visible"></i>
          <vee-field name="password_confirm" :type="password_confirm_visible ? 'text' : 'password'" id="password_confirm" class="focus:outline-none focus:border-zinc-900 border border-zinc-400 rounded px-2 py-1"/>
          <ErrorMessage class="text-red-500 text-xs absolute top-14 pt-5 right-0" name="password_confirm" />
        </div>
        <div class="flex mt-4">
          <vee-field type="checkbox" name="termsOfService" id="termsOfService" value="1"/>
          <label class=" ml-2 text-zinc-800 text-sm" for="termsOfService">I state that I have read and understood the terms and conditions</label>
        </div>
        <ErrorMessage class="text-red-500 text-xs" name="termsOfService" />
        <button class="bg-lime-500 hover:bg-lime-600 text-white text-bold rounded-md px-4 py-2 w-1/3 mx-auto my-5 min-w-fit"
        :disabled="registration_in_submission">SUBMIT</button>
    </vee-form>
</template>
<script>
import { ErrorMessage } from 'vee-validate';
import {authentification, usersCollection} from '@/includes/firebase';
import { mapWritableState } from 'pinia';
import useUserStore from '@/stores/user';
export default {
    name: "RegistrationForm",
    components: { 
      ErrorMessage,
    },
    data() {
        return {
            password_visible: false,
            password_confirm_visible: false,
            registration_in_submission: false,
            bg_alert: "",
            text_alert: "",
            show_alert: false,
            schema: {
                name: "required|min:2|max:100|alphaSpaces",
                email: "required|min:2|max:100|email",
                password: "required|min:8|max:100",
                password_confirm: "required|confirmed:@password",
                termsOfService: "required",
            },
        }
    },
    computed: {
      ...mapWritableState(useUserStore, ["userLoggedIn"])
    },
    methods: {
      async register(values) {
        this.registration_in_submission = true;
        this.show_alert= true;
        this.bg_alert= "bg-zinc-600";
        this.text_alert= "Please wait.. your account is being created. ";
        let userCredentials=null;
        try {
          userCredentials = await authentification.createUserWithEmailAndPassword(values.email, values.password);
        
        } catch (error) {
          this.registration_in_submission= false;
          this.bg_alert= "bg-red-800";
          this.text_alert ="Unexpected error accured. Please try again later";
          return;
        }
       
        this.userLoggedIn= true;
        try {
          await usersCollection.doc(userCredentials.user.uid).set({
            name: values.name,
            email: values.email,
          });
        } catch (error) {
          this.registration_in_submission= false;
          this.bg_alert= "bg-red-800";
          this.text_alert ="Unexpected error accured. Please try again later";
          return;
        }

        await userCredentials.user.updateProfile({
          displayName: values.name,
        })
        this.bg_alert= "bg-lime-600";
        this.text_alert= "Success! Your account is created. ";
        window.location.reload();
        console.log(userCredentials);
      },
        
    },
}
</script>
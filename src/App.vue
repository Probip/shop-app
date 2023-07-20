<template >
  <app-header />
  <main class="container mx-auto max-w-screen-lg">
    <router-view></router-view>
  </main>
  <app-footer />
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter
  },
}
</script>

<template>
    <footer class="bg-lime-500 text-white px-12 py-6 mt-12">
        
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-12">
            <div class="flex flex-col justify-center items-center">
                <router-link to="/" class="mb-2">Home</router-link>
                <router-link to="/products" class="mb-2">Products</router-link>
            </div>
            <p class="text-center">Gajeva ulica 59,
                <br>10 000 Zagreb
                <br>Hrvatska
            </p>
            <router-link to="/products" class="flex flex-col justify-center items-center">
            <button
                class="text-white px-5 py-2 my-6 rounded btn-custom"
                >
                    Shop now
            </button>
        </router-link>
        </div>
    </footer>
</template>
<script>
export default {
    name: "AppFooter",
}
</script>
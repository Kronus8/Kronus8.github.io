<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Navigation from './components/Navigation.vue';
import Footer from './components/Footer.vue';
import Main from './components/Main.vue';
</script>

<template>
    <div class="bg-white dark:bg-black h-full w-full">
        <Navigation />
        <div class="space-y-14 lg:space-y-24">
            <main class="max-w-4xl mx-auto antialiased">
                <Main/>
            </main>
        </div>
        <Footer />
    </div>
</template>
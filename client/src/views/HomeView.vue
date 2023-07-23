<script setup>
import { storeToRefs } from "pinia";
import Sidenav from "@components/Sidenav.vue";
import Navbar from "@components/Navbar.vue";
import { useCommonStore } from "@stores/CommonStore";
const commonStore = useCommonStore();
const { getIsSidenavOpen } = storeToRefs(commonStore);
</script>

<template>
    <div class="flex">
        <div
            class="h-screen md:flex-none z-0 sm:w-0"
            :class="[getIsSidenavOpen ? 'md:w-64' : 'md:w-20']"
        >
            <Sidenav />
        </div>
        <div class="fixed top-0">
            <Navbar />
        </div>
        <div
            id="child-router-view"
            class="flex-grow pt-20 md:p-16 xs:p-8 xs:pt-20 mx-auto"
        >
            <router-view />
        </div>
    </div>
</template>

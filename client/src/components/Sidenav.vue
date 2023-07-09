<script setup>
import { storeToRefs } from "pinia";
import DashboardIcon from "@icons/DashboardIcon.vue";
import GroupIcon from "@icons/GroupIcon.vue";
import CashIcon from "@icons/CashIcon.vue";
import SignoutIcon from "@icons/SignoutIcon.vue";
import { useCommonStore } from "@stores/CommonStore";
const commonStore = useCommonStore();

const { getIsSidenavOpen } = storeToRefs(commonStore);

const isOpen = getIsSidenavOpen;

const openSidenav = () => {
    commonStore.toggleSidenav();
};

const navData = [
    {
        label: "Dashboard",
        icon: DashboardIcon,
        routerLink: "Dashboard",
    },
    {
        label: "Groups",
        icon: GroupIcon,
        routerLink: "Groups",
    },
    {
        label: "Expenses",
        icon: CashIcon,
        routerLink: "Expenses",
    },
];
</script>

<template>
    <aside
        id="logo-sidebar"
        class="fixed top-0 left-0 z-40 h-screen pt-16 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0"
        :class="[isOpen ? 'w-64' : 'w-20']"
        @click="openSidenav()"
        aria-label="Sidebar"
    >
        <div
            class="h-full px-3 pb-4 overflow-y-auto bg-white"
            :class="{ 'flex items-center flex-col': !isOpen }"
        >
            <ul class="space-y-2 font-medium">
                <li v-for="{ label, routerLink, icon } in navData" :key="label">
                    <router-link
                        :to="{ name: routerLink }"
                        class="flex items-center p-2 text-gray-900 rounded-lg"
                    >
                        <component :is="icon" class="w-6 h-6" />
                        <span class="ml-3" :class="{ hidden: !isOpen }">{{
                            label
                        }}</span>
                    </router-link>
                </li>
            </ul>
            <ul
                class="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200"
            >
                <li>
                    <router-link
                        :to="{ name: 'Login' }"
                        class="flex items-center p-2 text-gray-900 rounded-lg"
                    >
                        <SignoutIcon class="w-6 h-6" />
                        <span
                            class="flex-1 ml-3 whitespace-nowrap"
                            :class="{ hidden: !isOpen }"
                            >Sign Out</span
                        >
                    </router-link>
                </li>
            </ul>
        </div>
    </aside>
</template>
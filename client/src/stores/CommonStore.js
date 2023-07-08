import { defineStore } from "pinia";

export const useCommonStore = defineStore('CommonStore', {
    state: () => {
        return {
            isSidenavOpen: true,
        }
    },

    getters: {
        getIsSidenavOpen: (state) => state.isSidenavOpen
    },

    actions: {
        toggleSidenav() {
            this.isSidenavOpen = !this.isSidenavOpen
        }
    },
})
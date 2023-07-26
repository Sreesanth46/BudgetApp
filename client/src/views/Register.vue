<script setup>
import { reactive } from "vue";
import { register } from "../api/register.api";
import AppInput from "@/components/AppInput.vue";
import AppButton from "@/components/AppButton.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@stores/UserStore";
import { storeToRefs } from "pinia";

const router = useRouter();
const UserStore = useUserStore();
const { getStatus, getError } = storeToRefs(UserStore);

const emailForm = reactive({
    email: "",
});

async function handleSubmit() {
    await UserStore.register(emailForm);
}
</script>

<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div
            class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
        >
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
            >
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1
                        class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
                    >
                        Create an account
                    </h1>
                    <form class="space-y-4" @submit.prevent="handleSubmit">
                        <AppInput
                            v-model="emailForm.email"
                            :input-type="`email`"
                            :id="`register-email-input`"
                            name="Your email"
                            :placeholder="`name@company.com`"
                            required
                        />
                        <p class="text-sm text-red-500">{{ getError }}</p>
                        <AppButton> Create an account </AppButton>
                        <p
                            class="text-sm font-light text-gray-500 dark:text-gray-400"
                        >
                            Already have an account?
                            <router-link
                                :to="{ name: 'Login' }"
                                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >Login here</router-link
                            >
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

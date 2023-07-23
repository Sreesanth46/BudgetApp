<script setup>
import AppInput from "@/components/AppInput.vue";
</script>

<template>
    <div>
        <form class="space-y-4 md:space-y-4 w-1/2 p-6">
            <AppInput :id="`expense-id-input`" :name="`Expense Id`" required />
        </form>
    </div>
</template>

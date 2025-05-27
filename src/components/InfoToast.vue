<template>
    <div v-if="toastStore.message !== ''" class="w-full flex justify-end fixed z-50 right-0 mx-5 pointer-events-none">
        <div class="flex w-full max-w-sm py-5 px-6 text-gray-600 bg-white rounded-xl border border-gray-200 shadow-sm mb-4" role="alert">
            <div v-if="toastStore.type === 'error'" class="flex mr-5 my-auto items-center justify-center w-6 h-6 bg-red-400 rounded-full">
                <XMarkIcon class="h-4 w-4 text-white"/>
            </div> 
            <p class="text-base font-medium pt-0.5"> {{ toastStore.message }} </p>
            <div class="ml-auto flex justify-end items-center space-x-3">
                <icon-button @click="toastStore.message = ''"><XMarkIcon class="h-4 w-4"/></icon-button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useToastStore } from '@/stores/toast';
    import IconButton from './IconButton.vue';
    import { XMarkIcon } from '@heroicons/vue/24/solid';

    const toastStore = useToastStore();
</script>
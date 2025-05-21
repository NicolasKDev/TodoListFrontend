<template>
    <form @submit.prevent="taskStore.createTask" class="flex justify-center my-4">
        <input class="w-1/3 mx-1 px-2 py-1 rounded-xl bg-white shadow-md text-slate-800" type="text" placeholder="Nouvelle tâche" v-model="taskStore.newTask"></input>
        <simple-button>Ajouter une tâche</simple-button>
    </form>
</template>

<script setup>
    import SimpleButton from '@/components/SimpleButton.vue'
    import { useTaskStore } from '@/stores/task';
    
    const taskStore = useTaskStore();
</script>
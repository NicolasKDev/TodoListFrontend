<template>
    <draggable v-model="taskStore.tasks" item-key="id">
        <template #item="{ element: storeTask, index }">
            <div class="flex items-center justify-between gap-2 max-w-1/2 mx-auto p-2 bg-white rounded shadow hover:bg-emerald-300">
                <p>{{ id }}</p>
                <task-card :task="storeTask" @update-task="taskStore.patchTask(storeTask)" @delete-task="taskStore.deleteTask(storeTask)"/>
            </div>
        </template>
    </draggable>
</template>

<script setup>
    import { useTaskStore } from '@/stores/task';
    import { onMounted } from 'vue';
    import TaskCard from '@/components/TaskCard.vue';
    import draggable from 'vuedraggable';
    
    const taskStore = useTaskStore();
    
    onMounted(async () => {
        await taskStore.loadTasks();
    });

</script>
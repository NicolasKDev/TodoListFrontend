<template>
    <draggable v-model="tasksStore.tasks" item-key="order" @end="onDragEnd">
        <template #item="{ element: storeTask, index }" >
            <div class="flex items-center justify-between gap-2 max-w-1/2 mx-auto p-2 bg-white rounded shadow hover:bg-emerald-300">
                <task-card :task="storeTask" @update-task="(originalTitle) => tasksStore.patchTask(storeTask, originalTitle)" @delete-task="tasksStore.deleteTask(storeTask)"/>
            </div>
        </template>
    </draggable>
</template>

<script setup>
    import { useTasksStore } from '@/stores/tasks';
    import { onMounted } from 'vue';
    import TaskCard from '@/components/TaskCard.vue';
    import draggable from 'vuedraggable';
    
    const tasksStore = useTasksStore();

    /**
     * When the user drops a task card, this method is called.
     * It updates the order of the tasks from index (index +1) by calling updateOrdersFromIndex
     * then calls patchTask with the task at its new index.
     * The goal is to update the tasks in the backend API.
     * @param {object} event
     */
    const onDragEnd = (event) => {
        const newIndex = event.newIndex;
        tasksStore.updateOrdersFromIndex();
        tasksStore.patchTask(tasksStore.tasks[newIndex]);
    }
    
    onMounted(async () => {
        await tasksStore.loadTasks();
    });

</script>
<template>
    <div class="flex w-full items-center space-x-2">
        <input 
            class="form-checkbox appearance-none shrink-0 w-4 h-4 border-2 border-blue-300 rounded-sm mx-2 my-2.5 bg-white
            checked:border-blue-300 checked:bg-blue-500"
            type="checkbox" 
            v-model="task.completed"
            @change="emitUpdateTask(task)"></input>
        <div class="w-full" @click="enterEditMode" >
            <input 
                class="inline-block w-full lg:min-w-3xl rounded-xl px-2 py-1 mx-4 text-slate-800"
                type="text"
                v-if="modifyingId === task.id"  
                v-model="task.title" 
                v-focus 
                @blur="emitUpdateTask(task)" 
                @keyup.enter="emitUpdateTask(task)"
                @keyup.escape="exitEditMode"></input>
            <span 
                class="inline-block w-full px-2 py-1 break-words align-top mx-4 text-slate-800"
                :class="(task.completed) ? 'line-through' : ''"
                v-else 
                >{{ task.title }}</span>
        </div>
    </div>
    <icon-button @click="$emit('deleteTask')"><TrashIcon class="h-4 w-4"/></icon-button>
</template>

<script setup>
    import { ref } from 'vue';
    import { TrashIcon } from '@heroicons/vue/24/solid'
    import IconButton from '@/components/IconButton.vue'
    import { useTasksStore } from '@/stores/tasks';

    const tasksStore = useTasksStore();
    const emit = defineEmits(['updateTask', 'deleteTask']);
    let originalText = '';
    
    const props = defineProps({
        task: {}
    });
    const modifyingId = ref(null);

    const vFocus = {
        mounted: (el) => el.focus()
    };

    const enterEditMode = () => {
        modifyingId.value = props.task.id;
        originalText = props.task.title;
    }

    const exitEditMode = () => {
        props.task.title = originalText;
        modifyingId.value = null;
    }

    const emitUpdateTask = () => {
        modifyingId.value = null;
        emit('updateTask')
    };
</script>
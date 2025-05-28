import { apiGetTaskList, apiCreateNewTask, apiDeleteTask, apiPatchTask } from "@/services/taskService";
import { defineStore } from "pinia";
import { useToastStore } from '@/stores/toast';
import { ref } from "vue";

export const useTasksStore = defineStore('task', () => {
    const tasks = ref([]);
    const newTaskTitle = ref('');
    const maxTitleLength = 255;
    // Toast to show messages
    const toastStore = useToastStore();

    /**
     * Loads the list of tasks from the API and update the store state.
     * This method is used everytime an action is done in the backend API
     */
    const loadTasks = async () => {
        tasks.value = await apiGetTaskList();
    };

    /**
     * Creates a new task and call loadTasks to update the store.
     * If the new task title is too long, use a toast to show an error and reset the input field to empty.
     */
    const createTask = async () => {
        if (newTaskTitle.value.length > maxTitleLength) {
            toastStore.show('Task name is too long !', 'error');
            newTaskTitle.value = '';
            return;
        }
        const callResponse = await apiCreateNewTask(newTaskTitle.value)
        newTaskTitle.value = '';
        await loadTasks();
    };
    
    /**
     * Delete a task and call loadTasks to update the store.
     * @param {Task} task the task to delete
     */
    const deleteTask = async (task) => {
        const callResponse = await apiDeleteTask(task);
        await loadTasks();
    };
    
    /**
     * Patch a task and call loadTasks to update the store.
     * If the new title is too long, use a toast to show an error and reset the input field to its original value.
     * @param {Task} task the task to patch
     * @param {string} originalTitle the original title of the task, used to reset if the new title is too long
     */
    const patchTask = async (task, originalTitle) => {
        if (task.title.length > maxTitleLength) {
            toastStore.show('Task name is too long !', 'error');
            task.title = originalTitle;
            return;
        }
        const callResponse = await apiPatchTask(task);
        await loadTasks();
    };
    
    /**
     * Update the order of the tasks from the index.
     */
    const updateOrdersFromIndex = () => {
        tasks.value.forEach((task, index) => {
            task.order = index + 1;
        });
    };

    return { tasks, newTaskTitle, maxTitleLength, loadTasks, createTask, deleteTask, patchTask, updateOrdersFromIndex }
});
import { apiGetTaskList, apiCreateNewTask, apiDeleteTask, apiPatchTask } from "@/services/taskService";
import { defineStore } from "pinia";
import { useToastStore } from '@/stores/toast';
import { ref } from "vue";

export const useTasksStore = defineStore('task', () => {
    const tasks = ref([]);
    const newTask = ref('');
    const maxTitleLength = 255;
    const toastStore = useToastStore();

    const loadTasks = async () => {
        tasks.value = await apiGetTaskList();
    };
    const createTask = async () => {
        if (newTask.value.length > maxTitleLength) {
            toastStore.show('Task name is too long !', 'error');
            newTask.value = '';
            return;
        }
        const callResponse = await apiCreateNewTask(newTask.value)
        newTask.value = '';
        await loadTasks();
    };
    const deleteTask = async (task) => {
        const callResponse = await apiDeleteTask(task);
        await loadTasks();
    };
    const patchTask = async (task, originalTitle) => {
        if (task.title.length > maxTitleLength) {
            toastStore.show('Task name is too long !', 'error');
            task.title = originalTitle;
            return;
        }
        const callResponse = await apiPatchTask(task);
        await loadTasks();
    };
    const updateOrdersFromIndex = () => {
        tasks.value.map((task, index) => {
            task.order = index + 1;
        });
    };

    return { tasks, newTask, maxTitleLength, loadTasks, createTask, deleteTask, patchTask, updateOrdersFromIndex }
});
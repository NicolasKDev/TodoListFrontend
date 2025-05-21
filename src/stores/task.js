import { getTaskList, createNewTask, deleteTask, patchTask } from "@/services/taskService";
import { defineStore } from "pinia";

export const useTaskStore = defineStore('task', {
  state: () => ({
        tasks: [],
        newTask: ''
    }),
    actions: {
        async loadTasks() {
            this.tasks = await getTaskList();
        },
        async createTask() {
            const callResponse = await createNewTask(this.newTask)
            this.newTask = '';
            await this.loadTasks();
        },
        async deleteTask(task) {
            const callResponse = await deleteTask(task);
            await this.loadTasks();
        },
        async patchTask(task) {
            const callResponse = await patchTask(task);
            await this.loadTasks();
        },
    },
})
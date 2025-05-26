import axios from "axios";

const API_URL = 'http://localhost:8000/api/tasks'

export const apiGetTaskList = async () => {
    try {
        const res = await axios.get(API_URL);
        const tasklist = res.data.sort((a, b) => a.order - b.order);
        return tasklist;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            // Cas spécifique à axios
            console.error('Erreur Axios:', error.response.status, error.response.data);
        } else {
            // Autre type d’erreur (ex: problème JS, réseau, etc.)
            console.error('Erreur inattendue:', error);
        }
    }
};

export const apiCreateNewTask = async (newTask) => {
    if (newTask === '') {
        return;
    }
    try {
        await axios.post(API_URL, {
            title: newTask
        });
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            // Cas spécifique à axios
            console.error('Erreur Axios:', error.response.status, error.response.data);
        } else {
            // Autre type d’erreur (ex: problème JS, réseau, etc.)
            console.error('Erreur inattendue:', error);
        }
    }
};

export const apiDeleteTask = async (task) => {
    await axios.delete(API_URL + "/" + task.id);
};

export const apiPatchTask = async (task) => {
    try {
        await axios.patch(API_URL + "/" + task.id, task);
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            // Cas spécifique à axios
            console.error('Erreur Axios:', error.response.status, error.response.data);
        } else {
            // Autre type d’erreur (ex: problème JS, réseau, etc.)
            console.error('Erreur inattendue:', error);
        }
    }
};
import axios from "axios";

const API_URL = 'http://todolistapi.test/api/tasks'

export const getTaskList = async () => {
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

export const createNewTask = async (newTask) => {
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

export const deleteTask = async (task) => {
    await axios.delete(API_URL + "/" + task.id);
};

export const patchTask = async (task) => {
    console.log(task);
    try {
        const test = await axios.patch(API_URL + "/" + task.id, task);
        console.log(test)
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
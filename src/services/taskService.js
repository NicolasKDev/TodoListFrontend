import axios from "axios";

const API_URL = 'http://todolistapi.test/api/tasks'

export const getTaskList = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

export const createNewTask = async (newTask) => {
    if (newTask === '') {
        return;
    }
    await axios.post(API_URL, {
        title: newTask
    });
};

export const deleteTask = async (task) => {
    await axios.delete(API_URL + "/" + task.id);
};

export const patchTask = async (task) => {
    await axios.patch(API_URL + "/" + task.id, {
        title: task.title,
        completed: task.completed,
    });
};
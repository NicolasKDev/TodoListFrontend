import axios from "axios";
const API_URL = 'http://localhost:8000/api/tasks'

/**
 * Send a request to fetch the list of tasks from the backend API
 * @returns {Promise<Array<Task>>} A promise with an array of tasks sorted by order
 * @throws error if something is wrong
 */
export const apiGetTaskList = async () => {
    try {
        // Send a GET request to the backend API to fetch the list of tasks
        const res = await axios.get(API_URL);
        // Sort tasks with order before returning
        const tasklist = res.data.sort((a, b) => a.order - b.order);
        return tasklist;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            // Specific axios error
            console.error('Axios error:', error.response.status, error.response.data);
        } else {
            // Other error type (JS, network, etc.)
            console.error('Unexpected error:', error);
        }
        throw error; // Propagate error for later management
    }
};

/**
 * Send a request to create a new task in the backend API
 * @param {string} newTaskTitle the title of the task to create
 * @returns {Promise<void>} a promise when the task has been created
 * @throws error if something is wrong
 */
export const apiCreateNewTask = async (newTaskTitle) => {
    if (newTaskTitle === '') {
        return;
    }
    try {
        // Send a POST request to the backend API to create a new task
        await axios.post(API_URL, {
            title: newTaskTitle
        });
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            // Specific axios error
            console.error('Axios error:', error.response.status, error.response.data);
        } else {
            // Other error type (JS, network, etc.)
            console.error('Unexpected error:', error);
        }
        throw error; // Propagate error for later management
    }
};

/**
 * Send a request to delete a task from the backend API
 * @param {Task} task the task to delete
 * @returns {Promise<void>} a promise when the task has been deleted
 * @throws error if something is wrong
 */
export const apiDeleteTask = async (task) => {
    try {
        // Send a DELETE request to the backend API to delete the task
        await axios.delete(API_URL + "/" + task.id);
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            // Specific axios error
            console.error('Axios error:', error.response.status, error.response.data);
        } else {
            // Other error type (JS, network, etc.)
            console.error('Unexpected error:', error);
        }
        throw error; // Propagate error for later management
    }
};

/**
 * Send a request to update a task in the backend API
 * @param {Task} task the task to update
 * @returns {Promise<void>} a promise when the task has been updated
 * @throws error if something is wrong
 */
export const apiPatchTask = async (task) => {
    try {
        // Send a PATCH request to the backend API to update the task
        await axios.patch(API_URL + "/" + task.id, task);
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            // Specific axios error
            console.error('Axios error:', error.response.status, error.response.data);
        } else {
            // Other error type (JS, network, etc.)
            console.error('Unexpected error:', error);
        }
        throw error; // Propagate error for later management
    }
};
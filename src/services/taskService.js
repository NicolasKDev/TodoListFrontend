import axios from 'axios'
const API_URL = 'http://localhost:8000/api/tasks'

/**
 * Send a request to fetch the list of tasks from the backend API
 * @returns {Promise<Array<Task>>} A promise with an array of tasks sorted by order
 * @throws error if something is wrong
 */
export const apiGetTaskList = async () => {
  try {
    // Send a GET request to the backend API to fetch the list of tasks
    const res = await axios.get(API_URL)
    // Sort tasks with order before returning
    const tasklist = res.data.sort((a, b) => a.order - b.order)
    return tasklist
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Specific axios error
      console.error(
        'Axios error:',
        error.response?.status ?? 'Unknown status',
        error.response?.data ?? 'Unknown data',
      )
    } else {
      // Other error type (JS, network, etc.)
      console.error('Unexpected error:', error)
    }
    throw error // Propagate error for later management
  }
}

/**
 * Send a request to create a new task in the backend API
 * @param {string} newTaskTitle the title of the task to create
 * @returns {Promise<Response>} a promise with the API response when the task is created
 * @throws error if something is wrong
 */
export const apiCreateNewTask = async (newTaskTitle) => {
  if (newTaskTitle === '') {
    return { ok: false, data: null, message: 'Task title is required' }
  }
  try {
    // Send a POST request to the backend API to create a new task
    const response = await axios.post(API_URL, {
      title: newTaskTitle,
    })
    return { ok: true, data: response.data, message: 'success' }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Specific axios error
      console.error(
        'Axios error:',
        error.response?.status ?? 'Unknown status',
        error.response?.data ?? 'Unknown data',
      )
    } else {
      // Other error type (JS, network, etc.)
      console.error('Unexpected error:', error)
    }
    throw error // Propagate error for later management
  }
}

/**
 * Send a request to delete a task from the backend API
 * @param {Task} task the task to delete
 * @returns {Promise<Response>} a promise with the API response when the task is deleted
 * @throws error if something is wrong
 */
export const apiDeleteTask = async (task) => {
  try {
    // Send a DELETE request to the backend API to delete the task
    const response = await axios.delete(API_URL + '/' + task.id)
    return { ok: true, data: response.data, message: 'success' }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Specific axios error
      console.error(
        'Axios error:',
        error.response?.status ?? 'Unknown status',
        error.response?.data ?? 'Unknown data',
      )
    } else {
      // Other error type (JS, network, etc.)
      console.error('Unexpected error:', error)
    }
    throw error // Propagate error for later management
  }
}

/**
 * Send a request to update a task in the backend API
 * @param {Task} task the task to update
 * @returns {Promise<Response>} a promise with the API response when the task is updated
 * @throws error if something is wrong
 */
export const apiPatchTask = async (task) => {
  try {
    // Send a PATCH request to the backend API to update the task
    const response = await axios.patch(API_URL + '/' + task.id, task)
    return { ok: true, data: response.data, message: 'success' }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Specific axios error
      console.error(
        'Axios error:',
        error.response?.status ?? 'Unknown status',
        error.response?.data ?? 'Unknown data',
      )
    } else {
      // Other error type (JS, network, etc.)
      console.error('Unexpected error:', error)
    }
    throw error // Propagate error for later management
  }
}

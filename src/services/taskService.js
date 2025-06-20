import axios from 'axios'
import router from '@/router'
import { api } from '@/config/axios'

// Intercepteur pour gérer les erreurs d'authentification
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      router.push('/login')
    }
    return Promise.reject(error)
  },
)

/**
 * Send a request to fetch the list of tasks from the backend API
 * @returns {Promise<Array<Task>>} A promise with an array of tasks sorted by order
 * @throws error if something is wrong
 */
export const apiGetTaskList = async () => {
  try {
    const res = await api.get('/tasks')
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
    const response = await api.post('/tasks', {
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
    const response = await api.delete(`/tasks/${task.id}`)
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
    const response = await api.patch(`/tasks/${task.id}`, task)
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

import axios from 'axios'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  apiGetTaskList,
  apiCreateNewTask,
  apiDeleteTask,
  apiPatchTask,
} from '@/services/taskService'
const API_URL = 'http://localhost:8000/api/tasks'

vi.mock('axios')

describe('taskService.js', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('apiGetTaskList', () => {
    it('should return sorted task list on success', async () => {
      const tasks = [
        { id: 2, order: 2 },
        { id: 3, order: 3 },
        { id: 1, order: 1 },
      ]
      axios.get.mockResolvedValue({ data: tasks })

      const result = await apiGetTaskList()
      expect(result).toEqual([
        { id: 1, order: 1 },
        { id: 2, order: 2 },
        { id: 3, order: 3 },
      ])
      expect(axios.get).toHaveBeenCalledWith(API_URL)
    })

    it('should throw an error and log if axios fails', async () => {
      const error = { response: { status: 500, data: 'error' }, isAxiosError: true }
      axios.isAxiosError.mockReturnValue(true)
      axios.get.mockRejectedValue(error)

      await expect(apiGetTaskList()).rejects.toEqual(error)
    })

    it('should throw an error and log if there is a non axios fails', async () => {
      const error = { response: { status: 500, data: 'error' }, isAxiosError: true }
      axios.isAxiosError.mockReturnValue(false)
      axios.get.mockRejectedValue(error)

      await expect(apiGetTaskList()).rejects.toEqual(error)
    })
  })

  describe('apiCreateNewTask', () => {
    it('should return error response if title is empty', async () => {
      const result = await apiCreateNewTask('')
      expect(result).toEqual({
        ok: false,
        data: null,
        message: 'Task title is required',
      })
    })

    it('should return created task on success', async () => {
      const task = { id: 1, title: 'Test' }
      axios.post.mockResolvedValue({ data: task })

      const result = await apiCreateNewTask('Test')
      expect(result).toEqual({
        ok: true,
        data: task,
        message: 'success',
      })
      expect(axios.post).toHaveBeenCalledWith(API_URL, {
        title: 'Test',
      })
    })

    it('should throw if axios fails', async () => {
      const error = { response: { status: 500, data: 'fail' }, isAxiosError: true }
      axios.post.mockRejectedValue(error)
      axios.isAxiosError.mockReturnValue(true)

      await expect(apiCreateNewTask('Test')).rejects.toEqual(error)
      await expect(apiCreateNewTask('Test')).rejects.toThrow()
    })

    it('should throw if there is a non axios error', async () => {
      const error = { response: { status: 500, data: 'fail' }, isAxiosError: true }
      axios.isAxiosError.mockReturnValue(false)
      axios.post.mockRejectedValue(error)

      await expect(apiCreateNewTask('Test')).rejects.toEqual(error)
      await expect(apiCreateNewTask('Test')).rejects.toThrow()
    })
  })

  describe('apiDeleteTask', () => {
    it('should return success on delete', async () => {
      const task = { id: 1 }
      const response = { success: true }
      axios.delete.mockResolvedValue({ data: response })

      const result = await apiDeleteTask(task)
      expect(result).toEqual({
        ok: true,
        data: response,
        message: 'success',
      })
      expect(axios.delete).toHaveBeenCalledWith(`${API_URL}/1`)
    })

    it('should throw on axios error on delete', async () => {
      const error = { isAxiosError: true, response: { status: 500, data: 'fail' } }
      axios.isAxiosError.mockReturnValue(true)
      axios.delete.mockRejectedValue(error)

      await expect(apiDeleteTask({ id: 1 })).rejects.toEqual(error)
      await expect(apiDeleteTask({ id: 1 })).rejects.toThrow()
    })

    it('should throw on non axios error on delete', async () => {
      const error = { isAxiosError: true, response: { status: 500, data: 'fail' } }
      axios.isAxiosError.mockReturnValue(false)
      axios.delete.mockRejectedValue(error)

      await expect(apiDeleteTask({ id: 1 })).rejects.toEqual(error)
      await expect(apiDeleteTask({ id: 1 })).rejects.toThrow()
    })
  })

  describe('apiPatchTask', () => {
    it('should return success on patch', async () => {
      const task = { id: 1, title: 'Updated title' }
      axios.patch.mockResolvedValue({ data: task })

      const result = await apiPatchTask(task)
      expect(result).toEqual({
        ok: true,
        data: task,
        message: 'success',
      })
      expect(axios.patch).toHaveBeenCalledWith(`${API_URL}/1`, task)
    })

    it('should throw on axios error on patch', async () => {
      const error = { isAxiosError: true, response: { status: 400, data: 'fail' } }
      axios.isAxiosError.mockReturnValue(true)
      axios.patch.mockRejectedValue(error)

      await expect(apiPatchTask({ id: 1 })).rejects.toEqual(error)
      await expect(apiPatchTask({ id: 1 })).rejects.toThrow()
    })

    it('should throw on non axios error on patch', async () => {
      const error = { isAxiosError: true, response: { status: 400, data: 'fail' } }
      axios.isAxiosError.mockReturnValue(false)
      axios.patch.mockRejectedValue(error)

      await expect(apiPatchTask({ id: 1 })).rejects.toEqual(error)
      await expect(apiPatchTask({ id: 1 })).rejects.toThrow()
    })
  })
})

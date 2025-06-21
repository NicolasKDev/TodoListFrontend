import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useTasksStore } from '@/stores/tasks'

// Mock services
vi.mock('@/services/taskService', () => ({
  apiGetTaskList: vi.fn().mockResolvedValue([]),
  apiCreateNewTask: vi.fn(),
  apiDeleteTask: vi.fn(),
  apiPatchTask: vi.fn(),
}))

// Mock toast store
vi.mock('@/stores/toast', () => ({
  useToastStore: () => ({
    show: vi.fn(),
  }),
}))

// Mock filters store
vi.mock('@/stores/filters', () => ({
  useFiltersStore: () => ({
    applyFilters: vi.fn((tasks) => tasks),
  }),
}))

describe('Tasks Store', () => {
  let pinia

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
    vi.clearAllMocks()
  })

  it('initializes with correct default values', () => {
    const tasksStore = useTasksStore()
    expect(tasksStore.tasks).toEqual([])
    expect(tasksStore.newTaskTitle).toBe('')
    expect(tasksStore.maxTitleLength).toBe(255)
  })

  it('can add a task to the list', () => {
    const tasksStore = useTasksStore()
    const task = { id: 1, title: 'Test Task', order: 1 }
    tasksStore.tasks.push(task)
    expect(tasksStore.tasks).toHaveLength(1)
    expect(tasksStore.tasks[0]).toEqual(task)
  })

  it('can set the title of a new task', () => {
    const tasksStore = useTasksStore()
    tasksStore.newTaskTitle = 'New Task'
    expect(tasksStore.newTaskTitle).toBe('New Task')
  })

  it('can reset the store', () => {
    const tasksStore = useTasksStore()
    tasksStore.tasks = [{ id: 1, title: 'Test' }]
    tasksStore.newTaskTitle = 'Test'

    tasksStore.reset()

    expect(tasksStore.tasks).toEqual([])
    expect(tasksStore.newTaskTitle).toBe('')
  })

  it('can update task orders', () => {
    const tasksStore = useTasksStore()
    tasksStore.tasks = [
      { id: 1, title: 'Task 1', order: 3 },
      { id: 2, title: 'Task 2', order: 1 },
      { id: 3, title: 'Task 3', order: 2 },
    ]

    tasksStore.updateOrdersFromIndex()

    expect(tasksStore.tasks[0].order).toBe(1)
    expect(tasksStore.tasks[1].order).toBe(2)
    expect(tasksStore.tasks[2].order).toBe(3)
  })
})

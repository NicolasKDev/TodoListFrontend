import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import TaskCardList from '@/components/TaskCardList.vue'
import TaskCard from '@/components/TaskCard.vue'
import draggable from 'vuedraggable'
import { useTasksStore } from '@/stores/tasks'
import { createPinia, setActivePinia } from 'pinia'

describe('TaskCardList.vue', () => {
  let pinia
  let wrapper
  let storeTasks

  beforeEach(async () => {
    pinia = createPinia()
    setActivePinia(pinia)
    storeTasks = useTasksStore()

    storeTasks.tasks = [
      { id: 1, title: 'Task 1', order: 1 },
      { id: 3, title: 'Task 2', order: 2 },
      { id: 4, title: 'Task 3', order: 3 },
      { id: 7, title: 'Task 4', order: 4 },
      { id: 2, title: 'Task 5', order: 5 },
      { id: 5, title: 'Task 6', order: 6 },
      { id: 8, title: 'Task 7', order: 7 },
      { id: 6, title: 'Task 8', order: 8 },
      { id: 10, title: 'Task 9', order: 9 },
      { id: 9, title: 'Task 10', order: 10 },
    ]

    // Mock des méthodes comme spy
    storeTasks.loadTasks = vi.fn()
    storeTasks.updateOrdersFromIndex = vi.fn(() => {
      storeTasks.tasks.forEach((task, index) => {
        task.order = index + 1
      })
    })
    storeTasks.patchTask = vi.fn()
    storeTasks.deleteTask = vi.fn()

    wrapper = mount(TaskCardList, {
      global: {
        stubs: { draggable },
        plugins: [pinia],
      },
    })

    await flushPromises()
  })

  it('renders tasks with correct alternating classes', () => {
    const cards = wrapper.findAllComponents(TaskCard)
    expect(cards).toHaveLength(storeTasks.tasks.length)
    storeTasks.tasks.forEach((task, index) => {
      expect(cards[index].classes()).toContain(index % 2 === 0 ? 'bg-card' : 'bg-secondary-card')
    })
  })

  it('calls loadTasks on mount', async () => {
    expect(storeTasks.loadTasks).toHaveBeenCalled()
  })

  it('calls updateOrdersFromIndex and patchTask on drag end', async () => {
    const event = {
      oldIndex: 2,
      newIndex: 6,
      item: storeTasks.tasks[2],
    }

    // Simulate moving task in the array, like vuedraggable would do
    storeTasks.tasks.splice(event.oldIndex, 1)
    storeTasks.tasks.splice(event.newIndex, 0, event.item)

    await wrapper.vm.onDragEnd(event)
    expect(storeTasks.updateOrdersFromIndex).toHaveBeenCalled()
    expect(storeTasks.patchTask).toHaveBeenCalledWith(storeTasks.tasks[event.newIndex])

    expect(storeTasks.tasks[event.newIndex].order).toBe(event.newIndex + 1)

    storeTasks.tasks.forEach((task, index) => {
      if (index !== event.newIndex) {
        expect(task.order).not.toBe(event.newIndex + 1)
      }
    })
  })

  it('calls patchTask when update-task is emitted', async () => {
    const taskToUpdate = { ...storeTasks.tasks[0], title: 'Updated title' }
    const firstTaskCard = wrapper.findComponent(TaskCard)
    await firstTaskCard.vm.$emit('update-task', taskToUpdate, 'Task 1')
    expect(storeTasks.patchTask).toHaveBeenCalledWith(taskToUpdate, 'Task 1')
  })

  it('calls deleteTask when delete-task is emitted', async () => {
    const taskToDelete = storeTasks.tasks[0]
    const firstTaskCard = wrapper.findComponent(TaskCard)
    await firstTaskCard.vm.$emit('delete-task', taskToDelete)
    expect(storeTasks.deleteTask).toHaveBeenCalledWith(taskToDelete)
  })
})

import { mount } from '@vue/test-utils'
import TaskCard from '@/components/TaskCard.vue'
import { describe, beforeEach, it, expect } from 'vitest'

describe('TaskCard.vue', () => {
  let wrapper
  const task = {
    id: 1,
    title: 'Test Task',
    completed: false,
    order: 1,
  }

  beforeEach(() => {
    wrapper = mount(TaskCard, {
      props: { task: { ...task } },
    })
  })

  it('displays the task title', () => {
    expect(wrapper.text()).toContain('Test Task')
  })

  it('emits updateTask when the box is checked', async () => {
    const checkbox = wrapper.find('[data-testid="task-checkbox"]')
    await checkbox.setValue(true)

    expect(wrapper.emitted('updateTask')).toBeTruthy()
    const [emittedTask] = wrapper.emitted('updateTask')[0]
    expect(emittedTask.completed).toBe(true)
  })

  it('displays a text field when clicking on text', async () => {
    await wrapper.find('[data-testid="task-title-container"]').trigger('click')
    expect(wrapper.find('[data-testid="task-title-input"]').exists()).toBe(true)
  })

  it('emits updateTask when someone presses enter after a modification', async () => {
    const originalTitle = task.title
    const newTitle = 'Updated Task'
    await wrapper.find('[data-testid="task-title-container"]').trigger('click')
    const input = wrapper.find('[data-testid="task-title-input"]')
    await input.setValue(newTitle)
    await input.trigger('keyup.enter')

    expect(wrapper.emitted('updateTask')).toBeTruthy()
    const [emittedTask, originalTitleEmitted] = wrapper.emitted('updateTask')[0]
    expect(emittedTask.title).toBe(newTitle)
    expect(originalTitleEmitted).toBe(originalTitle)
  })

  it('cancels the modification if someone presses escape', async () => {
    const originalTitle = task.title
    const newTitle = 'Updated Task'

    await wrapper.find('[data-testid="task-title-container"]').trigger('click')
    const input = wrapper.find('[data-testid="task-title-input"]')
    await input.setValue(newTitle)
    await input.trigger('keyup.escape')

    expect(wrapper.find('[data-testid="task-title-input"]').exists()).toBe(false)

    expect(wrapper.text()).toContain(originalTitle)
  })

  it('emits deleteTask when clicking on the trash button', async () => {
    await wrapper.findComponent({ name: 'IconButton' }).trigger('click')
    expect(wrapper.emitted('deleteTask')).toBeTruthy()
  })
})

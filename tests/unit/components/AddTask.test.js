import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AddTask from '@/components/AddTask.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useTasksStore } from '@/stores/tasks'
import SimpleButton from '@/components/SimpleButton.vue'

describe('AddTask.vue', () => {
  let pinia
  let taskStore
  let wrapper

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
    taskStore = useTasksStore()

    wrapper = mount(AddTask, { plugins: [pinia] })
  })

  it('renders the form correctly', () => {
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.findAllComponents(SimpleButton)).toHaveLength(2)
  })

  it('respects the maximum length defined in the store', () => {
    const input = wrapper.find('input')
    expect(input.attributes('maxlength')).toBe(taskStore.maxTitleLength.toString())
  })

  it('calls createTask from taskStore when the form is submitted', async () => {
    const createTaskSpy = vi.spyOn(taskStore, 'createTask')

    await wrapper.find('form').trigger('submit')
    expect(createTaskSpy).toHaveBeenCalled()
  })

  it('displays plus icon on smaller devices', () => {
    const desktopButton = wrapper.get('[data-testid="desktop-button"]')
    const mobileButton = wrapper.get('[data-testid="mobile-button"]')

    expect(desktopButton.classes()).toContain('hidden')
    expect(desktopButton.classes()).toContain('lg:flex')

    expect(mobileButton.classes()).toContain('flex')
    expect(mobileButton.classes()).toContain('lg:hidden')
  })
})

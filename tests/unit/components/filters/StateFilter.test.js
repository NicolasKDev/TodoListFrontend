import { mount } from '@vue/test-utils'
import StateFilter from '@/components/filters/StateFilter.vue'
import { useFilter } from '@/composables/useFilter'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'

vi.mock('@/composables/useFilter', () => ({
  useFilter: vi.fn(),
}))

describe('StateFilter.vue', () => {
  let stateFilterValues

  beforeEach(() => {
    stateFilterValues = ref(['todo', 'done'])
    useFilter.mockReturnValue({
      filterValues: stateFilterValues,
    })
  })

  it('Display the two checkboxes with the correct labels', () => {
    const wrapper = mount(StateFilter)

    const todo = wrapper.get('[data-testid="todo-checkbox"]')
    const done = wrapper.get('[data-testid="done-checkbox"]')

    expect(todo.exists()).toBe(true)
    expect(done.exists()).toBe(true)
    expect(wrapper.text()).toContain('Todo')
    expect(wrapper.text()).toContain('Done')
  })

  it('initially check the checkbox according to the stateValue values', () => {
    const wrapper = mount(StateFilter)

    const todo = wrapper.get('[data-testid="todo-checkbox"]')
    const done = wrapper.get('[data-testid="done-checkbox"]')

    expect(todo.element.checked).toBe(true)
    expect(done.element.checked).toBe(true)
  })

  it('Check/uncheck the checkbox update the stateValue', async () => {
    const wrapper = mount(StateFilter)
    const todo = wrapper.get('[data-testid="todo-checkbox"]')

    // Uncheck the todo checkbox
    await todo.setValue(false)
    expect(stateFilterValues.value).toEqual(['done'])

    // Check the checkbox
    await todo.setValue(true)
    expect(stateFilterValues.value).toEqual(['done', 'todo'])
  })

  it('If stateValue is empty, no checkbox should be checked', () => {
    stateFilterValues.value = []
    const wrapper = mount(StateFilter)

    const todo = wrapper.get('[data-testid="todo-checkbox"]')
    const done = wrapper.get('[data-testid="done-checkbox"]')

    expect(todo.element.checked).toBe(false)
    expect(done.element.checked).toBe(false)
  })
})

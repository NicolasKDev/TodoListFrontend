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

  it('displays the two checkboxes with the correct labels', () => {
    const wrapper = mount(StateFilter)

    const todo = wrapper.get('[data-testid="todo-checkbox"]')
    const done = wrapper.get('[data-testid="done-checkbox"]')

    expect(todo.exists()).toBe(true)
    expect(done.exists()).toBe(true)
    expect(wrapper.text()).toContain('Todo')
    expect(wrapper.text()).toContain('Done')
  })

  it('initially checks the checkbox according to the stateValue values', () => {
    const wrapper = mount(StateFilter)

    const todo = wrapper.get('[data-testid="todo-checkbox"]')
    const done = wrapper.get('[data-testid="done-checkbox"]')

    expect(todo.element.checked).toBe(true)
    expect(done.element.checked).toBe(true)
  })

  it('checking/unchecking the checkbox updates the stateValue', async () => {
    const wrapper = mount(StateFilter)
    const todo = wrapper.get('[data-testid="todo-checkbox"]')

    // Uncheck the todo checkbox
    await todo.setValue(false)
    expect(stateFilterValues.value).toEqual(['done'])

    // Check the checkbox
    await todo.setValue(true)
    expect(stateFilterValues.value).toEqual(['done', 'todo'])
  })

  it('if stateValue is empty, no checkbox should be checked', () => {
    stateFilterValues.value = []
    const wrapper = mount(StateFilter)

    const todo = wrapper.get('[data-testid="todo-checkbox"]')
    const done = wrapper.get('[data-testid="done-checkbox"]')

    expect(todo.element.checked).toBe(false)
    expect(done.element.checked).toBe(false)
  })

  it('has the correct structure with title and checkboxes', () => {
    const wrapper = mount(StateFilter)

    // Check HTML structure
    expect(wrapper.find('h3').exists()).toBe(true)
    expect(wrapper.find('h3').text()).toBe('State')
    expect(wrapper.findAll('input[type="checkbox"]')).toHaveLength(2)
    expect(wrapper.findAll('label')).toHaveLength(2)
  })

  it('handles individual checkbox interactions correctly', async () => {
    const wrapper = mount(StateFilter)

    const todoCheckbox = wrapper.get('[data-testid="todo-checkbox"]')
    const doneCheckbox = wrapper.get('[data-testid="done-checkbox"]')

    // Test unchecking todo
    await todoCheckbox.setValue(false)
    expect(stateFilterValues.value).toEqual(['done'])

    // Test unchecking done
    await doneCheckbox.setValue(false)
    expect(stateFilterValues.value).toEqual([])

    // Test checking done
    await doneCheckbox.setValue(true)
    expect(stateFilterValues.value).toEqual(['done'])

    // Test checking todo
    await todoCheckbox.setValue(true)
    expect(stateFilterValues.value).toEqual(['done', 'todo'])
  })

  it('updates checkbox states when stateValue changes externally', async () => {
    const wrapper = mount(StateFilter)

    const todoCheckbox = wrapper.get('[data-testid="todo-checkbox"]')
    const doneCheckbox = wrapper.get('[data-testid="done-checkbox"]')

    // Change stateValue externally
    stateFilterValues.value = ['todo']
    await wrapper.vm.$nextTick()

    expect(todoCheckbox.element.checked).toBe(true)
    expect(doneCheckbox.element.checked).toBe(false)

    // Change to empty
    stateFilterValues.value = []
    await wrapper.vm.$nextTick()

    expect(todoCheckbox.element.checked).toBe(false)
    expect(doneCheckbox.element.checked).toBe(false)
  })

  it('uses the correct useFilter parameters', () => {
    mount(StateFilter)

    expect(useFilter).toHaveBeenCalledWith('state', ['todo', 'done'])
  })

  it('has correct accessibility attributes', () => {
    const wrapper = mount(StateFilter)

    const todoCheckbox = wrapper.get('[data-testid="todo-checkbox"]')
    const doneCheckbox = wrapper.get('[data-testid="done-checkbox"]')

    expect(todoCheckbox.attributes('name')).toBe('todo')
    expect(todoCheckbox.attributes('value')).toBe('todo')
    expect(doneCheckbox.attributes('name')).toBe('done')
    expect(doneCheckbox.attributes('value')).toBe('done')
  })
})

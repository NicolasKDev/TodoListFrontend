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
  let wrapper

  beforeEach(() => {
    stateFilterValues = ref(['todo', 'done'])
    useFilter.mockReturnValue({
      filterValues: stateFilterValues,
    })
    wrapper = mount(StateFilter, {
      global: {
        mocks: {
          $t: (key) => key,
        },
      },
    })
  })

  it('displays the two checkboxes with the correct labels', () => {
    const todo = wrapper.get('[data-testid="todo-checkbox"]')
    const done = wrapper.get('[data-testid="done-checkbox"]')

    expect(todo.exists()).toBe(true)
    expect(done.exists()).toBe(true)
    expect(wrapper.text()).toContain('common.todo')
    expect(wrapper.text()).toContain('common.done')
  })

  it('checks/unchecks the checkboxes via user interaction', async () => {
    const todoCheckbox = wrapper.find('input[value="todo"]')
    const doneCheckbox = wrapper.find('input[value="done"]')
    // Uncheck todo
    await todoCheckbox.setChecked(false)
    expect(todoCheckbox.element.checked).toBe(false)
    // Check todo
    await todoCheckbox.setChecked(true)
    expect(todoCheckbox.element.checked).toBe(true)
    // Uncheck done
    await doneCheckbox.setChecked(false)
    expect(doneCheckbox.element.checked).toBe(false)
    // Check done
    await doneCheckbox.setChecked(true)
    expect(doneCheckbox.element.checked).toBe(true)
  })

  it('has the correct structure with title and checkboxes', () => {
    expect(wrapper.find('h3').exists()).toBe(true)
    expect(wrapper.findAll('input[type="checkbox"]').length).toBe(2)
  })
})

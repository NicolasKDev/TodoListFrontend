import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import GlobalTaskFilter from '@/components/filters/GlobalTaskFilter.vue'
import StateFilter from '@/components/filters/StateFilter.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useFiltersStore } from '@/stores/filters'

// Mock axios api instance
vi.mock('@/config/axios', () => ({
  api: {
    get: vi.fn().mockResolvedValue({ data: [] }),
    post: vi.fn(),
    delete: vi.fn(),
    patch: vi.fn(),
    interceptors: {
      response: {
        use: vi.fn(),
      },
    },
  },
}))

// Mock router
vi.mock('@/router', () => ({
  default: {
    push: vi.fn(),
  },
}))

// Mock taskService
vi.mock('@/services/taskService', () => ({
  apiGetTaskList: vi.fn().mockResolvedValue([]),
  apiCreateNewTask: vi.fn(),
  apiDeleteTask: vi.fn(),
  apiPatchTask: vi.fn(),
}))

describe('GlobalTaskFilter.vue', () => {
  let pinia

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
    vi.clearAllMocks()
  })

  it('toggles visibleFilters when clicking on the button', async () => {
    const wrapper = mount(GlobalTaskFilter, { plugins: [pinia] })
    const filtersStore = useFiltersStore()
    const button = wrapper.find('[data-testid="filters-button"]')

    expect(filtersStore.visibleFilters).toBe(false)
    await button.trigger('click')
    expect(filtersStore.visibleFilters).toBe(true)
    await button.trigger('click')
    expect(filtersStore.visibleFilters).toBe(false)
  })

  it('renders the StateFilter component in the panel', async () => {
    const wrapper = mount(GlobalTaskFilter, { plugins: [pinia] })
    const filtersStore = useFiltersStore()
    filtersStore.visibleFilters = true
    await wrapper.vm.$nextTick()
    const stateFilter = wrapper.findComponent(StateFilter)
    expect(stateFilter.exists()).toBe(true)
  })
})

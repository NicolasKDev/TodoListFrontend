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
  let wrapper
  let filtersStore

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
    filtersStore = useFiltersStore()
    vi.clearAllMocks()
    wrapper = mount(GlobalTaskFilter, {
      global: {
        plugins: [pinia],
        mocks: {
          $t: (key) => key,
        },
      },
    })
  })

  it('toggles visibleFilters when clicking on the button', async () => {
    const button = wrapper.find('[data-testid="filters-button"]')

    // Initially visibleFilters should be false
    expect(filtersStore.visibleFilters).toBe(false)
    await button.trigger('click')
    // After click visibleFilters should be true
    expect(filtersStore.visibleFilters).toBe(true)
    await button.trigger('click')
    expect(filtersStore.visibleFilters).toBe(false)
  })

  it('renders the StateFilter component in the panel', async () => {
    filtersStore.visibleFilters = true
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(StateFilter).exists()).toBe(true)
  })
})

import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import GlobalTaskFilter from '@/components/filters/GlobalTaskFilter.vue'
import StateFilter from '@/components/filters/StateFilter.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useFiltersStore } from '@/stores/filters'
import axios from 'axios'

vi.mock('axios')

describe('GlobalTaskFilter.vue', () => {
  let pinia

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)

    vi.clearAllMocks()
    axios.get.mockResolvedValue({
      data: [],
    })
  })

  it('toggle visibleFilters when clicking on the button', async () => {
    const wrapper = mount(GlobalTaskFilter, { plugins: [pinia] })
    const filtersStore = useFiltersStore()
    const button = wrapper.find('[data-testid="filters-button"]')

    expect(filtersStore.visibleFilters).toBe(false)
    await button.trigger('click')
    expect(filtersStore.visibleFilters).toBe(true)
    await button.trigger('click')
    expect(filtersStore.visibleFilters).toBe(false)
  })

  it('Display the filters panel only if visibleFilters is true', async () => {
    const wrapper = mount(GlobalTaskFilter, { plugins: [pinia] })
    const filtersStore = useFiltersStore()

    // Invisible on begining, default value is false
    const panelBefore = wrapper.find('[data-testid="filters-panel"]')
    expect(panelBefore.element.style.display).toBe('none')

    // When we activate the filters, the panel is visible
    filtersStore.visibleFilters = true
    await wrapper.vm.$nextTick()

    const panelAfter = wrapper.find('[data-testid="filters-panel"]')
    expect(panelAfter.exists()).toBe(true)
    expect(panelAfter.element.style.display).not.toBe('none')
  })

  it('render the StateFilter component in the panel', async () => {
    const wrapper = mount(GlobalTaskFilter, { plugins: [pinia] })
    const filtersStore = useFiltersStore()
    filtersStore.visibleFilters = true
    await wrapper.vm.$nextTick()
    const stateFilter = wrapper.findComponent(StateFilter)
    expect(stateFilter.exists()).toBe(true)
    expect(stateFilter.element.style.display).not.toBe('none')
  })
})

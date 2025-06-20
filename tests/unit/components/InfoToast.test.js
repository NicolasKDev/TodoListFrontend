import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import InfoToast from '@/components/InfoToast.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useToastStore } from '@/stores/toast'
import { XMarkIcon } from '@heroicons/vue/24/solid'

describe('InfoToast.vue', () => {
  let pinia
  let toastStore

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
    toastStore = useToastStore()
  })

  it('does not render when message is empty', () => {
    toastStore.message = ''
    const wrapper = mount(InfoToast, { plugins: [pinia] })
    expect(wrapper.find('[data-testid="info-toast"]').exists()).toBe(false)
  })

  it('renders toast when message is not empty', () => {
    toastStore.message = 'Toast message'
    const wrapper = mount(InfoToast, { plugins: [pinia] })
    expect(wrapper.text()).toContain('Toast message')
  })

  it('renders error icon when type is "error"', () => {
    toastStore.message = 'This is an error!'
    toastStore.type = 'error'
    const wrapper = mount(InfoToast, { plugins: [pinia] })
    expect(wrapper.findComponent(XMarkIcon).exists()).toBe(true)
  })

  it('calls reset when toast is clicked', async () => {
    toastStore.message = 'Reset on click'
    const wrapper = mount(InfoToast, { plugins: [pinia] })

    // Create spy after component mounting
    const resetSpy = vi.spyOn(toastStore, 'reset')

    await wrapper.find('[data-testid="info-toast"]').trigger('click')
    expect(resetSpy).toHaveBeenCalled()
  })

  it('calls reset when close button is clicked', async () => {
    toastStore.message = 'Reset on close click'
    const wrapper = mount(InfoToast, { plugins: [pinia] })

    // Create spy after component mounting
    const resetSpy = vi.spyOn(toastStore, 'reset')

    await wrapper.findComponent(XMarkIcon).trigger('click')
    expect(resetSpy).toHaveBeenCalled()
  })
})

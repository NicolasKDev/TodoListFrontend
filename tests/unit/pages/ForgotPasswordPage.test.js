import { mount } from '@vue/test-utils'
import ForgotPasswordPage from '@/pages/ForgotPasswordPage.vue'
import { createPinia, setActivePinia } from 'pinia'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/stores/auth', () => ({
  useAuthStore: () => ({
    forgotPassword: vi.fn().mockResolvedValue(true),
    loading: false,
    error: null,
  }),
}))

describe('ForgotPasswordPage', () => {
  let pinia
  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
  })

  it('displays the form', () => {
    const wrapper = mount(ForgotPasswordPage, {
      global: { plugins: [pinia] },
    })
    expect(wrapper.text()).toContain('Reset password')
    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('submits the form and clears the field', async () => {
    const wrapper = mount(ForgotPasswordPage, {
      global: { plugins: [pinia] },
    })
    const input = wrapper.find('input[type="email"]')
    await input.setValue('test@example.com')
    await wrapper.find('form').trigger('submit.prevent')
    expect(input.element.value).toBe('')
  })
})

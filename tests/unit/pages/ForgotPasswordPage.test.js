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
  let wrapper

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
    wrapper = mount(ForgotPasswordPage, {
      global: {
        plugins: [pinia],
        mocks: {
          $t: (key) => key,
        },
      },
    })
  })

  it('displays the form', () => {
    expect(wrapper.text()).toContain('auth.reset_password')
    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('submits the form and clears the field', async () => {
    const input = wrapper.find('input[type="email"]')
    await input.setValue('test@example.com')
    await wrapper.find('form').trigger('submit.prevent')
    expect(input.element.value).toBe('')
  })
})

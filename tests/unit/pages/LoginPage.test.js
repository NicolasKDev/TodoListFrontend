import { mount } from '@vue/test-utils'
import LoginPage from '@/pages/LoginPage.vue'
import { createPinia, setActivePinia } from 'pinia'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/stores/auth', () => ({
  useAuthStore: () => ({
    login: vi.fn().mockResolvedValue(true),
    loading: false,
    error: null,
  }),
}))

describe('LoginPage', () => {
  let pinia
  let wrapper

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
    wrapper = mount(LoginPage, {
      global: {
        plugins: [pinia],
        mocks: {
          $t: (key) => key,
        },
      },
    })
  })

  it('displays the login form', () => {
    expect(wrapper.text()).toContain('auth.sign_in')
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
  })

  it('submits the form with credentials', async () => {
    const emailInput = wrapper.find('input[type="email"]')
    const passwordInput = wrapper.find('input[type="password"]')
    const form = wrapper.find('form')

    await emailInput.setValue('test@example.com')
    await passwordInput.setValue('password123')
    await form.trigger('submit.prevent')

    expect(emailInput.element.value).toBe('test@example.com')
    expect(passwordInput.element.value).toBe('password123')
  })
})

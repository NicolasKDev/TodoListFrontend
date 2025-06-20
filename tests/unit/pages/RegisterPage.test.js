import { mount } from '@vue/test-utils'
import RegisterPage from '@/pages/RegisterPage.vue'
import { createPinia, setActivePinia } from 'pinia'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/stores/auth', () => ({
  useAuthStore: () => ({
    register: vi.fn().mockResolvedValue(true),
    loading: false,
    error: null,
  }),
}))

describe('RegisterPage', () => {
  let pinia
  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
  })

  it('displays the registration form', () => {
    const wrapper = mount(RegisterPage, {
      global: { plugins: [pinia] },
    })
    expect(wrapper.text()).toContain('Sign up')
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.findAll('input[type="password"]')).toHaveLength(2) // password and confirmation
  })

  it('submits the form with registration data', async () => {
    const wrapper = mount(RegisterPage, {
      global: { plugins: [pinia] },
    })
    const emailInput = wrapper.find('input[type="email"]')
    const passwordInputs = wrapper.findAll('input[type="password"]')

    await emailInput.setValue('john@example.com')
    await passwordInputs[0].setValue('password123')
    await passwordInputs[1].setValue('password123')
    await wrapper.find('form').trigger('submit.prevent')

    expect(emailInput.element.value).toBe('john@example.com')
    expect(passwordInputs[0].element.value).toBe('password123')
    expect(passwordInputs[1].element.value).toBe('password123')
  })
})

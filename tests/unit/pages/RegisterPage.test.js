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
  let wrapper

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
    wrapper = mount(RegisterPage, {
      global: {
        plugins: [pinia],
        mocks: {
          $t: (key) => key,
        },
      },
    })
  })

  it('displays the registration form', () => {
    expect(wrapper.text()).toContain('auth.sign_up')
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.findAll('input[type="password"]')).toHaveLength(2)
  })

  it('submits the form with registration data', async () => {
    const emailInput = wrapper.find('input[type="email"]')
    const passwordInputs = wrapper.findAll('input[type="password"]')
    const form = wrapper.find('form')

    await emailInput.setValue('test@example.com')
    await passwordInputs[0].setValue('password123')
    await passwordInputs[1].setValue('password123')
    await form.trigger('submit.prevent')

    expect(emailInput.element.value).toBe('test@example.com')
    expect(passwordInputs[0].element.value).toBe('password123')
    expect(passwordInputs[1].element.value).toBe('password123')
  })
})

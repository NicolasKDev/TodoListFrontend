import { mount } from '@vue/test-utils'
import ResetPasswordPage from '@/pages/ResetPasswordPage.vue'
import { createPinia, setActivePinia } from 'pinia'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/stores/auth', () => ({
  useAuthStore: () => ({
    resetPassword: vi.fn().mockResolvedValue(true),
    loading: false,
    error: null,
  }),
}))

describe('ResetPasswordPage', () => {
  let pinia
  let wrapper

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
    wrapper = mount(ResetPasswordPage, {
      global: {
        plugins: [pinia],
        mocks: {
          $t: (key) => key,
        },
      },
    })
  })

  it('displays the password reset form', () => {
    expect(wrapper.text()).toContain('auth.reset_password_title')
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.findAll('input[type="password"]')).toHaveLength(2) // password and confirmation
  })

  it('submits the form with the new password', async () => {
    const passwordInputs = wrapper.findAll('input[type="password"]')

    await passwordInputs[0].setValue('newpassword123')
    await passwordInputs[1].setValue('newpassword123')
    await wrapper.find('form').trigger('submit.prevent')

    expect(passwordInputs[0].element.value).toBe('newpassword123')
    expect(passwordInputs[1].element.value).toBe('newpassword123')
  })
})

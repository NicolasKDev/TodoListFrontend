import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ConfirmDialog from '@/components/dialogs/ConfirmDialog.vue'
import BaseDialog from '@/components/dialogs/BaseDialog.vue'
import SimpleButton from '@/components/SimpleButton.vue'

describe('ConfirmDialog.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ConfirmDialog, {
      props: {
        modelValue: true,
        message: 'Are you sure you want to delete this item?',
      },
      global: {
        mocks: {
          $t: (key) => key,
        },
      },
    })
  })

  it('renders BaseDialog component with correct props', () => {
    expect(wrapper.findComponent(BaseDialog).exists()).toBe(true)
    expect(wrapper.props('modelValue')).toBe(true)
    expect(wrapper.props('message')).toBe('Are you sure you want to delete this item?')
  })

  it('displays custom title when provided', async () => {
    await wrapper.setProps({ title: 'Custom Title' })
    expect(wrapper.text()).toContain('Custom Title')
  })

  it('displays the message correctly', () => {
    expect(wrapper.text()).toContain('Are you sure you want to delete this item?')
  })

  it('displays custom confirm label when provided', async () => {
    await wrapper.setProps({ confirmLabel: 'Delete' })
    expect(wrapper.text()).toContain('Delete')
  })

  it('emits update:modelValue when Cancel button is clicked', async () => {
    const cancelButton = wrapper.findAllComponents(SimpleButton).at(0)
    await cancelButton.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([false])
  })

  it('emits confirm and update:modelValue when Confirm button is clicked', async () => {
    const confirmButton = wrapper.findAllComponents(SimpleButton).at(1)
    await confirmButton.trigger('click')
    expect(wrapper.emitted('confirm')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([false])
  })

  it('does not render dialog content when modelValue is false', async () => {
    await wrapper.setProps({ modelValue: false })
    expect(wrapper.findComponent(BaseDialog).props('modelValue')).toBe(false)
  })
})

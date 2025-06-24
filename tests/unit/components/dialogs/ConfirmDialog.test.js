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
        modelValue: false,
        message: 'Are you sure you want to delete this item?',
      },
    })
  })

  it('renders BaseDialog component with correct props', () => {
    const baseDialog = wrapper.findComponent(BaseDialog)
    expect(baseDialog.exists()).toBe(true)
    expect(baseDialog.props('title')).toBe('Confirmation')
  })

  it('displays custom title when provided', async () => {
    await wrapper.setProps({
      modelValue: true,
      title: 'Delete Confirmation',
    })

    const baseDialog = wrapper.findComponent(BaseDialog)
    expect(baseDialog.props('title')).toBe('Delete Confirmation')
  })

  it('displays the message correctly', async () => {
    await wrapper.setProps({ modelValue: true })

    const messageElement = wrapper.find('p')
    expect(messageElement.exists()).toBe(true)
    expect(messageElement.text()).toBe('Are you sure you want to delete this item?')
    expect(messageElement.classes()).toContain('text-muted-foreground')
  })

  it('displays Confirm button with default label', async () => {
    await wrapper.setProps({ modelValue: true })

    const buttons = wrapper.findAllComponents(SimpleButton)
    const confirmButton = buttons[1]

    expect(confirmButton.text()).toBe('Confirm')
  })

  it('displays custom confirm label when provided', async () => {
    await wrapper.setProps({
      modelValue: true,
      confirmLabel: 'Delete',
    })

    const buttons = wrapper.findAllComponents(SimpleButton)
    const confirmButton = buttons[1]

    expect(confirmButton.text()).toBe('Delete')
  })

  it('emits update:modelValue when Cancel button is clicked', async () => {
    await wrapper.setProps({ modelValue: true })

    const buttons = wrapper.findAllComponents(SimpleButton)
    const cancelButton = buttons[0]

    await cancelButton.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([false])
  })

  it('emits confirm and update:modelValue when Confirm button is clicked', async () => {
    await wrapper.setProps({ modelValue: true })

    const buttons = wrapper.findAllComponents(SimpleButton)
    const confirmButton = buttons[1]

    await confirmButton.trigger('click')

    expect(wrapper.emitted('confirm')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([false])
  })

  it('does not render dialog content when modelValue is false', () => {
    const baseDialog = wrapper.findComponent(BaseDialog)
    expect(baseDialog.props('modelValue')).toBe(false)
  })
})

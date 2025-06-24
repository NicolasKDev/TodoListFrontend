import { mount } from '@vue/test-utils'
import BaseDialog from '@/components/dialogs/BaseDialog.vue'
import { describe, beforeEach, it, expect } from 'vitest'

describe('BaseDialog.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(BaseDialog, {
      props: {
        modelValue: false,
      },
    })
  })

  it('does not render dialog when modelValue is false', () => {
    expect(wrapper.find('[data-testid="base-dialog"]').exists()).toBe(false)
  })

  it('renders dialog when modelValue is true', async () => {
    await wrapper.setProps({ modelValue: true })
    expect(wrapper.find('[data-testid="base-dialog"]').exists()).toBe(true)
  })

  it('displays title when provided', async () => {
    await wrapper.setProps({
      modelValue: true,
      title: 'My Dialog',
    })

    const titleElement = wrapper.find('[data-testid="dialog-title"]')
    expect(titleElement.exists()).toBe(true)
    expect(titleElement.text()).toBe('My Dialog')
  })

  it('does not display header when no title is provided', async () => {
    await wrapper.setProps({ modelValue: true })

    const headerElement = wrapper.find('[data-testid="dialog-header"]')
    expect(headerElement.exists()).toBe(false)
  })

  it('displays footer when footer slot is provided', async () => {
    const wrapperWithFooter = mount(BaseDialog, {
      props: { modelValue: true },
      slots: {
        footer: '<div>Footer content</div>',
      },
    })

    const footerElement = wrapperWithFooter.find('[data-testid="dialog-footer"]')
    expect(footerElement.exists()).toBe(true)
    expect(footerElement.text()).toBe('Footer content')
  })

  it('does not display footer when footer slot is not provided', async () => {
    await wrapper.setProps({ modelValue: true })

    const footerElement = wrapper.find('[data-testid="dialog-footer"]')
    expect(footerElement.exists()).toBe(false)
  })

  it('applies maxHeightClass when provided', async () => {
    await wrapper.setProps({
      modelValue: true,
      maxHeightClass: 'max-h-96',
    })

    const dialogElement = wrapper.find('[data-testid="dialog-content"]')
    expect(dialogElement.classes()).toContain('max-h-96')
  })

  it('emits update:modelValue when clicking overlay by default', async () => {
    await wrapper.setProps({ modelValue: true })

    const overlay = wrapper.find('[data-testid="dialog-overlay"]')
    await overlay.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([false])
  })

  it('does not emit update:modelValue when closeOnOverlayClick is false', async () => {
    await wrapper.setProps({
      modelValue: true,
      closeOnOverlayClick: false,
    })

    const overlay = wrapper.find('[data-testid="dialog-overlay"]')
    await overlay.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })
})

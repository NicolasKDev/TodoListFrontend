import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TermsOfUseDialog from '@/components/dialogs/TermsOfUseDialog.vue'
import BaseDialog from '@/components/dialogs/BaseDialog.vue'
import SimpleButton from '@/components/SimpleButton.vue'

describe('TermsOfUseDialog.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(TermsOfUseDialog, {
      props: {
        modelValue: false,
      },
    })
  })

  it('renders BaseDialog component with correct props', () => {
    const baseDialog = wrapper.findComponent(BaseDialog)
    expect(baseDialog.exists()).toBe(true)
    expect(baseDialog.props('title')).toBe('Terms of Use')
    expect(baseDialog.props('maxHeightClass')).toBe('max-h-[80vh] overflow-y-auto')
  })

  it('renders footer with SimpleButton', async () => {
    await wrapper.setProps({ modelValue: true })

    const footer = wrapper.find('[data-testid="dialog-footer"]')
    expect(footer.exists()).toBe(true)

    const button = footer.findComponent(SimpleButton)
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('I understand')
  })

  it('emits update:modelValue when "I understand" button is clicked', async () => {
    await wrapper.setProps({ modelValue: true })

    const button = wrapper.findComponent(SimpleButton)
    await button.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([false])
  })
})

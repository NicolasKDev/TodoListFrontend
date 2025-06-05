import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'
import { describe, expect, it } from 'vitest'

describe('App.vue', () => {
  it('Correctly mount the component', () => {
    const wrapper = shallowMount(App)
    expect(wrapper.exists()).toBe(true)
  })
})

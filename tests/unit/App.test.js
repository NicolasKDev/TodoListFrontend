import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'
import { describe, expect, it, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

// Mock routes
const routes = [
  { path: '/', component: { template: '<div>Home</div>' } },
  { path: '/login', component: { template: '<div>Login</div>' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

describe('App.vue', () => {
  let pinia

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
  })

  it('Correctly mount the component', () => {
    const wrapper = shallowMount(App, {
      global: {
        plugins: [pinia, router],
      },
    })
    expect(wrapper.exists()).toBe(true)
  })
})

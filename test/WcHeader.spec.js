import { shallowMount, createLocalVue } from '@vue/test-utils'
import { NavbarPlugin, BFormInput, BButton, BNavbar } from 'bootstrap-vue'
import WcHeader from '@/components/WcHeader.vue'

const localVue = createLocalVue()
localVue.use(NavbarPlugin)
localVue.component('b-navbar', BNavbar)
localVue.component('b-form-input', BFormInput)
localVue.component('b-button', BButton)

let wrapper
beforeAll(() => {
  wrapper = shallowMount(WcHeader, {
    localVue
  })
})

describe('BNavbar', () => {
  it('should exist BNavbar component', () => {
    const bar = wrapper.findComponent(BNavbar)
    expect(bar.exists()).toBe(true)
  })
})

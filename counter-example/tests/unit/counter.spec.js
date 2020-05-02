import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Counter from '@/components/Counter.vue'

describe('Counter.vue', () => {
  it('the props value provided will be 24', () => {
    const wrapper = shallowMount(Counter, {
      propsData: { initialValue: 24 }
    })
    expect(wrapper.text()).to.include('Counter Value: 24')
  })
  it('the default value will be used in props', () => {
    const wrapper = shallowMount(Counter, {
      propsData: { }
    })
    expect(wrapper.text()).to.include('Counter Value: 0')
  })
  it('Increase counter click event', () => {
    const wrapper = shallowMount(Counter, {
      propsData: { }
    })
    const button = wrapper.find('.increase')
    button.trigger('click')
    expect(wrapper.vm.value).to.equal(1)
  })
})

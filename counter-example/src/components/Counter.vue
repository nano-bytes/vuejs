<template>
  <div>
    Counter Value: <span class="counter-value">{{ value }}</span>
    <br/>
    <button class="increase" @click="onIncrease">Increase Counter</button>
  </div>
</template>

<script>
export default {
  props: {
    initialValue: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data () {
    return {
      value: this.initialValue
    }
  },
  computed: {
    stringValue () {
      return this.value.toString()
    }
  },
  methods: {
    onIncrease () {
      this.value += 1
    }
  }
}
</script>
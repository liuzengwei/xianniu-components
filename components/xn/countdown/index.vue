<template>
  <div class="xn-count-down" :data-id="_id">
    <span :class="counting && !isOnlyCount ? 'text-blue' : 'text-gray-2'">
      <slot>{{ counting && !isOnlyCount ? text : showText }}</slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'XnCountdown',
  props: {
    time: {
      type: Number,
      default: 60
    },
    autoStart: {
      type: Boolean,
      default: false
    },
    isOnlyCount: {
      type: Boolean,
      default: false
    },
    showText: {
      type: String,
      default: '发送验证码'
    }
  },
  data() {
    return {
      text: '发送验证码',
      count: 0,
      counting: false,
      timer: null,
      isCounting: false
    }
  },
  computed: {
    _id() {
      return `CountDown${this._uid}`
    },
    formatCount: {
      get: function() {
        return this.count < 10 ? `0${this.count}` : this.count
      },
      set: function(v) {
        this.count = v
      }
    },

    isExp() {
      return this.$tools.auth.storage.get(this._id)
    }
  },
  watch: {
    time: {
      immediate: true,
      handler: 'reset'
    },
    isCounting(n) {
      if (n) {
        this.setExp()
      }
    }
  },

  mounted() {
    // this.checkExp()
    if (this.autoStart) {
      this.start()
    }
    // if (!this.isOnlyCount) {
    //   this.text = '验证手机号码'
    // }
  },
  beforeDestroy() {
    this.pause()
  },
  methods: {
    checkExp() {
      const expCookie = this.$tools.auth.storage.get(this._id)
      if (expCookie) {
        const _data = JSON.parse(expCookie)
        if (_data.exp && _data.id === this._id) {
          const _time = parseInt((new Date(_data.exp).getTime() - new Date().getTime()) / 1000)
          this.$emit('update:time', _time)
          this.start()
        }
      }
    },
    reset() {
      this.count = +this.time
    },
    start() {
      if (this.isCounting) return
      this.isCounting = true
      this.counting = true

      this.countDown()
    },
    setExp() {
      if (!this.isExp) {
        const _exp = new Date(new Date().getTime() + this.time * 1000)
        this.$tools.auth.storage.set(this._id, JSON.stringify({ exp: _exp, id: this._id }), { expires: _exp })
      }
    },
    pause() {
      if (this.timer) {
        clearInterval(this.timer)
      }
    },
    countDown() {
      this.text = `${this.formatCount}s`
      this.timer = setInterval(() => {
        if (this.count <= 0) {
          this.$emit('on-end', { isEnd: true, count: this.count, id: this._id })
          if (!this.isOnlyCount) {
            this.text = '再次获取'
          }
          this.count = this.time
          this.isCounting = false
          clearInterval(this.timer)
          return false
        }
        this.count--
        this.text = `${this.formatCount}s`
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.xn-count-down{
  display: inline-block;
}
</style>

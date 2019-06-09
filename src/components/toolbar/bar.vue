<template lang="pug">
  .navigator
    .navigator.fly
      .navigator.back(:class="{fhide, show:!fhide, hide:fhide}")
      .cona(:is="barName" :class="{fhide}")
      q-btn.btn-logo(round flat to="/")
        template(v-if="rotate")
          clef.logo.rotate
        template(v-else)
          clef.logo(showTarget='true')

</template>

<script>
import BarMenu from './bar-menu'
import Clef from '../svg/clef'
let timeout = 0
export default {
  components: { Clef, BarMenu },
  props: ['barName'],
  name: 'bar',
  data: () => ({
    lockHide: false,
    fhide: false,
    rotate: false
  })
  ,
  onFlow: {
    'dash.barLockHide'(v) {
      this.lockHide = v
    },
    'dash.barRotate'() {
      this.rotate = true
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        this.rotate = false
        timeout = false
      }, 1000)
    }
  },
  mounted() {
    let lastTY = 0
    let lastTm = 0
    window.addEventListener('scroll', () => {
      if (this.lockHide && !process.browser) return
      var top = window.pageYOffset || document.documentElement.scrollTop
      let diff = lastTY - top
      if (!this.fhide && diff < -55) {
        this.fhide = true
      } else if (this.fhide && diff > 0) {
        this.fhide = false
      }
      if (Date.now() - lastTm > 144) {
        lastTm = Date.now()
        lastTY = top
      }
    })
  }
}
</script>

<style scoped lang="stylus">
.navigator
  width 100%
  height 48px
.fly
  z-index 1
  position fixed
  display flex

.back.show
  transition: all .3s ease-in;
.back.hide
  transition: all 3s cubic-bezier(0.01, 0.05, 0.1, 1);
.back
  position absolute
  background-color white
.back.fhide
  background-color transparent !important
  transform: translateY(-48px);

.btn-logo
  margin 3px
.logo
  position absolute
.rotate
  transition:all, 1s
  transform:rotate(360deg);


.cona
  padding-left 48px
  position absolute
  width 100%
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);

.cona.fhide
  transform: translateY(-48px);
  opacity: 0;
</style>

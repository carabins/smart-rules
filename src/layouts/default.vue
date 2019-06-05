<template lang="pug">
  q-layout(view="hHr Lpr fFr")
    bar(:barName="barName")
    q-page-container(v-show="!target")
      router-view
    q-page-container(v-if="target" :is="target")
    dialog-login
    dialog-json

</template>

<script>
import RightDrawer from '../components/right-drawer'

import BarMenu from '../components/toolbar/bar-menu'
import Bar from '../components/toolbar/bar'
import DialogLogin from '../components/dialogs/dialog-login'

export default {
  name: 'default',
  components: {
    DialogLogin,
    Bar,
    BarMenu,
    RightDrawer
  },
  mapFlow: {
    dash: ['target', 'bar'],
    box: ['editDialog']
  },
  computed: {
    barName() {
      if (this.target) return 'bar-' + this.target
      else if (this.bar) return 'bar-' + this.bar
      return this.$route.meta.bar ? this.$route.meta.bar : 'bar-menu'
    }
  }
}
</script>

<style scoped lang="stylus">
.bar
  display flex
  flex-direction row
  //margin-left 40px
  /*background-color olive !important*/

  .logo
    /*background-color yellow !important*/
    z-index 100
    position absolute
    padding-top 5px
    //margin-left -40px
    height 50px
.conspace

.confullsize
  /*background-color white !important*/
  height 42px
  width 100%

.cona
  /*background-color red !important*/
  position absolute

.top-toolbar
  color orange

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
{
  opacity: 0;
}
</style>

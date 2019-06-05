<template lang="pug">
  .logo-preloader-con
    clef(
    :class="{loadingSpinner:online}"
    :showTarget="!online"
    h="350" w="350")
</template>

<script>
import Clef from '../svg/clef'
export default {
  name: "logo-loader",
  props: ["active"],
  components: { Clef },
  mapFlow: {
    online: "session.online"
  }
};
</script>

<style scoped lang="stylus">
@keyframes xshow
  from
    transform scale(0)
  85%
    transform scale(0)
  90%
    transform scaleX(1)
  to
    transform scaleY(1)

.x
  position absolute
  background-color #a8abb0
  color white
  animation xshow 5s
.xx
  padding 30px
  border-radius 30px
  opacity 0.5
.xxx
  padding 10px
  border-radius 20px
  opacity 0.3
.xxxx
  padding 50px 30px
  border-radius 40px
  opacity 0.2
.xxxxx
  padding 70px 30px
  border-radius 40px
  opacity 0.1

.loadingSpinner {
  animation: rotate 3s linear infinite;
}
</style>

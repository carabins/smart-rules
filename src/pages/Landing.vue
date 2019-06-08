<template lang="pug">
  .landing.full-width
    q-parallax(:height="$q.screen.height/2")
      template(v-slot:media)
        img(src="https://images.unsplash.com/photo-1554224155-1696413565d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80")
      template(v-slot:content="scope")
    .page-center
      .quote1 Всем известно, что за деньги можно купить туфли, но не счастье, еду, но не аппетит, постель, но не сон, лекарство, но не здоровье, слуг, но не друзей, развлечение, но не радость, учителей, но не ум.

</template>

<script>
export default {
  name: 'Land'
}
</script>

<style lang="stylus">
.page-center
  display flex
  flex-direction column
  align-items center
  font-size 1.6em
  padding-top 2em
.landing
  height 100vh
.quote1
  max-width 760px
</style>

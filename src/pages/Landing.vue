<template lang="pug">
  .landing.full-width
    q-parallax(:height="$q.screen.height/2")
      template(v-slot:media)
        img(src="https://images.unsplash.com/photo-1542123188-6917a18bcc45?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjMwNDk1fQ")
      template(v-slot:content="scope")
    .page.text-weight-light
</template>

<script>
export default {
  name: "Land"
}
</script>

<style lang="stylus">
.landing
  height 100vh
</style>

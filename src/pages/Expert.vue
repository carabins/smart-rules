<template lang="pug">
  .expert
    q-btn(color="primary" label="Новый шаблон" no-caps to="/expert/new")
</template>

<script>
export default {
  name: 'Expert'
}
</script>

<style scoped lang="stylus">
.expert
  display flex
  flex-direction row
  justify-content center
  align-items center
  width 100%
  padding-top 3rem
</style>

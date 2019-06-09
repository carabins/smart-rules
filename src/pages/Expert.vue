<template lang="pug">
  .expert
    q-btn(color="primary" label="Новый шаблон" no-caps to="/expert/new")
    //pre {{JSON.stringify(forms[0].values)}}
</template>

<script>
export default {
  name: 'Expert',
  mapFlow:{
    forms:'docs.forms'
  }
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

<template lang="pug">
  .expert
    q-btn(color="primary" label="Новый шаблон" no-caps to="/expert/new")
    forms-list

</template>

<script>
import FormsList from '../components/forms-list'
export default {
  name: 'Expert',
  components: { FormsList },
  mapFlow: {
    forms:'docs.forms'
  }
}
</script>

<style scoped lang="stylus">
.expert
  display flex
  flex-direction column
  justify-content center
  align-items center
  width 100%
  padding-top 3rem
</style>

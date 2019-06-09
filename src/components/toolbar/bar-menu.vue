<template lang="pug">
  .tab-container
    // .mbars
    q-toolbar.q-tabs--not-scrollable
      q-toolbar-title
      q-tabs
        q-route-tab(
        to="/"
        no-caps
        exact
        )
          .gt-xs О продукте
          .xs О
        q-route-tab(
        to="/expert"
        no-caps
        exact
        )
          .gt-xs Эксперт
          .xs О.
        q-route-tab(
        to="/operator"
        no-caps
        exact
        )
          .gt-xs Оператор
          .xs Д.
      q-space
      q-btn-group(flat)
        q-btn(flat v-if="canEnd" round color="primary" icon="check" @click="$f.docs.doEnd(true)")
        //div ???+_

        //q-btn(icon="account_circle" to="/expert")
        //q-btn.guest-btn(flat :color='user?"primary":"secondary"' round icon="account_circle"  @click="$f.soul.dialogLogin(true)")
        //q-btn.guest-btn(flat :color='user?"primary":"secondary"' round icon="account_circle"  @click="$f.soul.dialogLogin(true)")
</template>

<script>
export default {
  name: 'bar-menu',
  mapFlow: {
    user: 'soul.user',
    canEnd: 'docs.canEnd'
  }
}
</script>

<style scoped lang="stylus">
.tab-container {
  width: 100%;
  display: flex;
  align-content center

}
.mbars {
  margin: 0 auto !important
}
</style>

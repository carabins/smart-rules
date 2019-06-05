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
          .gt-xs Основное
          .xs О
        q-route-tab(
        to="/"
        no-caps
        exact
        )
          .gt-xs Облака
          .xs О.
        q-route-tab(
        to="/"
        no-caps
        exact
        )
          .gt-xs Другое
          .xs Д.
      q-space
      q-btn-group(flat)
        //q-btn.guest-btn( v-if="user" round icon="add"  to="/new")
        q-btn.guest-btn(flat :color='user?"primary":"secondary"' round icon="account_circle"  @click="$f.soul.dialogLogin(true)")
</template>

<script>
export default {
  name: 'bar-menu',
  mapFlow: {
    user: 'soul.user'
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

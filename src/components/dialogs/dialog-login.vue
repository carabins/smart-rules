<template lang="pug">
  q-dialog(v-model="show" persistent)
    q-card(v-if="user")
      q-card-section
        .text-h6 Welcome {{user.First}} {{user.Second}}
      q-card-section @{{user.Name}}
      q-list
        //q-item(clickable)
          q-item-section(avatar)
            q-icon(color="secondary" name="logout" )
          q-item-section
            q-item-label Logout
        q-item(clickable @click="show=false")
          q-item-section(avatar)
            q-icon(color="primary" name="check" )
          q-item-section
            q-item-label OK
        iframe(name="gate")


    q-card(v-else)
      q-card-section
        .text-h6 Авторизация
      q-card-section Телеграм должен быть установлен на этом устройстве.
        p После нажатия на &nbsp;
          a(:href="'tg://resolve?domain=legend_abot&start='+rune" target="gate") Start
          span &nbsp; в открывшимся клиенте телеграм нажмите на
          b &nbsp;Start
      q-list
        a.link(:href="'tg://resolve?domain=legend_abot&start='+rune" target="gate")
          q-item(clickable @click="")
            q-item-section(avatar)
              q-icon(color="primary" name="play_arrow" )
            q-item-section
              q-item-label Start
              q-item-label(caption) @legend_abot
        q-item(clickable @click="show=false")
          q-item-section(avatar)
            q-icon(color="secondary" name="close" )
          q-item-section
            q-item-label Close

</template>

<script lang="ts">
export default {
  name: "dialog-login",
  data: () => ({
    show: false
  }),
  mapFlow: {
    show: "soul.dialogLogin",
    rune: "session.rune",
    user: "soul.user"
  }
}
</script>

<style scoped lang="stylus">
.link
  text-decoration none

  b
    text-decoration underline
</style>

<template lang="pug">
  .forms
    q-list(bordered padding)
      q-item-label(header) Текуших форм : {{forms.length}}
      q-item(clickable v-ripple v-for="form in forms" @click="$f.dash.selectForm(form)")
        q-item-section
          q-item-label
            b {{form.name}}
          q-item-label.grey Элементов {{form.values.length}}

</template>

<script>
  export default {
    name: 'forms-list',
    mapFlow:{
      forms: "docs.forms"
    }
  }
</script>

<style scoped>

</style>

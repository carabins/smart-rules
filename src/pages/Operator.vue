<template lang="pug">
  .operator
    div.q-pa-md(style="max-width: 400px")
      q-form.q-gutter-md(@submit="onSubmit" @reset="onReset")
        q-input(filled
        v-model="login"
          label="Логин *"
          hint="Введите ваш логин"
          lazy-rules :rules="[ val => val && val.length > 0 || 'Please type something']"
        )
        q-input(filled
        type="password"
          v-model="password"
          label="password *"
          lazy-rules :rules="[val => val !== null && val !== '' || 'Please type your password',val => val > 6 && val < 100 || 'Please type a password']")
        q-toggle(v-model="accept" label="I accept the license and terms")
        q-btn(label="Submit" type="submit" color="primary")
        q-btn(label="Reset" type="reset" color="primary" flat class="q-ml-sm")
    .variablesForm
      <div id="app-6">
      q-input(filled
      type="text"
        v-model="contractNumber"
        label="contractNumber *"
        lazy-rules :rules="[val => val !== null && val !== '' || 'Please type your password',val => val > 6 && val < 100 || 'Please type a password']")
      </div>

    .previewForm
       p {{contractNumber}}
</template>

<script>

export default {
  name: 'Operator',
  data() {
    return {
      contractNumber:"hhhhhh",
      name: null,
      age: null,
      accept: false,
      last: ''
    }
  },
  onFlow:{
    'docs.last'(v){
      //console.log({v})
      if (!v) return
      //document.getElementById('output').innerHTML = v
      this.last = v
    }
  },

  methods: {
    selectBlock(e){
      //document.getElementById("x").childNodes
      //e.target.classList.add('selected')
      console.log(e.target.style.display = 'hidden')
      //console.log(e.target.classList.add('selected'))
    },
    onSubmit() {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'You need to accept the license and terms first'
        })
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Submitted'
        })
      }
    },
    onReset() {
      this.name = null
      this.age = null
      this.accept = false
    }
  }
}
</script>

<style scoped lang="stylus">
.operator
  display flex
  flex-direction column
  justify-content center
  align-items center
  width 100%
  padding-top 3rem

  #output
    max-width 720px
    padding 24px

  #output > :hover
    background-color ghostwhite

  .selected
    background-color yellow
    visibility hidden !important

</style>

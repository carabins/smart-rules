<template lang="pug">
  .operator ss
</template>

<script>
export default {
  name: 'Operator',
  data() {
    return {
      contractNumber: '№111111',
      contractDate: '01.01.2019',
      city: '',
      name: null,
      age: null,
      accept: false,
      last: ''
    }
  },
  onFlow: {
    'docs.last'(v) {
      //console.log({v})
      //if (!v) return
      ////document.getElementById('output').innerHTML = v
      //this.last = v
    }
  },

  methods: {
    //selectBlock(e) {
    //  //document.getElementById("x").childNodes
    //  //e.target.classList.add('selected')
    //  console.log((e.target.style.display = 'hidden'))
    //  //console.log(e.target.classList.add('selected'))
    //},
    //onSubmit() {
    //  if (this.accept !== true) {
    //    this.$q.notify({
    //      color: 'red-5',
    //      textColor: 'white',
    //      icon: 'fas fa-exclamation-triangle',
    //      message: 'You need to accept the license and terms first'
    //    })
    //  } else {
    //    this.$q.notify({
    //      color: 'green-4',
    //      textColor: 'white',
    //      icon: 'fas fa-check-circle',
    //      message: 'Submitted'
    //    })
    //  }
    //},
    //chooseCity() {},
    //onReset() {
    //  this.name = null
    //  this.age = null
    //  this.accept = false
    //}
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

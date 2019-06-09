<template lang="pug">
  .operator
    template(v-if="!selected")
      forms-list
    template(v-else)
      .half
        .answers
          q-list(bordered padding)
            q-item-label(header) Переменных: {{selected.values.length}}
            q-item(v-for="v in selected.values")
              q-item-section
                q-item-label
                b {{v.value.question}}
              q-input(outlined v-model="text" :label="v.value.name")
                //q-item-label.grey Элементов {{v.values.length}}
        #output
</template>

<script>
import FormsList from '../components/forms-list'
export default {
  name: 'Operator',
  components: { FormsList },
  data() {
    return {
      contractNumber: '№111111',
      contractDate: '01.01.2019',
      city: '',
      name: null,
      age: null,
      accept: false,
      last: '',
      selected: null
    }
  },
  onFlow: {
    'dash.selectForm'(v) {
      this.selected = v

      if (!v) return
      this.last = v
      let doc = new DOMParser().parseFromString(v.doc, 'text/html')
      this.$nextTick(() => {
        let o = document.getElementById('output')
        doc.body.childNodes.forEach(x => o.appendChild(x))
      })
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

  .half
    display flex
    .answers
      background-color yellow
      height 100%
      width 40%
  #output
    max-width 720px
    padding 24px
  #output > :hover
    background-color ghostwhite

  .selected
    background-color yellow
    visibility hidden !important
</style>

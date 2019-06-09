<template lang="pug">
  .operator
    template(v-if="!selected")
      forms-list
    template(v-else)
      .half
        .answers
          .answer(v-for="v in selected.values")
            b {{v.value.question}}
            //pre {{v}}
            q-input(outlined v-model="v.mod" @change="changed(v)" :label="v.value.name")
        #output
</template>

<script>
import FormsList from '../components/forms-list'
export default {
  name: 'Operator',
  components: { FormsList },
  data() {
    return {
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
    changed(o) {
      let el = document.getElementById(o.target.rune)

      //  zesult.concat(o.mod)
      //.concat(el.textContent.substring(target.s))
      console.log('**o.target.rune**' + o.target.rune)
      console.log('**el**' + el)
      let str1 = el.textContent
      console.log(str1)
      let p1 = str1.substring(0, o.target.s)
      console.log({ p2 })
      let p2 = str1.substring(o.target.s + o.mod.length)
      el.textContent = p1 + o.mod + p2
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
  margin : 3em

.half
    display flex
    .answers
      /*background-color yellow*/
      height 100%
      width 40%
      display flex
      flex-direction column
    .answer
        width 100%
        display flex
        flex-direction column
        margin 4px
        /*background-color #666666*/


  #output
    max-width 720px
    padding 24px 0px 24px 24px
  #output > :hover
    background-color ghostwhite

  .selected
    background-color yellow
    visibility hidden !important
</style>

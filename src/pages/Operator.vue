<template lang="pug">
  .operator
    template(v-if="!selected")
      forms-list
    template(v-else)
      .half
        .answers
          .answer(v-for="v in selected.values")
            b {{v.value.question}}
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
    changed(o){
      let el = document.getElementById(o.target.rune)

    //  zesult.concat(o.mod)
      //.concat(el.textContent.substring(target.s))
      console.log("**o.target.rune**"+o.target.rune)
      console.log("**el**"+el)
      let str1=''+el.innerHTML 
      console.log(str1);
      let result=str1.substring(0,o.target.s)+o.mod+str1.substring(o.target.e, str1.length)
      el.textContent = result

    },
    editDoc(id, text, s, e) {
    }
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

<template lang="pug">
  .expert
    input#document(type="file")
    #output.shadow-3(@click="selectBlock" v-html="last")
    //div.q-pa-md(style="max-width: 400px")
      //q-form.q-gutter-md(@submit="onSubmit" @reset="onReset")
        q-input(filled
        v-model="name"
          label="Your name *"
          hint="Name and surname"
          lazy-rules :rules="[ val => val && val.length > 0 || 'Please type something']"
        )
        q-input(filled
        type="number"
          v-model="age"
          label="Your age *"
          lazy-rules :rules="[val => val !== null && val !== '' || 'Please type your age',val => val > 0 && val < 100 || 'Please type a real age']")
        q-toggle(v-model="accept" label="I accept the license and terms")
        q-btn(label="Submit" type="submit" color="primary")
        q-btn(label="Reset" type="reset" color="primary" flat class="q-ml-sm")
</template>

<script>
export default {
  name: 'Expert',
  data() {
    return {
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
  mounted() {
    document
      .getElementById('document')
      .addEventListener('change', handleFileSelect, false)

    let mammoth = window['mammoth']
    function handleFileSelect(event) {
      readFileInputEventAsArrayBuffer(event, function(arrayBuffer) {
        mammoth
          .convertToHtml({ arrayBuffer: arrayBuffer })
          .then(displayResult)
          .done()
      })
    }

    const displayResult = (result) => {
      document.getElementById('output').innerHTML = result.value
      this.$f.docs.last(result.value)
    }

    function readFileInputEventAsArrayBuffer(event, callback) {
      var file = event.target.files[0]
      var reader = new FileReader()
      reader.onload = function(loadEvent) {
        var arrayBuffer = loadEvent.target.result
        callback(arrayBuffer)
      }

      reader.readAsArrayBuffer(file)
    }

    function escapeHtml(value) {
      return value
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
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
.expert
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

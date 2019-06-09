<template lang="pug">
  .expert
    q-drawer(
      v-model="drawer"
      :width="200"
      :breakpoint="500"
      ).shadow-1
      q-scroll-area.fit
        .editText {{editText}}
        q-btn(label="Править текст" @click="justEditText()").full-width
        q-btn-group(flat).full-width
          q-btn(flat icon="format_align_left")
          q-btn(flat icon="format_align_center")
          q-btn(flat icon="format_align_right" @click="formatAlign('right')")
        q-select(
          v-model='varModel'
          :options="vars"
          option-label="name"
          input-debounce="0"
          label="Simple filter" style="width: 250px")

    input#document(type="file")
    #output.shadow-3(@click="selectBlock" @mouseup="stopSelect()")

</template>

<script>
import Vue from 'vue'
let AnchoredHeading = Vue.component('anchored-heading', {
  render: function(h) {
    return h('div', this.level)
  },
  props: {
    level: {
      type: String,
      required: true
    }
  }
})

export default {
  name: 'Expert',
  data() {
    return {
      varModel: null,
      name: null,
      age: null,
      accept: false,
      last: '',
      drawer: true,
      selectedEl: null,
      editText: '',
      target: ''
    }
  },
  components: { AnchoredHeading },
  mapFlow: {
    vars: 'docs.vars'
  },
  onFlow: {
    'docs.last'(v) {
      if (!v) return
      this.last = v
      let doc = new DOMParser().parseFromString(v, 'text/html')
      this.$nextTick(() => {
        let o = document.getElementById('output')
        doc.body.childNodes.forEach(x => o.appendChild(x))
      })
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

    const displayResult = result => {
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
    filterFn(val, update) {
      if (val === '') {
        update(() => {
          this.options = stringOptions
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.options = stringOptions.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    stopSelect() {
      let selection = window.getSelection()
      console.log({ selection })
      let ok = this.selectedEl.textContent
      this.target = ok.slice(selection.anchorOffset, selection.focusOffset)
    },
    formatAlign(algin) {
      switch (algin) {
        case 'right':
          this.selectedEl.style.alignSelf = 'flex-end'
        //console.log()
      }
    },
    justEditText() {},
    selectBlock(e) {
      let t = e.target
      if (t.id === 'output') return
      if (this.selectedEl) {
        this.selectedEl.classList.remove('selected')
      }
      this.selectedEl = t

      if (t.textContent && t.textContent.length > 200) {
        this.editText = t.textContent.slice(0, 200) + '...'
      } else {
        this.editText = t.textContent
      }
      t.classList.add('selected')
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

<style lang="stylus">
a:any-link
  pointer-events none !important
  display none
  color red!important
  font-size 29px
.expert
  display flex
  flex-direction column
  justify-content center
  align-items center
  width 100%
  padding-top 3rem
  td
    pointer-events none
  td
    pointer-events none
  .editText
    padding 10px
    font-size .8em
  #output
    max-width 720px
    padding 24px
    display flex
    flex-direction column
  #output > :hover
    background-color ghostwhite

  .selected
    background-color yellow!important
</style>

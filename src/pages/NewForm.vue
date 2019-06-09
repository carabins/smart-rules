<template lang="pug">
  .expert
    q-dialog(v-model="editPrompt" persistent)
      q-card(style="min-width: 400px")
        q-card-section
          .column Your address
        q-card-section
          q-input( filled
          autogrow dense v-model="editText" autofocus @keyup.enter="prompt = false")
        q-card-actions(align="right" class="text-primary")
          q-btn(flat label="Сохранить" v-close-popup @click="finishEdit()")
          q-btn(flat label="Отмена" v-close-popup )
    p Имя шаблона
    q-input(type="text" v-model="templateName")
    q-drawer(
      v-model="drawer"
      :width="200"
      :breakpoint="500")
      q-scroll-area.fit.shadow-13
        q-btn(label="Править текст" @click="justEditText()").full-width
        q-btn-group(flat).full-width
          q-btn(flat icon="format_align_left")
          q-btn(flat icon="format_align_center")
          q-btn(flat icon="format_align_right" @click="formatAlign('right')")

        template(v-if="target")
          .editText Новое значение:
            q-select(
              v-model='varModel'
              :options="vars"
              option-label="name"
              input-debounce="0"
              label="Значение" style="width: 250px")
          q-btn(:disable="!varModel" label="Добавить значение" @click="addValue()").full-width
        q-list(bordered padding v-if="values.length > 0")
          q-item-label(header ) Добавленные значения:
          q-item(clickable v-ripple v-for="value in values")
            q-item-section
              q-item-label
                b {{value.value.name}}
              q-item-label.grey -{{value.target.text}}-
    input#document(type="file")
    #output.shadow-3(@click="selectBlock" @mouseup="stopSelect()")

</template>

<script>
import Vue from 'vue'
import { newRune } from '../aof/soul'
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
      editPrompt: false,
      selectedEl: null,
      editText: '',
      target: '',
      templateName:'',
      values: []
    }
  },
  components: { AnchoredHeading },
  mapFlow: {
    vars: 'docs.vars'
  },
  onFlow: {
    'docs.doEnd'() {
      console.log('?')
      this.$f.docs.canEnd(false)
      this.$f.docs.forms.mutate(l => {
        let doc = document.getElementById('output').outerHTML
        console.log(doc)
        l.push({
          name: 'Новая форма',
          doc,
          values: this.values
        })
        return l
      })

      this.$router.push('/expert')
    },
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
      if (this.selectedEl && this.selectedEl.textContent) {
        let ttt = this.selectedEl.textContent
        let target = {
          s: selection.anchorOffset,
          e: selection.focusOffset,
          text: ttt.slice(selection.anchorOffset, selection.focusOffset)
        }
        if (target.e - target.s > 1) {
          this.target = target
        } else {
          this.target = null
        }
      }
    },
    formatAlign(algin) {
      switch (algin) {
        case 'right':
          this.selectedEl.style.alignSelf = 'flex-end'
      }
    },
    justEditText() {
      this.editPrompt = true
    },
    finishEdit() {
      this.selectedEl.textContent = this.editText
    },
    selectBlock(e) {
      let t = e.target
      if (t.id === 'output') return
      if (this.selectedEl) {
        this.selectedEl.classList.remove('selected')
      }
      this.selectedEl = t
      this.editText = t.textContent
      t.classList.add('selected')
    },
    addValue() {
      console.log(this.varModel)
      console.log(this.target)
      let rune = newRune(8)
      this.selectedEl.id = rune
      this.target.rune = rune
      this.values.push({
        value: this.varModel,
        target: this.target
      })
      if (this.values.length > 1) {
        this.$f.docs.canEnd(true)
      }
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
  background-color #666666
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
    cursor pointer
    background-color white
    max-width 720px
    padding 24px
    display flex
    flex-direction column
  #output > :hover
    background-color ghostwhite

  .selected
    background-color yellow!important
</style>

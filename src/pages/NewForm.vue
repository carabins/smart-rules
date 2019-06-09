<template lang="pug">
  .expert
    q-dialog(v-model="editPrompt" persistent)
      q-card(style="min-width: 400px")
        q-card-section
          .column Править текст
        q-card-section
          q-input( filled

          autogrow dense v-model="editText" autofocus @keyup.enter="prompt = false")
        q-card-actions(align="right" class="text-primary")
          q-btn(flat label="Сохранить" v-close-popup @click="finishEdit()")
          q-btn(flat label="Отмена" v-close-popup )
    q-drawer(
      v-model="drawer"
      :width="240" bordered elevated
      :breakpoint="500")
      q-scroll-area.fit.shadow-13
        template(v-if="!editText")
          .notion Выберите блок
        template(v-else)
          q-btn(label="Править текст" @click="justEditText()").full-width
          q-btn-group(flat).full-width
            q-btn(flat icon="format_align_left")
            q-btn(flat icon="format_align_center")
            q-btn(flat icon="format_align_right" @click="formatAlign('right')")


          template(v-if="!target")
            .notion Выделите текст
          template(v-else)
            q-list(bordered padding)
              q-item-label(header) Добавленные значения:
                .ok-cont {{values.length}}
              q-expansion-item(v-for="value in vars"
                group="somegroup"
                :caption="value.question"
                :label="value.name")
                q-card
                  q-card-section
                    q-select(:value="varModel"
                      selectable
                            :options="tags"
                            color='secondary'
                            use-input use-chips
                            input-debounce="0").fa-bold.text-bold
                  q-card-section
                    q-btn(label="Справочники" no-caps).full-width
                    q-btn(label="Добавить" no-caps color='secondary' @click="addValue()").full-width
    .example-1
      .form-group
        label.labelx
          input#document(type="file")
          i.material-icons attach_file
    q-input(type="text" v-model="templateName" label="Имя шаблона").paper-name
    #output.shadow-3(@click="selectBlock" @mouseup="stopSelect()").paper

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
  watch: {
    varModel(v) {
      console.log('varModel', v)
    }
  },
  data() {
    return {
      tags: [
        'Оповещать о изменениях',
        'Привязка к справочникам',
        'Только заголовок',
        'Нормативные документы'
      ],
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
      templateName: '',
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
          name: this.name,
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
      let rune = newRune(8)
      this.selectedEl.id = rune
      this.target.rune = rune

      this.values.push({
        value: this.vars[0],
        target: this.target
      })
      console.log('x', this.varModel)
      if (this.values.length > 1) {
        this.$f.docs.canEnd(true)
      }
      //this.target = null
    }
  }
}
</script>

<style lang="stylus">
.example-1 .form-group{padding:1em;margin:1em}
.example-1 input[type=file]{outline:0;opacity:0;pointer-events:none;user-select:none}
.example-1 .labelx{width:120px; height:120px; border:2px dashed grey;border-radius:5px;display:block;padding:1.2em;transition:border 300ms ease;cursor:pointer;text-align:center}
.example-1 .labelx i{display:block;font-size:42px;}
.example-1 .label i,.example-1 .label .title{color:grey;transition:200ms color}
.example-1 .label:hover{border:2px solid #000}
.example-1 .label:hover i,.example-1 .label:hover .title{color:#000}
.expert
  background-color #cbcbcb
  display flex
  flex-direction column
  justify-content center
  align-items center
  width 100%
  padding-top 3rem
  .paper-name
    background-color floralwhite
    width 720px
    padding-left 24px
  .paper
    background-color white
    width 720px
  a:any-link
    pointer-events none !important
    display none
    color red!important
    font-size 29px
  td
    pointer-events none
  td
    pointer-events none
  .editText
    padding 10px
    font-size .8em

  #output
    cursor pointer
    padding 24px
    display flex
    flex-direction column
  #output > :hover
    background-color ghostwhite

  .selected:selection { color: red; }
  .selected
    background-color yellow!important
#document
  height 100px!important
  width 100px!important
.notion
  padding 13px
  font-weight bold
.ok-cont
  padding-top 10px
  color #222222
  font-size 30px
</style>

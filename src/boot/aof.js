import Vue from 'vue'
import { ObserveVisibility } from 'vue-observe-visibility'
import { Aotf } from 'avuef'
//import air, { SyncRoute } from 'aof-air'

//Aotf.use(air)
let isBrowser = process.browser
const modules = require.context('../aof')
export const aof = new Aotf(modules, {
  log: {
    action: false,
    flow: true
  }
})

//Vue.config.devtools = false
Vue.config.productionTip = true
Vue.directive('observe-visibility', ObserveVisibility)
Vue.use(aof)

export default function({ router }) {
  //SyncRoute(router)
  if (!isBrowser) return
  //aof.f.dash.route.on(x => {
  //  console.log({ x })
  //  router.push(x)
  //})
}

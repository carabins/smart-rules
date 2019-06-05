import { N } from 'avuef'

//let endpoint = process.browser
//  ? process.env.DEV
//    ? process.env.AOTF_DEV_SERVER
//    : `wss://${location.host}/ws`
//  : process.env.DEV
//  ? process.env.AOTF_DEV_SERVER
//  : process.env.AOTF_SERVER

export default {
  nodes: {
    endpoint: N.start('ws://localhost:8888/ws')
  },
  actions: {
    //thing(...a) {
    //  console.log({a})
    //}
    thing(flow, name, rune, { a }) {
      a.send('thing', { flow, name, rune })
    }
  }
}

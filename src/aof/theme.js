import { N } from 'avuef'

let isNight = false
const getQTheme = night => ({
  color: night ? 'black' : 'secondary', //as Text Color in inverted
  textColor: night ? 'secondary' : 'primary', // as Color in inverted
  inverted: !night
})

export default {
  nodes: {
    night: N.global.stored.bind('switch').v(isNight),
    q: N.global.v(getQTheme(isNight))
  },
  actions: {
    switch(night) {
      //Object.assign(this.$f.theme.q.v, getQTheme(night))
    }
  }
}

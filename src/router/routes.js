import { SyncRunedRoute } from 'aof-air'

const l = () => import('layouts/default.vue')

//const cards = () => import('pages/Cards.vue')

const routes = [
  SyncRunedRoute('/', () => import('pages/Landing.vue'), l, {
    //effect: f => f.coins.filter('detected'),
    //ssrSync: 'coins.detected'
  }),
  SyncRunedRoute('/doc', () => import('pages/Doc.vue'), l, {
    //effect: f => f.coins.filter('detected'),
    //ssrSync: 'coins.detected'
  })
  //SyncRunedRoute('/new', () => import('pages/New.vue'), l, {
  //  //effect: f => f.coins.filter('detected'),
  //  //ssrSync: 'coins.detected'
  //}),
  //SyncRunedRoute('/music', () => import('pages/Music.vue'), l, {
  //  //effect: f => f.coins.filter('detected'),
  //  //ssrSync: 'coins.detected'
  //  ssrSync: ['box.routes', 'songs.waves']
  //}),
  //SyncRunedRoute('/music/:r', () => import('pages/Music.vue'), l, {
  //  //effect: f => f.coins.filter('detected'),
  //  ssrSync: ['box.routes', 'songs.waves']
  //}),
  //SyncRunedRoute('/-/:route', () => import('pages/Music.vue'), l, {
  //  flowQuery: 'songs.route',
  //  ssrSync: ['box.routes', 'songs.view']
  //})
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes

//const routes = [
//  r(
//    "/",
//    {
//      sync: ["coins.raw"],
//      toflow: "coins.filter"
//    },
//    defaultLayout,
//    () => import("pages/Coins.vue")
//  ),
//
//  r(
//    "/scan/:route",
//    {
//      sync: ["coins.raw"],
//      toflow: "coins.filter"
//    },
//    defaultLayout,
//    () => import("pages/Coins.vue")
//  ),
//
//  r(
//    "/|/:route",
//    {
//      sync: ["coins.raw"],
//      toflow: "coins.filter"
//    },
//    defaultLayout,
//    () => import("pages/Coins.vue")
//  ),
//
//  r(
//    "/_/:route",
//    {
//      sync: ["coins.raw"],
//      toflow: "coins.filter"
//    },
//    defaultLayout,
//    () => import("pages/Coins.vue")
//  )
//]
//
//// Always leave this as last one
//if (process.env.MODE !== "ssr") {
//  routes.push({
//    path: "*",
//    component: () => import("pages/Error404.vue")
//  })
//}
//
//export default routes

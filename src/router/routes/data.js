export default [
  {
    path: '/data',
    name: 'data',
    component: () =>
      import(/* webpackChunkName: "data" */ '@/components/Data.vue')
  }
]

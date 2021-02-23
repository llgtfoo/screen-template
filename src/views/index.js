import * as modules from './*/index.js'
export default (Vue, router, store) => {
  Object.keys(modules).forEach(key => {
    Vue.use(modules[key], store, router)
  })
  router.addRoutes(
    [
      {
        path: '/',
        name: 'root',
        redirect: '/screen',
      },
      {
        path: '/403', // 此处需特别注意至于最底部
        component: () => import('../components/PermissionDenied'),
      },
      {
        path: '/404', // 此处需特别注意至于最底部
        component: () => import('../components/NotFound'),
      },
      {
        path: '*',
        redirect: '/404',
      },
    ],
  )
}
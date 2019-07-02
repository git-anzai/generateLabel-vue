import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: (resolve) => require(['@/components/common/login'], resolve)
    },
    {
      path: '/index',
      name: 'index',
      component: (resolve) => require(['@/components/common/index'], resolve),
      children: [
        {
          path: '/default',
          name: 'default',
          component: (resolve) => require(['@/components/pages/default'], resolve)
        },
        {
          path: '/orderExamine',
          name: 'orderExamine',
          component: (resolve) => require(['@/components/pages/orderManage/orderExamine'], resolve)
        },
        {
          path: '/orderRefund',
          name: 'orderRefund',
          component: (resolve) => require(['@/components/pages/orderManage/orderRefund'], resolve)
        }
      ]
    }
  ]
})

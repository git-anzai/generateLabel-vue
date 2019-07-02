const menu = [
  // {
  //   path: '/',
  //   name: '首页',
  //   children: [],
  // },
  {
    path: '/orderManage',
    name: '订单管理',
    children: [
      {
        path: '/orderExamine',
        name: '订单管理',
      },
      {
        path: '/orderRefund',
        name: '手工订单',
      }
    ]
  }
]

export default menu

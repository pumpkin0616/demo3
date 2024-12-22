
export default [
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/layout/IndexLayout.vue'),
    children: [
      {
        path: 'list',
        name: 'userList',
        meta: {
          title: '用户列表' // 页面标题
        },
        component: () => import('@/views/user/UserList.vue')
      },
      {
        path: 'detail',
        name: 'userDetail',
        meta: {
          title: '用户详情' // 页面标题
        },
        component: () => import('@/views/user/UserDetail.vue')
      }
    ]
  }
];


export default [
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/layout/IndexLayout.vue'),
    children: [
      {
        path: 'list',
        name: 'userList',
        component: () => import('@/views/user/UserList.vue')
      },
      {
        path: 'detail',
        name: 'userDetail',
        component: () => import('@/views/user/UserDetail.vue')
      }
    ]
  }
];

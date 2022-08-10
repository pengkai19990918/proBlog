export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
  },
  {
    path: '/home',
    name: 'home',
    icon: 'smile',
    component: './Home',
  },
  {
    path: '/detail',
    icon: 'smile',
    component: './DocDetail',
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    component: './404',
  },
];

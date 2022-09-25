export default [
  // {
  //   path: '/user',
  //   layout: false,
  //   routes: [
  //     {
  //       name: 'login',
  //       path: '/user/login',
  //       component: './User/Login',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  {
    path: '/home',
    name: 'home',
    icon: 'smile',
    component: './Home',
  },
  {
    path: '/detail/:id',
    icon: 'smile',
    component: './DocDetail',
  },
  {
    path: '/write',
    name: 'write',
    icon: 'smile',
    component: './WriteDoc',
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    component: './404',
  },
];

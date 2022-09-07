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
    path: '/detail',
    icon: 'smile',
    component: './DocDetail',
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    component: './404',
  },
];

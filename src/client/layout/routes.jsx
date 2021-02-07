const routers = [
  {
    path: '/',
    loader: () => import('../page/home'),
    exact: true,
  },
  {
    path: '/about',
    loader: () => import('../page/about'),
    exact: true,
  },
];

export default routers;
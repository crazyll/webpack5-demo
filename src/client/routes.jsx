import Home from './page/home';
import About from './page/about';

const routers = [
  {
    path: '/',
    loader: () => import('./page/home'),
    component: Home,
    exact: true,
  },
  {
    path: '/about',
    loader: () => import('./page/about'),
    component: About,
    exact: true,
  },
];

export default routers;
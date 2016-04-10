import App from './App';
import authRoutes from '../auth/authRoutes';
import commentRoutes from '../comments/commentRoutes';
import ticketRoutesFactory from '../tickets/ticketRoutes';

export default (store) => ({
  component: 'div',
  childRoutes: [{
    path: '/',
    component: App,
    childRoutes: [
      ...authRoutes,
      ...commentRoutes,
      ...ticketRoutesFactory(store)
    ]
  }]
});


import TicketList from './TicketList';
import EditTicket from './EditTicket';
import Ticket from './Ticket';
import redirectNotAuthenticatedFactory from '../auth/redirectNotAuthenticated';

export default store => {
  const redirectNotAuthenticated = redirectNotAuthenticatedFactory(store);

  return [{
    path: '/tickets',
    component: TicketList
  }, {
    path: '/tickets/:id',
    component: Ticket
  }, {
    path: '/tickets/:id/edit',
    onEnter: redirectNotAuthenticated,
    component: EditTicket
  }];
};

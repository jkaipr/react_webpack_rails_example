import EditTicket from './EditTicket';
import NewTicket from './NewTicket';
import Ticket from './Ticket';
import TicketList from './TicketList';
import redirectNotAuthenticatedFactory from '../auth/redirectNotAuthenticated';

export default store => {
  const redirectNotAuthenticated = redirectNotAuthenticatedFactory(store);

  return [
    {
      path: '/tickets',
      component: TicketList
    }, {
      path: '/tickets/new',
      onEnter: redirectNotAuthenticated,
      component: NewTicket
    }, {
      path: '/tickets/:id',
      component: Ticket
    }, {
      path: '/tickets/:id/edit',
      onEnter: redirectNotAuthenticated,
      component: EditTicket
    }
  ];
};

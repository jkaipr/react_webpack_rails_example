import TicketList from './TicketList';
import Ticket from './Ticket';

export default [{
  path: '/tickets',
  component: TicketList
}, {
  path: '/tickets/:id',
  component: Ticket
}];

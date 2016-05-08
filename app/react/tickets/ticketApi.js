/* globals API_URL */
import { fetchEntitiesFactory, fetchEntityFactory } from '../app/factories/fetchEntities';

export const fetchTickets = fetchEntitiesFactory('tickets');
export const fetchTicket = fetchEntityFactory('tickets');

export const createTicket = (ticket, jwt) => fetch(`${API_URL}/tickets`, {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': jwt
  },
  // Allows API to set http-only cookies with AJAX calls
  // @see http://www.redotheweb.com/2015/11/09/api-security.html
  credentials: 'include',
  method: 'POST',
  body: JSON.stringify({ description: ticket.description, subject: ticket.subject })
})
  .then(response => {
    if (!response.ok) {
      return response.text().then(result => Promise.reject(new Error(result)));
    }

    return response.json();
  })
  .then(json => {
    return { ticket: json };
  }, error => ({
    error
  }));

export const updateTicket = (ticket, jwt) => fetch(`${API_URL}/tickets/${ticket.id}`, {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': jwt
  },
  // Allows API to set http-only cookies with AJAX calls
  // @see http://www.redotheweb.com/2015/11/09/api-security.html
  credentials: 'include',
  method: 'PUT',
  body: JSON.stringify({
    user_id: ticket.user_id,
    description: ticket.description,
    subject: ticket.subject,
    state: ticket.state
  })
})
  .then(response => {
    if (!response.ok) {
      return response.text().then(result => Promise.reject(new Error(result)));
    }

    return response.json();
  })
  .then(json => {
    return { ticket: json };
  }, error => ({
    error
  }));

export const destroyTicket = (ticket, jwt) => fetch(`${API_URL}/tickets/${ticket.id}`, {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': jwt
  },
  // Allows API to set http-only cookies with AJAX calls
  // @see http://www.redotheweb.com/2015/11/09/api-security.html
  credentials: 'include',
  method: 'DELETE'
})
  .then(response => {
    if (!response.ok) {
      return response.text().then(result => Promise.reject(new Error(result)));
    }

    return response.json();
  })
  .then(json => {
    return { ticket: json };
  }, error => ({
    error
  }));

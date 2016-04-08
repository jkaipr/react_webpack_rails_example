/* globals API_URL */

export const fetchComments = (ticket, jwt) => fetch(`${API_URL}/comments`, {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': jwt
  },
  // Allows API to set http-only cookies with AJAX calls
  // @see http://www.redotheweb.com/2015/11/09/api-security.html
  credentials: 'include',
  method: 'POST',
  body: JSON.stringify({ ticket_id: ticket.id })
})
  .then(response => {
    if (!response.ok) {
      return response.text().then(result => Promise.reject(new Error(result)));
    }

    return response.json();
  })
  .then(json => {
    return { comments: json };
  }, error => ({
    error
  }));

export const fetchNewComment = (comment, jwt) => fetch(`${API_URL}/comments`, {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': jwt
  },
  // Allows API to set http-only cookies with AJAX calls
  // @see http://www.redotheweb.com/2015/11/09/api-security.html
  credentials: 'include',
  method: 'POST',
  body: JSON.stringify({ comment })
})
  .then(response => {
    if (!response.ok) {
      return response.text().then(result => Promise.reject(new Error(result)));
    }

    return response.json();
  })
  .then(json => {
    return { comment: json };
  }, error => ({
    error
  }));

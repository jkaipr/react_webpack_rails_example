/* globals API_URL */
export function fetchLogin(email, password) {
  return fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({ auth: { email, password } }),
    // Allows API to set http-only cookies with AJAX calls
    // @see http://www.redotheweb.com/2015/11/09/api-security.html
    credentials: 'include'
  })
    .then(response => {
      if (!response.ok) {
        return response.text().then(result => Promise.reject(new Error(result)));
      }

      return response.json();
    })
    .then(json => {
      return json;
    }, error => ({
      error
    }));
}

export const storeLocalUser = ({ id, admin, email, token, expires }) => {
  localStorage.setItem('id', id);
  localStorage.setItem('admin', admin);
  localStorage.setItem('email', email);
  localStorage.setItem('token', token);
  localStorage.setItem('expires', expires * 1000);
};

export const removeLocalUser = () => {
  localStorage.removeItem('id');
  localStorage.removeItem('admin');
  localStorage.removeItem('email');
  localStorage.removeItem('token');
  localStorage.removeItem('expires');
};

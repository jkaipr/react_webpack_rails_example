import classNames from 'classnames';
import React, { PropTypes } from 'react';
import { reduxForm, propTypes } from 'redux-form';
import buildSchema from 'redux-form-schema';

import authActions from './authActions';

const loginSchema = buildSchema({
  email: {
    required: true,
    type: 'email'
  },
  password: {
    required: true
  }
});

const Login = ({ loginError, login, previousRoute, fields: { email, password },
  handleSubmit, submitting, submitFailed }) => (
  <div className="container login">
    <div className="row">
      <div className="col-xs-12">
        <div className="jumbotron">
          <h2 className="display-4">Login</h2>
          {loginError &&
          <div className="alert alert-danger" role="alert">
            {loginError.message}
          </div>
            }
          <form onSubmit={handleSubmit(login.bind(null, previousRoute))}>
            <div className={classNames('form-group',
              { 'has-error': email.touched && email.error })}
            >
              <input
                type="email"
                className="form-control input-lg"
                placeholder="Your email"
                {...email}
              />
              {email.touched && email.error && <span className="help-block">{email.error}</span>}
            </div>
            <div className={classNames('form-group',
              { 'has-error': password.touched && password.error })}
            >
              <input
                type="password"
                className="form-control input-lg"
                placeholder="Your password"
                {...password}
              />
              {password.touched && password.error &&
                <span className="help-block">{password.error}</span>
              }
            </div>
            <button type="submit" disabled={submitting}
              className={classNames('btn btn-lg btn-primary',
              { 'btn-danger': loginError || submitFailed })}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

Login.propTypes = {
  ...propTypes,
  login: PropTypes.func.isRequired,
  previousRoute: PropTypes.string
};

export default reduxForm({
  form: 'login',
  fields: loginSchema.fields,
  validate: loginSchema.validate,
  destroyOnUnmount: false
}, state => {
  let previousRoute;
  try {
    previousRoute = state.routing.locationBeforeTransitions.state.nextPathname;
  } catch (error) {
    previousRoute = '/tickets';
  }

  return {
    previousRoute,
    loginError: state.auth.error
  };
}, {
  login: authActions.login.request
})(Login);

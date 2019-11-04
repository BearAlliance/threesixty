import React from 'react';
import { connect } from 'react-redux';
import { login } from '../store/actions';
import { LoaderButton } from '../shared/button-with-loader.component';
import { Redirect } from 'react-router';
import { ErrorMessage, Field, Form, Formik } from 'formik';

export class _LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  handleLogin(values, actions) {
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(res => (res.ok ? res.json() : Promise.reject(res)))
      .then(res => {
        actions.setSubmitting(false);
        this.props.login(res.userData.firstName);
      })
      .catch(res => {
        console.log(res);
        actions.setSubmitting(false);
        switch (res.status) {
          case 401:
            console.log(401);
            actions.setErrors({
              email: 'Email or Password is invalid'
            });
          default:
            this.setState({
              error: true
            });
        }
      });
  }

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/home" />;
    }
    return (
      <div className="section">
        <div className="columns">
          <div className="column" />
          <div className="column box">
            <Formik
              onSubmit={(values, actions) => this.handleLogin(values, actions)}
              initialValues={{}}
              render={({ errors, status, touched, isSubmitting }) => (
                <Form>
                  <h3 className="is-size-3">Login</h3>

                  <div className="field">
                    <div className="control">
                      <label className="label">Username</label>
                      <Field
                        className="input"
                        type="input"
                        name="email"
                        placeholder="Email"
                      />
                      <ErrorMessage
                        className="has-text-danger"
                        name="email"
                        component="div"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <label className="label">Password</label>
                      <Field
                        className="input"
                        type="password"
                        name="password"
                        placeholder="Password"
                      />
                      <ErrorMessage
                        className="has-text-danger"
                        name="password"
                        component="div"
                      />
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <LoaderButton
                        className="button is-link"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                        text="Submit"
                        type="submit"
                      />
                      {this.state.error && (
                        <div className="has-text-danger">Error logging in</div>
                      )}
                    </div>
                  </div>
                </Form>
              )}
            />
          </div>
          <div className="column" />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
}

export const LoginPage = connect(
  mapStateToProps,
  { login }
)(_LoginPage);

import React from 'react';
import { LoaderButton } from '../shared/button-with-loader.component';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

export class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      signedUp: null
    };
  }

  handleSubmit(values, actions) {
    this.setState({
      loading: true,
      signedUp: null
    });

    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    }).then(res => {
      // User already exists
      switch (res.status) {
        case 400:
          actions.setErrors({ email1: 'This email is already registered' });
          break;
        case 201:
          this.setState({
            signedUp: true
          });
          break;
        default:
          this.setState({ error: true });
      }
      actions.setSubmitting(false);
      this.setState({
        loading: false
      });
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="section">
        <div className="columns">
          <div className="column" />
          <div className="column box">
            <h3 className="is-size-3">Sign Up</h3>

            <Formik
              onSubmit={(values, actions) => this.handleSubmit(values, actions)}
              initialValues={{}}
              render={({ errors, status, touched, isSubmitting }) => (
                <Form>
                  <div className="field">
                    <div className="control">
                      <label className="label">Email Address</label>
                      <Field
                        className="input"
                        type="text"
                        name="email1"
                        placeholder="Email"
                      />
                      <ErrorMessage
                        className="has-text-danger"
                        name="email1"
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
                        text="Submit"
                        loading={isSubmitting}
                      />
                    </div>
                  </div>
                </Form>
              )}
            />
            {this.state.signedUp && (
              <div>
                <span className="has-text-success">Nice!</span> You're signed
                up. Now just to <Link to="/login">Login</Link>
              </div>
            )}
          </div>
          <div className="column" />
        </div>
      </div>
    );
  }
}

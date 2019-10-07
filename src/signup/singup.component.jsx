import React from 'react';
import { LoaderButton } from '../shared/button-with-loader.component';
import { ErrorMessage, Field, Form, Formik } from 'formik';

export class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  handleSubmit(values, actions) {
    this.setState({
      loading: true
    });

    fetch('./signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    }).then(res => {
      // User already exists
      if (res.status === 400) {
        actions.setErrors({ email1: 'This email is already registered' });
      }
      actions.setSubmitting(false);
      this.setState({
        loading: false
      });
    });
  }

  render() {
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
          </div>
          <div className="column" />
        </div>
      </div>
    );
  }
}

import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { LoaderButton } from '../shared/button-with-loader.component';
import { Loading } from '../shared/loading.component';

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userInfo: null,
      error: null,
      saveSuccess: null
    };
  }

  componentDidMount() {
    console.log('didMount');
    fetch('/api/user/me', {
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(res => {
        console.log(res);
        return res;
      })
      .then(res => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .then(res => {
        this.setState({
          loading: false,
          error: null,
          userInfo: res
        });
      })
      .catch(err => {
        this.setState({ loading: false, error: err });
      });
  }

  handleSubmit(values, actions) {
    this.setState({
      saveSuccess: false
    });
    fetch('/api/user/me', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(res => {
        actions.setSubmitting(false);
        this.setState({
          saveSuccess: true
        });
      })
      .catch(err => {
        actions.setSubmitting(false);
        this.setState({
          error: true
        });
      });
  }

  profileForm() {
    const { userInfo } = this.state;

    console.log(this.state);
    return (
      <Formik
        onSubmit={(values, actions) => this.handleSubmit(values, actions)}
        initialValues={{
          firstName: userInfo.first_name,
          lastName: userInfo.last_name
        }}
        render={({ errors, status, touched, isSubmitting }) => (
          <Form>
            <div className="field">
              <div className="control">
                <label className="label">First Name</label>
                <Field
                  className="input"
                  type="input"
                  name="firstName"
                  placeholder="First Name"
                />
                <ErrorMessage
                  className="has-text-danger"
                  name="firstNamae"
                  component="div"
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="label">Last Name</label>
                <Field
                  className="input"
                  type="input"
                  name="lastName"
                  placeholder="Last Name"
                />
                <ErrorMessage
                  className="has-text-danger"
                  name="lastName"
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
                  text="Save"
                  type="submit"
                />
              </div>
            </div>
          </Form>
        )}
      />
    );
  }

  render() {
    const { loading, error, saveSuccess } = this.state;
    return loading ? (
      <Loading />
    ) : (
      <div className="box">
        <h3 className="is-size-3">Profile</h3>
        {error && (
          <div className="is-size-6 has-text-danger">
            There was a problem loading your profile: {error}
          </div>
        )}
        {!error && this.profileForm()}
        {saveSuccess && <div className="has-text-success">Saved!</div>}
      </div>
    );
  }
}

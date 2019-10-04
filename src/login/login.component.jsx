import React from 'react';
import { connect } from 'react-redux';
import { login } from '../store/actions';
import { LoaderButton } from '../shared/button-with-loader.component';
import { Redirect } from 'react-router';

export class _LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  handleLogin() {
    console.log('logging in');
    this.setState({
      loading: true
    });

    setTimeout(() => {
      this.props.login('nick');
      this.setState({
        loading: false
      });
    }, 500);
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
            <h3 className="is-size-3">Login</h3>

            <div className="field">
              <div className="control">
                <label className="label">Username</label>
                <input className="input" type="text" placeholder="Username" />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="label">Password</label>
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <LoaderButton
                  loading={this.state.loading}
                  onClick={() => this.handleLogin()}
                  text="Submit"></LoaderButton>
              </div>
            </div>
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

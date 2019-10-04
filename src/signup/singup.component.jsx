import React from 'react';
import { LoaderButton } from '../shared/button-with-loader.component';

export class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  handleSubmit() {
    this.setState({
      loading: true
    });

    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 500);
  }

  render() {
    return (
      <div className="section">
        <div className="columns">
          <div className="column" />
          <div className="column box">
            <h3 className="is-size-3">Sign Up</h3>

            <div className="field">
              <div className="control">
                <label className="label">Email Address</label>
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
                <label className="label">Repeat Password</label>
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
                  onClick={() => this.handleSubmit()}
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

import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions';

class _Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      burgerActive: false
    };
  }

  toggleBurger() {
    this.setState({
      burgerActive: !this.state.burgerActive
    });
  }

  handleLogout() {
    this.props.logout();
  }

  navbarEnd() {
    if (this.props.isLoggedIn) {
      return (
        <div className="navbar-item has-dropdown is-hoverable">
          <div className="navbar-link">{this.props.username}</div>
          <div className="navbar-dropdown is-right">
            <Link to="/settings" className="navbar-item">
              Settings
            </Link>
            <hr className="navbar-divider" />
            <a className="navbar-item" onClick={() => this.handleLogout()}>
              Logout
            </a>
          </div>
        </div>
      );
    }
    return (
      <div className="navbar-item">
        <div className="buttons">
          <Link to="/signup" className="button is-primary">
            <strong>Sign up</strong>
          </Link>
          <Link to="/login" className="button is-light">
            Log in
          </Link>
        </div>
      </div>
    );
  }

  render() {
    const burgerClass = classnames({
      'navbar-burger': true,
      burger: true,
      'is-active': this.state.burgerActive
    });

    const menuClass = classnames({
      'navbar-menu': true,
      'is-active': this.state.burgerActive
    });

    return (
      <nav
        className="navbar has-background-light"
        role="navigation"
        aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            360
          </Link>

          <a
            role="button"
            className={burgerClass}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={() => this.toggleBurger()}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className={menuClass}>
          <div className="navbar-start">
            <Link to="/home" className="navbar-item">
              Home
            </Link>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">More</a>

              <div className="navbar-dropdown">
                <a className="navbar-item">About</a>
                <a className="navbar-item">Contact</a>
                <hr className="navbar-divider" />
                <a className="navbar-item">Report an issue</a>
              </div>
            </div>
          </div>

          <div className="navbar-end">{this.navbarEnd()}</div>
        </div>
      </nav>
    );
  }
}

function mapSateToProps(state) {
  return {
    isLoggedIn: state.user.isLoggedIn,
    username: state.user.username
  };
}

export const Nav = connect(
  mapSateToProps,
  { logout }
)(_Nav);

import React, { Fragment } from 'react';
import classnames from 'classnames';
import { Route, Switch } from 'react-router';
import { Profile } from './profile.component';
import { Organizations } from './organizations.component';
import { Account } from './account.component';
import { Link } from 'react-router-dom';
import { Invitations } from './Invitations.component';

export class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  getFullRoute(subPath) {
    const { path } = this.props.match;
    return `${path}${subPath}`;
  }

  render() {
    const menu = [
      {
        label: 'General',
        items: [
          {
            name: 'Profile',
            route: '/profile',
            component: Profile
          },
          {
            name: 'Organizations',
            route: '/organizations',
            component: Organizations
          }
        ]
      },
      {
        label: 'Administration',
        items: [
          {
            name: 'Account',
            route: '/account',
            component: Account
          },
          {
            name: 'Invitations',
            route: '/invitations',
            component: Invitations
          }
        ]
      }
    ];
    const { pathname } = this.props.location;

    return (
      <div>
        <h3 className="is-size-3">Settings</h3>
        <div className="columns section">
          <div className="column is-3">
            <aside className="menu">
              {menu.map(menuBlock => (
                <Fragment key={menuBlock.label}>
                  <p className="menu-label">{menuBlock.label}</p>
                  <ul className="menu-list">
                    {menuBlock.items.map(item => (
                      <li>
                        <Link
                          to={this.getFullRoute(item.route)}
                          className={classnames({
                            'is-active':
                              pathname === this.getFullRoute(item.route)
                          })}>
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Fragment>
              ))}
            </aside>
          </div>

          <div className="column">
            <Switch>
              {menu
                .reduce((acc, menuBlock) => [...acc, ...menuBlock.items], [])
                .map(item => (
                  <Route
                    exact
                    path={this.getFullRoute(item.route)}
                    component={item.component}
                  />
                ))}
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

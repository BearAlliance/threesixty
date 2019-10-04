import React from 'react';
import classnames from 'classnames';
import { Link, Route, Switch } from 'react-router-dom';
import { MyFeedback } from './my-feedback.component';
import { WriteFeedback } from './write-feedback.component';

export class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  getFullRoute(subPath) {
    const { path } = this.props.match;
    return `${path}${subPath}`;
  }

  render() {
    const { pathname } = this.props.location;
    const tabs = [
      {
        name: 'My Feedback',
        route: `/myfeedback`,
        component: MyFeedback
      },
      {
        name: 'Write Feedback',
        route: `/writefeedback`,
        component: WriteFeedback
      }
    ];

    return (
      <div>
        <h3 className="is-size-3">Home</h3>
        <div className="tabs">
          <ul>
            {tabs.map(tab => (
              <li
                key={tab.name}
                className={classnames({
                  'is-active': pathname === this.getFullRoute(tab.route)
                })}>
                <Link to={this.getFullRoute(tab.route)}>{tab.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Switch>
          {tabs.map(tab => (
            <Route
              key={tab.route}
              exact
              path={this.getFullRoute(tab.route)}
              component={tab.component}
            />
          ))}
        </Switch>
      </div>
    );
  }
}

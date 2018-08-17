import React from "react";

const NotificationContext = React.createContext();

export const NotificationComsumer = NotificationContext.Consumer;

export function NotificationConnect(params = []) {
  return function NotificationConnectedComponent(Component) {
    return function ConnectedComponentParameter(props) {
      return (
        <NotificationComsumer>
          {state => {
            let requestedState = {};
            params.forEach(param => {
              if (state[param] !== undefined) {
                requestedState[param] = state[param];
              }
            });
            return <Component {...props} {...requestedState} />;
          }}
        </NotificationComsumer>
      );
    };
  };
}

export class NotificationProvider extends React.Component {
  state = {
    notifications: null
  };

  setNotifications = notifications => this.setState({ notifications });

  getNotifications = () => this.state.notifications;

  render() {
    return (
      <NotificationContext.Provider
        value={{
          notifications: this.state.notifications,
          setNotifications: this.setNotifications,
          getNotifications: this.getNotifications
        }}
      >
        {this.props.children}
      </NotificationContext.Provider>
    );
  }
}

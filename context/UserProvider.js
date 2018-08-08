import React from "react";

const UserContext = React.createContext();

export const UserComsumer = UserContext.Consumer;

export function UserConnect(params = []) {
  return function UserConnectedComponent(Component) {
    return function ConnectedComponentParameter(props) {
      return (
        <UserComsumer>
          {state => {
            let requestedState = {};
            params.forEach(param => {
              if (state[param] !== undefined) {
                requestedState[param] = state[param];
              }
            });
            return <Component {...props} {...requestedState} />;
          }}
        </UserComsumer>
      );
    };
  };
}

export class UserProvider extends React.Component {
  state = {
    user: null
  };

  setUser = user => {
    console.log("user set", user);
    this.setState({ user });
  };
  getUser = () => this.state.user;

  render() {
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          setUser: this.setUser,
          getUser: this.getUser
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

import React from "react";

const TeamCoursesContext = React.createContext();

export const TeamCoursesComsumer = TeamCoursesContext.Consumer;

export function TeamCoursesConnect(params = []) {
  return function TeamCoursesConnectedComponent(Component) {
    return function ConnectedComponentParameter(props) {
      return (
        <TeamCoursesComsumer>
          {state => {
            let requestedState = {};
            params.forEach(param => {
              if (state[param] !== undefined) {
                requestedState[param] = state[param];
              }
            });
            return <Component {...props} {...requestedState} />;
          }}
        </TeamCoursesComsumer>
      );
    };
  };
}

export class TeamCoursesProvider extends React.Component {
  state = {
    teamCourses: null
  };

  setTeamCourses = teamCourses => this.setState({ teamCourses });

  getTeamCourses = () => this.state.teamCourses;

  render() {
    return (
      <TeamCoursesContext.Provider
        value={{
          teamCourses: this.state.teamCourses,
          setTeamCourses: this.setTeamCourses,
          getTeamCourses: this.getTeamCourses
        }}
      >
        {this.props.children}
      </TeamCoursesContext.Provider>
    );
  }
}

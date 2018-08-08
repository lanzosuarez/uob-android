import React from "react";

const CourseContext = React.createContext();

export const CourseComsumer = CourseContext.Consumer;

export function CourseConnect(params = []) {
  return function CourseConnectedComponent(Component) {
    return function ConnectedComponentParameter(props) {
      return (
        <CourseComsumer>
          {state => {
            let requestedState = {};
            params.forEach(param => {
              if (state[param] !== undefined) {
                requestedState[param] = state[param];
              }
            });
            return <Component {...props} {...requestedState} />;
          }}
        </CourseComsumer>
      );
    };
  };
}

export class CourseProvider extends React.Component {
  state = {
    courses: null
  };

  setCourses = courses => this.setState({ courses });

  getCourses = () => this.state.courses;

  render() {
    return (
      <CourseContext.Provider
        value={{
          courses: this.state.courses,
          setCourses: this.setCourses,
          getCourses: this.getCourses
        }}
      >
        {this.props.children}
      </CourseContext.Provider>
    );
  }
}

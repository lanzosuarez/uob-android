import React from "react";

const ProfileContext = React.createContext();

export const ProfileComsumer = ProfileContext.Consumer;

export function ProfileConnect(params = []) {
  return function ProfileConnectedComponent(Component) {
    return function ConnectedComponentParameter(props) {
      return (
        <ProfileComsumer>
          {state => {
            let requestedState = {};
            params.forEach(param => {
              if (state[param] !== undefined) {
                requestedState[param] = state[param];
              }
            });
            return <Component {...props} {...requestedState} />;
          }}
        </ProfileComsumer>
      );
    };
  };
}

export class ProfileProvider extends React.Component {
  state = {
    profile: null,
    upcomingCourses: null,
    pastCourses: null,
    courseBookings: null
  };

  setProfile = profile => this.setState({ profile });

  getProfile = () => this.state.profile;

  setUpcomingCourses = upcomingCourses => this.setState({ upcomingCourses });

  getUpcomingCourses = () => this.state.upcomingCourses;

  setPastCourses = pastCourses => this.setState({ pastCourses });

  getPastCourses = () => this.state.pastCourses;

  setCourseBookings = courseBookings => this.setState({ courseBookings });

  render() {
    return (
      <ProfileContext.Provider
        value={{
          profile: this.state.profile,
          upcomingCourses: this.state.upcomingCourses,
          pastCourses: this.state.pastCourses,
          courseBookings: this.state.courseBookings,
          setProfile: this.setProfile,
          getProfile: this.getProfile,
          setUpcomingCourses: this.setUpcomingCourses,
          getUpcomingCourses: this.getUpcomingCourses,
          setPastCourses: this.setPastCourses,
          getPastCourses: this.getPastCourses,
          setCourseBookings: this.setCourseBookings
        }}
      >
        {this.props.children}
      </ProfileContext.Provider>
    );
  }
}

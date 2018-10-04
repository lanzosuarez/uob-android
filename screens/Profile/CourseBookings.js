import React, { Component } from "react";

import {
  Header,
  Title,
  Body,
  Icon,
  Left,
  Right,
  Container,
  Button,
  Content
} from "native-base";

import {
  Text,
  View,
  ToastAndroid,
  RefreshControl,
  ScrollView
} from "react-native";

import Profile from "../../services/Profile";
import Loading from "../Loading";
import CourseBookingItem from "./CourseBookingItem";
import { TeamCoursesConnect } from "../../context/TeamCourses";
import { headerFontColor, headerBgColor, userType } from "../../global";

const blue = "#00246a";

class CourseBookings extends Component {
  constructor(props) {
    super(props);
  }

  state = { loading: false, refreshing: false };

  componentDidMount() {
    // if (this.props.teamCourses === null) {
    this.getCourses();
    // }
  }

  toggleLoad = () => this.setState({ loading: !this.state.loading });
  toggleRefresh = () => this.setState({ refreshing: !this.state.refreshing });

  showToast = text => ToastAndroid.show(text, ToastAndroid.SHORT);

  getCourses = () => {
    this.toggleLoad();
    Profile.getCourseBookings()
      .then(r => {
        this.toggleLoad();
        const { status, message, data } = r.data;
        if (status) {
          console.log("data", data);
          this.props.setTeamCourses(data);
        } else {
          this.props.navigation.goBack();
          this.showToast(message);
        }
      })
      .catch(err => {
        this.toggleLoad();
        this.props.navigation.goBack();
        this.showToast(
          "Something went wrong. Try checking your internet connection"
        );
      });
  };

  confirmBooking = (bookingId, bookingStatus) => {
    console.log(bookingId, bookingStatus);
    this.toggleLoad();
    Profile.confirmBooking(bookingStatus, bookingId)
      .then(r => {
        this.toggleLoad();
        const { status, message, data } = r.data;
        if (status) {
          const teamCourses = [...this.props.teamCourses],
            teamCourseIndex = teamCourses.findIndex(t => t.id === bookingId);
          if (teamCourseIndex > -1) {
            let teamCourse = teamCourses[teamCourseIndex];
            teamCourse.status = bookingStatus;
            teamCourses.splice(teamCourseIndex, 1, teamCourse);
            this.props.setTeamCourses(teamCourses);
            console.log(this.props.teamCourses);
          }
        } else {
          this.showToast(message);
        }
      })
      .catch(err => {
        console.log(err);
        this.toggleLoad();
        this.showToast(
          "Something went wrong. Try checking your internet connection"
        );
      });
  };

  onRefresh = () => {
    this.toggleRefresh();
    Profile.getCourseBookings()
      .then(r => {
        this.toggleRefresh();
        const { status, message, data } = r.data;
        if (status) {
          this.props.setTeamCourses(data);
        } else {
          this.showToast(message);
        }
      })
      .catch(err => {
        this.toggleRefresh();
        this.showToast(
          "Something went wrong. Try checking your internet connection"
        );
      });
  };

  render() {
    const courses = this.props.teamCourses || [];
    return (
      <Container>
        <Loading isVisible={this.state.loading} transparent={false} />
        <Header style={{ backgroundColor: headerBgColor }}>
          <Left style={{ flex: 1 }}>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Icon
                type="MaterialIcons"
                style={{ color: headerFontColor, fontSize: 17 }}
                name="chevron-left"
              />
              <Text
                style={{
                  color: headerFontColor,
                  fontFamily: "Roboto_medium",
                  fontSize: 17
                }}
              >
                Back
              </Text>
            </Button>
          </Left>
          <Body
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Title
              style={{
                fontSize: 16,
                color: headerFontColor,
                fontFamily: "AgendaBold"
              }}
            >
              Course Bookings
            </Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <Content
          refreshControl={
            <RefreshControl
              tintColor="#00246a"
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          contentContainerStyle={{ padding: 30, paddingTop: 40 }}
        >
          <ScrollView
            stlye={{
              flex: 1,
              alignItems: "center"
            }}
          >
            {courses.length === 0 ? (
              <Text
                style={{
                  color: blue,
                  fontFamily: "Roboto_light",
                  textAlign: "center",
                  marginTop: 20
                }}
              >
                Your team doesnt have any course bookings
              </Text>
            ) : (
              <View style={{ flex: 1 }}>
                {courses.map(c => (
                  <CourseBookingItem
                    confirmBooking={this.confirmBooking}
                    key={c.id}
                    booking={c}
                  />
                ))}
              </View>
            )}
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const styles = {
  f: {
    flex: 1
  },
  bold: {
    fontFamily: "AgendaBold"
  },
  medium: {
    fontFamily: "Roboto_medium"
  },
  light: {
    fontFamily: "Roboto_light"
  },
  txt: {
    color: blue,
    fontSize: 14
  }
};

export default TeamCoursesConnect(["teamCourses", "setTeamCourses"])(
  CourseBookings
);

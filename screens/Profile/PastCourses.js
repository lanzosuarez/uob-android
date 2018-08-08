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

import { Text, View, ToastAndroid } from "react-native";

import Course from "./Course";

import { ProfileConnect } from "../../context/ProfileProvider";

import Profile from "../../services/Profile";
import Loading from "../Loading";

const blue = "#00246a";

class PastCourses extends Component {
  constructor(props) {
    super(props);
  }

  state = { loading: false };

  componentDidMount() {
    if (this.props.pastCourses === null) {
      this.getCourses();
    }
  }

  toggleLoad = () => this.setState({ loading: !this.state.loading });

  showToast = text => ToastAndroid.show(text, ToastAndroid.SHORT);

  goToCourseSchedules = course => {
    console.log(course.id);
    this.props.navigation.navigate("SpecificCourse", {
      id: course.id,
      from: "PastCourses"
    });
  };

  getCourses = () => {
    this.toggleLoad();
    Profile.getCourses("past")
      .then(r => {
        this.toggleLoad();
        const { status, message, data } = r.data;
        if (status) {
          this.props.setPastCourses(data);
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

  render() {
    const courses = this.props.pastCourses || [];
    return (
      <Container>
        <Loading isVisible={this.state.loading} transparent={false} />
        <Header style={{ backgroundColor: "#f6f6f6" }}>
          <Left style={{ flex: 1 }}>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Icon
                type="MaterialIcons"
                style={{ color: blue }}
                name="chevron-left"
              />
              <Text style={{ color: blue, fontFamily: "AgendaMedium" }}>
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
                fontSize: 13,
                color: "#00246a",
                fontFamily: "AgendaBold"
              }}
            >
              Past Courses
            </Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <Content contentContainerStyle={{ flex: 1 }}>
          <View
            stlye={{
              flex: 1,
              alignItems: "center"
            }}
          >
            {courses.length === 0 ? (
              <Text
                style={{
                  color: blue,
                  fontFamily: "AgendaLight",
                  textAlign: "center",
                  marginTop: 20
                }}
              >
                You have no past courses
              </Text>
            ) : (
              courses.map(c => (
                <Course
                  key={c.id}
                  course={c}
                  goToCourseSchedules={this.goToCourseSchedules}
                />
              ))
            )}
          </View>
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
    fontFamily: "AgendaMedium"
  },
  light: {
    fontFamily: "AgendaLight"
  },
  txt: {
    color: blue,
    fontSize: 14
  }
};

export default ProfileConnect(["pastCourses", "setPastCourses"])(PastCourses);

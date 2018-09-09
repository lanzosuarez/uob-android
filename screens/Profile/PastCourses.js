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
  ScrollView,
  Dimensions
} from "react-native";

import Course from "./Course";

import { ProfileConnect } from "../../context/ProfileProvider";

import Profile from "../../services/Profile";
import Loading from "../Loading";
import { headerBgColor, headerFontColor } from "../../global";

const blue = "#00246a";
const { width } = Dimensions.get("window");

class PastCourses extends Component {
  constructor(props) {
    super(props);
  }

  state = { loading: false, refreshing: false };

  componentDidMount() {
    this.getCourses();
  }

  toggleLoad = () => this.setState({ loading: !this.state.loading });

  showToast = text => ToastAndroid.show(text, ToastAndroid.SHORT);

  toggleRefresh = () => this.setState({ refreshing: !this.state.refreshing });
  onRefresh = () => {
    this.toggleRefresh();
    Profile.getCourses("past")
      .then(r => {
        this.toggleRefresh();
        const { status, message, data } = r.data;
        if (status) {
          this.props.setPastCourses(data);
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
        console.log(data);
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
              Past Courses
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
        >
          <ScrollView
            style={{
              flex: 1,
              paddingTop: 20
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
                You have no upcoming courses
              </Text>
            ) : (
              <View
                style={{
                  paddingRight: width * 0.02,
                  paddingLeft: width * 0.02,
                  flexWrap: "wrap",
                  flexDirection: "row"
                }}
              >
                {courses.map(c => (
                  <Course
                    key={c.id}
                    course={c}
                    goToCourseSchedules={this.goToCourseSchedules}
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

export default ProfileConnect(["pastCourses", "setPastCourses"])(PastCourses);

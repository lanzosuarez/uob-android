import React, { Component } from "react";
import ExpoPixi from "expo-pixi";
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

import { Text, View, ToastAndroid, Dimensions } from "react-native";

import Profile from "../../services/Profile";
import Loading from "../Loading";

const blue = "#00246a";

const { height } = Dimensions.get("window");

class SignAttendance extends Component {
  constructor(props) {
    super(props);
  }

  state = { loading: false, workshop: true };

  componentDidMount() {
    // if (this.props.upcomingCourses === null) {
    //   this.getCourses();
    // }
  }

  toggleLoad = () => this.setState({ loading: !this.state.loading });

  showToast = text => ToastAndroid.show(text, ToastAndroid.SHORT);

  goToCourseSchedules = course => {
    console.log(course.id);
    this.props.navigation.navigate("SpecificCourse", {
      id: course.id,
      from: "UpcomingCourses"
    });
  };

  getCourses = () => {
    this.toggleLoad();
    Profile.getCourses("upcoming")
      .then(r => {
        this.toggleLoad();
        const { status, message, data } = r.data;
        if (status) {
          this.props.setUpcomingCourses(data);
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
    const courses = this.props.upcomingCourses || [];
    const color = 0x000000;
    const width = 10;
    const alpha = 0;
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
              Sign Attendance
            </Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <Content contentContainerStyle={{ flex: 1 }}>
          {this.state.workshop ? (
            <View
              stlye={{
                flex: 1,
                alignItems: "center"
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 30,
                  marginBottom: 30
                }}
              >
                <Text
                  style={{
                    fontFamily: "AgendaLight",
                    fontSize: 15,
                    color: blue
                  }}
                >
                  Sign digitally to confirm your attendance for:
                </Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 30
                }}
              >
                <Text
                  style={{
                    fontFamily: "AgendaBold",
                    fontSize: 15,
                    color: blue,
                    marginBottom: 5,
                    textAlign: "center"
                  }}
                >
                  Microsoft Office - Pivot Table
                </Text>
                <Text
                  style={{
                    fontFamily: "AgendaLight",
                    fontSize: 15,
                    color: blue,
                    textAlign: "center"
                  }}
                >
                  21 Aug 18, 9AM - 6PM
                </Text>
              </View>
              <ExpoPixi.Sketch
                height={height * 0.6}
                strokeColor={color}
                strokeWidth={width}
                strokeAlpha={alpha}
                ref={ref => (this.sketch = ref)}
                onChange={async ({ width, height }) => {
                  this.setState({ signed: true });
                  const options = {
                    format: "png", /// PNG because the view has a clear background
                    quality: 0.1, /// Low quality works because it's just a line
                    result: "file",
                    height,
                    width
                  };
                  /// Using 'Expo.takeSnapShotAsync', and our view 'this.sketch' we can get a uri of the image
                  const uri = await Expo.takeSnapshotAsync(
                    this.sketch,
                    options
                  );
                  console.log(uri);
                }}
              />
              <View
                style={{
                  marginTop: 20,
                  paddingLeft: 20,
                  paddingRight: 20,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Button
                  onPress={() => this.sketch.undo()}
                  style={{
                    width: "48%",
                    backgroundColor: blue,
                    borderRadius: 8,
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 14,
                      fontFamily: "AgendaLight"
                    }}
                  >
                    Clear
                  </Text>
                </Button>
                <Button
                  onPress={() => this.setState({ workshop: false })}
                  style={{
                    width: "48%",
                    backgroundColor: blue,
                    borderRadius: 8,
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 14,
                      fontFamily: "AgendaLight"
                    }}
                  >
                    Submit
                  </Text>
                </Button>
              </View>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 40,
                paddingRight: 40
              }}
            >
              <Text
                style={{
                  fontFamily: "AgendaLight",
                  fontSize: 15,
                  color: blue,
                  textAlign: "center",
                  marginBottom: 10
                }}
              >
                Your currently do not have any active course requiring your
                signature
              </Text>
              <Text
                style={{
                  fontFamily: "AgendaLight",
                  fontSize: 15,
                  color: blue,
                  textAlign: "center"
                }}
              >
                Please revisit this page on the commencement of your next course
              </Text>
            </View>
          )}
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

export default SignAttendance;

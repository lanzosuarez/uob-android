import React, { Component, Fragment } from "react";

import {
  Header,
  Title,
  Body,
  Icon,
  Left,
  Right,
  Container,
  Button,
  Content,
  ListItem,
  Separator
} from "native-base";

import {
  Text,
  View,
  ToastAndroid,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import {
  DrawerActions,
  StackActions,
  NavigationActions
} from "react-navigation";
import { UserConnect } from "../../context/UserProvider";
import { ProfileConnect } from "../../context/ProfileProvider";
import { WorkshopConnect } from "../../context/WorkshopProvider";
import Profile from "../../services/Profile";

const blue = "#00246a";
import Loading from "../Loading";

const FieldName = ({ field, value, last = false }) => {
  const { bold, txt, f, light } = styles;
  return (
    <ListItem last={last}>
      <Left style={{ ...f }}>
        <Text style={{ ...bold, ...txt }}>{field}</Text>
      </Left>
      <Body>
        <Text style={{ ...light, ...txt }}>{value}</Text>
      </Body>
    </ListItem>
  );
};

const CourseFieldName = ({ field, last = false, onPress = () => {} }) => {
  const { bold, iconTxt, f, txt, light } = styles;
  return (
    <ListItem onPress={onPress} last={last}>
      <Left style={{ ...f }}>
        <Text style={{ ...bold, ...txt }}>{field}</Text>
      </Left>
      <Body style={{ ...f }} />
      <Right>
        <Button style={{ height: 15 }} onPress={() => onPress()} transparent>
          <Icon
            type="MaterialIcons"
            name="chevron-right"
            style={{ ...light, ...iconTxt }}
          />
        </Button>
      </Right>
    </ListItem>
  );
};

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = { loading: false };

  componentDidMount() {
    if (this.props.profile === null) {
      this.fireGetProfile();
    }
  }

  openDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  };

  toggleLoad = () => this.setState({ loading: !this.state.loading });

  showToast = text => ToastAndroid.show(text, ToastAndroid.SHORT);

  getProfile = () => Profile.getProfile();

  fireGetProfile = () => {
    this.toggleLoad();
    this.getProfile()
      .then(r => {
        this.toggleLoad();
        const { status, message, data } = r.data;
        if (status) {
          this.props.setProfile(data);
        } else {
          this.showToast(message);
        }
      })
      .catch(err => {
        this.toggleLoad();
        this.showToast(
          "Something went wrong. Try checking your internet connection"
        );
      });
  };

  gotoMain = () => {
    try {
      const resetAction = StackActions.reset({
        index: 0,
        key: null,
        actions: [
          NavigationActions.navigate({
            routeName: "LoginRegister",
            params: { from: "logout" }
          })
        ]
      });
      this.props.navigation.dispatch(resetAction);
    } catch (e) {}
  };

  logOut = async () => {
    console.log(this.props);
    await AsyncStorage.removeItem("user");
    this.props.setBanners(null);
    this.props.setGenres(null);
    this.props.setUser(null);
    // this.props.navigation.navigate("LoginRegister");
    this.gotoMain();
  };

  render() {
    const { bold, light, sep, txt, f } = styles;
    return (
      <Container>
        <Loading isVisible={this.state.loading} transparent={false} />
        <Header style={{ backgroundColor: "#f6f6f6" }}>
          <Left style={{ flex: 1 }}>
            <Button onPress={() => this.openDrawer()} transparent>
              <Icon type="MaterialIcons" style={{ color: blue }} name="menu" />
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
              Profile
            </Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <Content>
          {this.props.profile === null ? null : (
            <View style={{ flex: 1 }}>
              <Separator style={{ backgroundColor: "#f4f4ff" }} bordered>
                <View
                  style={{
                    ...f,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ ...bold, ...sep, color: blue }}>
                    Profile Details
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.push("EditProfile")}
                  >
                    <Text
                      style={{
                        ...light,
                        textDecorationLine: "underline",
                        paddingRight: 10
                      }}
                    >
                      EDIT
                    </Text>
                  </TouchableOpacity>
                </View>
              </Separator>
              <FieldName field="Name" value={this.props.profile.name} />
              <FieldName field="Email" value={this.props.profile.email} />
              <FieldName
                field="Function/segment"
                value={this.props.profile.department}
              />
              <FieldName
                field="Supervisor's name"
                value={this.props.profile.supervisor_name}
              />
              <FieldName
                field="Supervisor's email"
                value={this.props.profile.supervisor_email}
              />
              <ListItem last>
                <Left style={{ ...f }}>
                  <Text style={{ ...bold, ...txt }}>Password</Text>
                </Left>
                <Body>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.push("ChangePassword")}
                  >
                    <Text
                      style={{
                        ...light,
                        ...txt,
                        textDecorationLine: "underline"
                      }}
                    >
                      Change Password
                    </Text>
                  </TouchableOpacity>
                </Body>
              </ListItem>
              <Separator style={{ backgroundColor: "#f4f4ff" }} bordered>
                <Text style={{ ...bold, ...sep, color: blue }}>COURSES</Text>
              </Separator>
              <CourseFieldName
                onPress={() => this.props.navigation.push("UpcomingCourses")}
                field="Upcoming Courses"
              />
              <CourseFieldName
                onPress={() => this.props.navigation.push("PastCourses")}
                field="Past Courses"
              />
              <CourseFieldName
                onPress={() => this.props.navigation.push("SignAttendance")}
                field="Sign attendace"
                last={true}
              />
              {this.props.user && this.props.user.is_supervisor ? (
                <Fragment>
                  <Separator bordered>
                    <Text style={{ ...bold, ...sep, color: blue }}>
                      SUPERVISOR
                    </Text>
                  </Separator>
                  <CourseFieldName
                    onPress={() => this.props.navigation.push("CourseBookings")}
                    field="Team's course bookings"
                    last={true}
                  />
                </Fragment>
              ) : null}
              <Separator
                style={{
                  borderBottomWidth: 0,
                  backgroundColor: "white",
                  height: 70,
                  ...f,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 20
                }}
                bordered
              >
                <Button
                  onPress={() => this.logOut()}
                  style={{
                    borderRadius: 8,
                    backgroundColor: blue,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={{
                      ...light,
                      fontSize: 14,
                      color: "white",
                      textAlign: "center"
                    }}
                  >
                    Log Out
                  </Text>
                </Button>
              </Separator>
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
    fontFamily: "Roboto_medium"
  },
  light: {
    fontFamily: "Roboto_light"
  },
  txt: {
    color: blue,
    fontSize: 12
  },
  sep: {
    fontSize: 14
  },
  iconTxt: {
    color: blue,
    fontSize: 20
  }
};

export default UserConnect(["setUser", "user"])(
  WorkshopConnect(["setBanners", "setGenres"])(
    ProfileConnect(["profile", "setProfile"])(ProfileScreen)
  )
);

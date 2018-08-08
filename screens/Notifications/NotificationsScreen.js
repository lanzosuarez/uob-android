import React, { Component } from "react";

import {
  Header,
  Title,
  Body,
  Icon,
  Left,
  Container,
  Content,
  Button,
  Right,
  List
} from "native-base";

import { Text, View, ToastAndroid, Image } from "react-native";
import { DrawerActions } from "react-navigation";
import ContentRepo from "../../services/ContentRepo";

import NotificationItem from "./NotificationItem";

import Loading from "../Loading";

const blue = "#00246a";

class NotificationsScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = { loading: false, courses: [], title: "Courses" };

  componentDidMount() {
    if (this.props.courses === null) {
      this.getCourses();
    } else {
      this.setState({ courses: this.props.courses });
    }
  }

  showToast = text => ToastAndroid.show(text, ToastAndroid.SHORT);

  toggleLoad = () => this.setState({ loading: !this.state.loading });

  goToCourseSchedules = course => {
    this.props.navigation.navigate("SpecificCourse", {
      id: course.id,
      from: "Courses"
    });
  };

  openDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  };

  search = () => {
    this.props.navigation.navigate("SearchGenre");
  };

  getGenreCourses = genreId => {
    this.toggleLoad();
    ContentRepo.getAllWorkshopsByGenre(genreId)
      .then(r => {
        this.toggleLoad();
        const { status, message, data } = r.data;
        if (status) {
          this.setState({ courses: data.items, title: data.title });
        } else {
          this.showToast(message);
          this.props.navigation.goBack();
        }
      })
      .catch(err => {
        this.toggleLoad();
        this.showToast(
          "Something went wrong. Try checking your internet connection"
        );
      });
  };

  getCourses = () => {
    this.toggleLoad();
    ContentRepo.getAllWorkshops()
      .then(r => {
        this.toggleLoad();
        const { status, message, data } = r.data;
        if (status) {
          this.props.setCourses(data.items);
          this.setState({ courses: data.items, title: data.title });
        } else {
          this.showToast(message);
          this.props.navigation.goBack();
        }
      })
      .catch(err => {
        this.toggleLoad();
        this.showToast(
          "Something went wrong. Try checking your internet connection"
        );
      });
  };

  goToBody = () => {
    this.props.navigation.push("NotifBody");
  };

  render() {
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
                fontFamily: "AgendaBold",
                fontSize: 13,
                color: "#00246a"
              }}
            >
              Notifications
            </Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <Content>
          <View style={{ flex: 1, paddingRight: 10 }}>
            <List>
              <NotificationItem goToBody={this.goToBody} />
              <NotificationItem goToBody={this.goToBody} />
              <NotificationItem goToBody={this.goToBody} />
            </List>
          </View>
        </Content>
      </Container>
    );
  }
}

export default NotificationsScreen;

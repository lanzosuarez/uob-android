import React, { Component } from "react";

import {
  Header,
  Title,
  Body,
  Icon,
  Left,
  Right,
  Container,
  Content,
  Button
} from "native-base";

import {
  Text,
  View,
  ToastAndroid,
  Dimensions,
  BackHandler
} from "react-native";
import { DrawerActions } from "react-navigation";
import ContentRepo from "../../services/ContentRepo";

import Loading from "../Loading";
import CourseItem from "./CourseItem";
import { headerBgColor, headerFontColor } from "../../global";

const blue = "#00246a";
const { width } = Dimensions.get("window");

class GenreCourses extends Component {
  constructor(props) {
    super(props);
  }

  state = { loading: false, courses: [], title: "" };

  componentDidMount() {
    const genreId = this.props.navigation.getParam("id");
    BackHandler.addEventListener("hardwareBackPress", this.handlePress);
    this.getGenreCourses(genreId);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handlePress);
  }

  showToast = text => ToastAndroid.show(text, ToastAndroid.SHORT);

  toggleLoad = () => this.setState({ loading: !this.state.loading });

  goToCourseSchedules = course => {
    this.props.navigation.navigate("SpecificCourse", {
      id: course.id,
      from: "Courses"
    });
  };

  handlePress = () => this.props.navigation.nagivat("Home");

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

  render() {
    return (
      <Container>
        <Loading isVisible={this.state.loading} transparent={false} />
        <Header style={{ backgroundColor: "#00246a" }}>
          <Left style={{ flex: 1 }}>
            <Button onPress={() => this.props.navigation.navigate("Home")} transparent>
              <Icon
                type="MaterialIcons"
                style={{ color: headerFontColor }}
                name="chevron-left"
              />
              <Text
                style={{ color: headerFontColor, fontFamily: "Roboto_medium" }}
              >
                Back
              </Text>
            </Button>
          </Left>
          <Body
            style={{
              flex: 2,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Title
              style={{
                fontFamily: "AgendaBold",
                fontSize: 16,
                color: headerFontColor
              }}
            >
              {this.state.title}
            </Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button onPress={() => this.search()} transparent>
              <Icon
                type="MaterialIcons"
                style={{ color: headerFontColor }}
                name="search"
              />
            </Button>
          </Right>
        </Header>
        <Content>
          <View
            style={{
              paddingLeft: width * 0.04,
              flex: 1,
              paddingTop: 10,
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row"
            }}
          >
            {this.state.courses.length === 0 ? (
              <Text style={{ color: blue, fontFamily: "AgendaBold" }}>
                No Course to show
              </Text>
            ) : (
              this.state.courses.map(course => (
                <CourseItem
                  key={course.id}
                  course={course}
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

export default GenreCourses;

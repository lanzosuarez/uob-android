import React, { Component } from "react";

import {
  Header,
  Body,
  Icon,
  Right,
  Container,
  Content,
  Button,
  Item,
  Input
} from "native-base";

import { Text, View, ToastAndroid, Dimensions } from "react-native";
import { DrawerActions } from "react-navigation";
import { CourseComsumer } from "../../context/CourseProvider";

import Genre from "./Genre";
import { headerBgColor, headerFontColor } from "../../global";

const blue = "#00246a";
const { width } = Dimensions.get("window");

class SearchGenre extends Component {
  constructor(props) {
    super(props);
  }

  state = { searchTitle: "", loading: false };

  showToast = text => ToastAndroid.show(text, ToastAndroid.SHORT);

  changeSearchTitle = searchTitle => this.setState({ searchTitle });

  openDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  };

  toggleLoad = () => this.setState({ loading: !this.state.loading });

  back = () => this.props.navigation.goBack();

  goToWorkshop = course =>
    this.props.navigation.navigate("SpecificCourse", {
      id: course.id,
      from: "SearchGenre"
    });

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: headerBgColor }}>
          <Body
            style={{
              flex: 4,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Item
              style={{
                borderColor: headerFontColor,
                height: 35,
                borderRadius: 8
              }}
              rounded
            >
              <Icon
                style={{ color: headerFontColor }}
                type="MaterialIcons"
                active
                name="search"
              />
              <Input
                onChangeText={e => this.changeSearchTitle(e)}
                style={{ fontFamily: "Roboto_medium", color: headerFontColor }}
              />
            </Item>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button onPress={() => this.back()} transparent>
              <Text
                style={{ color: headerFontColor, fontFamily: "Roboto_medium" }}
              >
                Cancel
              </Text>
            </Button>
          </Right>
        </Header>
        <Content contentContainerStyle={{ backgroundColor: "white" }}>
          <View
            style={{
              flex: 1,
              paddingTop: 20,
              paddingRight: width * 0.02,
              paddingLeft: width * 0.02,
              flexWrap: "wrap",
              flexDirection: "row"
            }}
          >
            <CourseComsumer>
              {({ courses }) => {
                const searechedCourses = courses.filter(
                  course => course.title.indexOf(this.state.searchTitle) > -1
                );
                if (searechedCourses.length > 0) {
                  return searechedCourses.map(course => (
                    <Genre
                      key={course.id}
                      course={course}
                      goToWorkshop={this.goToWorkshop}
                    />
                  ));
                } else {
                  return (
                    <Text
                      style={{
                        color: blue,
                        fontFamily: "Roboto_light",
                        textAlign: "center",
                        marginTop: 20
                      }}
                    >
                      No search result
                    </Text>
                  );
                }
              }}
            </CourseComsumer>
          </View>
          {/* <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            {this.state.courses.length === 0 ? (
              <Text style={{ color: blue }}>No Course to show</Text>
            ) : (
              this.state.courses.map(course => (
                <CourseItem
                  key={course.id}
                  course={course}
                  goToCourseSchedules={this.goToCourseSchedules}
                />
              ))
            )}
          </View> */}
        </Content>
      </Container>
    );
  }
}

export default SearchGenre;

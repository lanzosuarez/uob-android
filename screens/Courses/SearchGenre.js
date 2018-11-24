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

  state = {
    searchTitle: "",
    loading: false,
    showFilter: false,
    min: "",
    max: ""
  };

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

  filterCredit = course => {
    const { credit } = course;
    const { max, min } = this.state;
    if (max && min) {
      return credit <= max && credit >= min;
    } else if (min) {
      return credit >= min;
    } else if (max) {
      return credit <= max;
    } else {
      return true;
    }
  };

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: blue }}>
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
                style={{ fontFamily: "Roboto_light", color: headerFontColor }}
              />
            </Item>
          </Body>
          <Right
            style={{ flex: 1, display: "flex", justifyContent: "space-around" }}
          >
            <Button
              onPress={() =>
                this.setState({ showFilter: !this.state.showFilter })
              }
              transparent
            >
              <Icon
                style={{
                  color: headerFontColor,
                  fontFamily: "Roboto_light",
                  fontSize: 20
                }}
                name="logo-usd"
              />
            </Button>

            <Button onPress={() => this.back()} transparent>
              <Text
                style={{ color: headerFontColor, fontFamily: "Roboto_light" }}
              >
                Cancel
              </Text>
            </Button>
          </Right>
        </Header>
        <Content contentContainerStyle={{ backgroundColor: "white" }}>
          {this.state.showFilter ? (
            <View
              style={{
                paddingTop: 20,
                paddingRight: 20,
                paddingLeft: 20
              }}
            >
              <Item
                style={{
                  borderColor: blue,
                  height: 35,
                  borderRadius: 8,
                  marginBottom: 15
                }}
                rounded
              >
                <Icon
                  style={{ color: headerFontColor }}
                  type="MaterialIcons"
                  active
                />
                <Input
                  ref={ref => (this.minRef = ref)}
                  autoCorrect={false}
                  placeholder="Minimum Credits"
                  value={this.state.min}
                  onChangeText={e =>
                    this.setState({ min: Number(parseInt(e, 10)) })
                  }
                  style={{
                    fontFamily: "Roboto_light",
                    color: blue
                  }}
                />
              </Item>
              <Item
                style={{
                  borderColor: blue,
                  height: 35,
                  borderRadius: 8
                }}
                rounded
              >
                <Icon
                  style={{ color: headerFontColor }}
                  type="MaterialIcons"
                  active
                />
                <Input
                  ref={ref => (this.maxRef = ref)}
                  autoCorrect={false}
                  placeholder="Maximum Credits"
                  value={this.state.max}
                  onChangeText={e =>
                    this.setState({ max: Number(parseInt(e, 10)) })
                  }
                  style={{
                    fontFamily: "Roboto_light",
                    color: blue
                  }}
                />
              </Item>
            </View>
          ) : null}
          <View
            style={{
              paddingLeft: width * 0.04,
              flex: 1,
              paddingTop: 20,
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row"
            }}
          >
            <CourseComsumer>
              {({ courses }) => {
                const searechedCourses = courses.filter(
                  course =>
                    (course.title.match(
                      new RegExp(this.state.searchTitle, "gi")
                    ) ||
                      course.description.match(
                        new RegExp(this.state.searchTitle, "gi")
                      )) &&
                    this.filterCredit(course)
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
        </Content>
      </Container>
    );
  }
}

export default SearchGenre;

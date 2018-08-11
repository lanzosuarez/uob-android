import React, { Component } from "react";
import { Image, Dimensions, Text, View, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

import Carousel from "react-native-snap-carousel";

import { Card, CardItem } from "native-base";

const { width } = Dimensions.get("window");

const blue = "#00246a";

class Course extends Component {
  constructor(props) {
    super(props);
  }

  navigateToSpecifiCourse = id =>
    this.props.navigation.navigate("SpecificCourse", {
      id,
      from: "Home"
    });

  navigateToGenreCourseList = genreId =>
    this.props.navigation.navigate("GenreCourses", {
      id: genreId,
      from: "Home"
    });

  renderItem = ({ item, index }) => (
    <Card
      style={{
        borderColor: "#f0f0f0",
        borderRadius: 8,
        borderBottomWidth: 2,
        shadowOffset: { width: 20, height: 20 },
        shadowColor: "black",
        shadowOpacity: 1.0
      }}
    >
      <CardItem
        button
        onPress={() => this.navigateToSpecifiCourse(item.id)}
        style={{
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8
        }}
        cardBody
      >
        <Image
          source={{ uri: item.image_url, cache: "only-if-cached" }}
          style={{
            flex: 1,
            height: 100,
            width: null,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8
          }}
        />
      </CardItem>
      <CardItem
        style={{
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          paddingLeft: 5,
          paddingTop: 5
        }}
      >
        <Text style={{ color: blue, fontSize: 11, fontFamily: "Roboto_medium" }}>
          {item.title}
        </Text>
      </CardItem>
    </Card>
  );

  render() {
    const { genre } = this.props;
    return (
      <View style={{ height: 160, marginBottom: 15 }}>
        <View
          style={{
            paddingLeft: 15,
            paddingRight: 15,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end"
          }}
        >
          <Text
            style={{ fontSize: 15, color: blue, fontFamily: "Roboto_medium" }}
          >
            {genre.title}
          </Text>
          <TouchableOpacity
            onPress={() => this.navigateToGenreCourseList(genre.id)}
          >
            <Text
              style={{
                color: blue,
                textDecorationLine: "underline",
                fontSize: 11,
                fontWeight: "100",
                fontFamily: "Roboto_medium"
              }}
            >
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, paddingLeft: 15 }}>
          <Carousel
            activeSlideAlignment="start"
            layoutCardOffset={4}
            data={genre.items}
            renderItem={this.renderItem}
            sliderWidth={width}
            itemWidth={200}
          />
        </View>
      </View>
    );
  }
}

export default withNavigation(Course);

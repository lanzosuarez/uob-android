import React from "react";

import { View, TouchableOpacity, Image, Text, Dimensions } from "react-native";
import { withNavigation } from "react-navigation";
import { Card, CardItem } from "native-base";

const { width } = Dimensions.get("window");

const blue = "#00246a";

const Course = ({ course, goToCourseSchedules }) => (
  <Card
    style={{
      borderColor: "#f0f0f0",
      borderRadius: 8,
      borderBottomWidth: 2,
      width: "47%",
      marginLeft: 5,
      marginRight: 5
    }}
  >
    <CardItem
      button
      onPress={() => goToCourseSchedules(course)}
      style={{
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
      }}
      cardBody
    >
      <Image
        source={{ uri: course.image, cache: "only-if-cached" }}
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
        paddingTop: 5,
        flexDirection: "column",
        alignItems: "flex-start"
      }}
    >
      <Text style={{ color: blue, fontSize: 15, fontFamily: "Roboto_medium" }}>
        {course.title}
      </Text>
      <Text style={{ color: blue, fontSize: 13, fontFamily: "Roboto_light" }}>
        {course.credit} credits
      </Text>
    </CardItem>
  </Card>
);

export default withNavigation(Course);

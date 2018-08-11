import React from "react";

import { View, TouchableOpacity, Image, Text, Dimensions } from "react-native";
import { withNavigation } from "react-navigation";

const { width } = Dimensions.get("window");

const Course = ({ course, goToCourseSchedules }) => (
  <View style={{ height: 150, width }}>
    <TouchableOpacity
      onPress={() => goToCourseSchedules(course)}
      style={{ flex: 1, justifyContent: "flex-end" }}
    >
      <Image
        style={{
          flex: 1,
          resizeMode: "cover",
          position: "absolute",
          width: "100%",
          height: "100%"
        }}
        source={{ uri: course.image, cache: "only-if-cached" }}
      />
      <View
        style={{
          flex: 1,
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.3)"
        }}
      />
      <View style={{ marginBottom: 20, marginLeft: 20 }}>
        <Text
          style={{ fontFamily: "Roboto_medium", color: "#F5FCFC", fontSize: 15 }}
        >
          {course.title}
        </Text>
        <Text
          style={{ fontFamily: "Roboto_medium", color: "#F5FCFC", fontSize: 15 }}
        >
          {course.credit} credits
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default withNavigation(Course);

import React from "react";

import { View, TouchableOpacity, Image, Text, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const Genre = ({ course, goToWorkshop }) => (
  <View style={{ height: 200, width }}>
    <TouchableOpacity
      onPress={() => goToWorkshop(course)}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Image
        style={{
          flex: 1,
          resizeMode: "cover",
          position: "absolute",
          width: "100%",
          height: "100%"
        }}
        source={{
          cache: "only-if-cached",
          uri: course.image_url
        }}
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
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex"
        }}
      >
        <Text
          style={{
            fontFamily: "Roboto_medium",
            color: "#F5FCFC",
            fontSize: 15,
            textAlign: "center"
          }}
        >
          {course.title}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default Genre;

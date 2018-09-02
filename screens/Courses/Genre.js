import React from "react";

import { Image, Text, TouchableOpacity, Dimensions } from "react-native";

import { Card, CardItem } from "native-base";
const { width } = Dimensions.get("window");

const blue = "#00246a";

const Genre = ({ course, goToWorkshop }) => (
  <TouchableOpacity onPress={() => goToWorkshop(course)}>
    <Card
      style={{
        borderColor: "#f0f0f0",
        borderRadius: 8,
        borderBottomWidth: 2,
        width: width * 0.45,
        marginLeft: 5,
        marginRight: 5
      }}
    >
      <CardItem
        button
        onPress={() => goToWorkshop(course)}
        style={{
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8
        }}
        cardBody
      >
        <Image
          defaultSource={require("../../assets/defaultimg.png")}
          source={{ uri: course.image_url, cache: "only-if-cached" }}
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
        onPress={() => goToWorkshop(course)}
        style={{
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          paddingLeft: 5,
          paddingTop: 5,
          flexDirection: "column",
          alignItems: "flex-start"
        }}
      >
        <Text
          onPress={() => goToWorkshop(course)}
          style={{ color: blue, fontSize: 15, fontFamily: "Roboto_medium" }}
        >
          {course.title.length > 22
            ? `${course.title.slice(0, 22)}...`
            : course.title}
        </Text>
        <Text
          onPress={() => goToWorkshop(course)}
          style={{ color: blue, fontSize: 13, fontFamily: "Roboto_light" }}
        >
          {course.credit} credits
        </Text>
      </CardItem>
    </Card>
  </TouchableOpacity>
);

export default Genre;

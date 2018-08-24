import React from "react";

import { Image, Text } from "react-native";

import { Card, CardItem } from "native-base";

const blue = "#00246a";

const Genre = ({ course, goToWorkshop }) => (
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

export default Genre;

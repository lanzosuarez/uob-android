import React from "react";

import { Image, Text, TouchableOpacity, Dimensions } from "react-native";

import { Card, CardItem } from "native-base";

const blue = "#00246a";

const { width } = Dimensions.get("window");

const CourseItem = ({ course, goToCourseSchedules }) => {
  return (
    <TouchableOpacity onPress={() => goToCourseSchedules(course)}>
      <Card
        style={{
          height: 220,
          borderRadius: 8,
          borderBottomWidth: 2,
          width: width * 0.45,
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
            defaultSource={require("../../assets/defaultimg.png")}
            source={{
              uri: course.image_url ? course.image_url : "",
              cache: "only-if-cached"
            }}
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
          onPress={() => goToCourseSchedules(course)}
          style={{
            flex: 1,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            paddingLeft: 5,
            paddingTop: 5,
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start"
          }}
        >
          <Text
            onPress={() => goToCourseSchedules(course)}
            style={{ color: blue, fontSize: 15, fontFamily: "Roboto_light" }}
          >
            {course.title}
          </Text>
          <Text
            onPress={() => goToCourseSchedules(course)}
            style={{ color: blue, fontSize: 13, fontFamily: "AgendaBold" }}
          >
            {course.credit} credits
          </Text>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

export default CourseItem;

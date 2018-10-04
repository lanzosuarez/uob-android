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
          flex: 1,
          borderColor: "#f0f0f0",
          borderRadius: 8,
          borderBottomWidth: 2,
          width: width * 0.43,
          marginLeft: width * 0.02,
          marginRight: width * 0.02,
          height: 170
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
          onPress={() => goToCourseSchedules(course)}
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
            onPress={() => goToCourseSchedules(course)}
            style={{ color: blue, fontSize: 15, fontFamily: "Roboto_medium" }}
          >
            {course.title}
             
          </Text>
          <Text
            onPress={() => goToCourseSchedules(course)}
            style={{ color: blue, fontSize: 13, fontFamily: "Roboto_light" }}
          >
            {course.credit} credits
          </Text>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

export default CourseItem;

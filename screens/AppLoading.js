import React, { Component } from "react";
import { View, Image } from "react-native";
import * as Progress from "react-native-progress";

const AppLoading = props => {
  const imgBg = {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%"
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image style={imgBg} source={require("../assets/loading.png")} />
      <Progress.Circle size={30} indeterminate={true} />
    </View>
  );
};

export default AppLoading;

import React, { Component } from "react";
import { View, Text } from "react-native";

const ErrorScreen = props => {
  const { isVisible, transparent = true, tip = "" } = props;

  return (
    <Modal
      backdropColor="white"
      backdropOpacity={0.7}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
      transparent
      isVisible={isVisible}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={{ color: "red", fontFamily: "Roboto_medium" }}>{tip}</Text>
      </View>
    </Modal>
  );
};

export default ErrorScreen;

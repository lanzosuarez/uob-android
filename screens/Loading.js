import React, { Component } from "react";
import { View, Text } from "react-native";
import Modal from "react-native-modal";
import * as Progress from "react-native-progress";

const Loading = props => {
  const { isVisible, transparent = true, tip = "" } = props;

  return (
    <Modal
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropColor="white"
      backdropOpacity={0.7}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
      transparent={transparent}
      isVisible={isVisible}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Progress.Circle size={30} indeterminate={true} />
        <Text style={{ color: "#00246a", fontFamily: "Roboto_medium" }}>
          {tip}
        </Text>
      </View>
    </Modal>
  );
};

export default Loading;

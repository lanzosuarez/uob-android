import React from "react";
import { View, Text } from "react-native";
import Modal from "react-native-modal";
import { Button } from "native-base";
import { Grid, Row } from "react-native-easy-grid";
const blue = "#00246a";

const MessageDialog = props => {
  const {
    heading = "",
    message = "",
    isVisible,
    okText = "Okay",
    onOk = () => {},
    height = 180
  } = props;
  const { linkBtn, modalText } = styles;

  return (
    <Modal
      animationIn="zoomIn"
      animationOut="zoomOut"
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      transparent
      isVisible={isVisible}
    >
      <View
        style={{
          minHeight: height,
          width: "80%",
          flex: 0,
          backgroundColor: "white",
          borderRadius: 20
        }}
      >
        <Grid>
          <Row size={75}>
            <View
              style={{
                flex: 1,
                padding: 20,
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "column"
              }}
            >
              <Text
                style={{
                  ...modalText,
                  fontSize: 20,
                  marginBottom: 10,
                  fontFamily: "Roboto_medium"
                }}
              >
                {heading}
              </Text>
              <Text
                style={{
                  ...modalText,
                  textAlign: "center",
                  fontFamily: "Roboto_light"
                }}
              >
                {message}
              </Text>
            </View>
          </Row>
          <Row style={{ borderColor: blue, borderTopWidth: 0.5 }} size={25}>
            <View
              style={{
                flex: 1
              }}
            >
              <Button style={linkBtn} onPress={() => onOk()} transparent>
                <Text style={{ ...modalText, fontFamily: "AgendaBold" }}>
                  {" "}
                  {okText}
                </Text>
              </Button>
            </View>
          </Row>
        </Grid>
      </View>
    </Modal>
  );
};

const styles = {
  linkBtn: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modalText: {
    color: blue,
    fontWeight: "100",
    textAlign: "center"
  }
};

export default MessageDialog;

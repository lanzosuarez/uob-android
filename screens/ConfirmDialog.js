import React from "react";
import { View, Text } from "react-native";
import Modal from "react-native-modal";
import { Button } from "native-base";
import { Grid, Row, Col } from "react-native-easy-grid";
const blue = "#00246a";

const MessageDialog = props => {
  const {
    heading = "",
    message = "",
    isVisible,
    okText = "Okay",
    cancelText = "Cancel",
    onOk = () => {},
    onCancel = () => {},
    height = 200
  } = props;
  const { linkBtn, modalText } = styles;

  return (
    <Modal
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropColor="rgba(0, 0, 0, 0.5)"
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
                  textAlign: "center",
                  fontFamily: "Roboto_medium"
                }}
              >
                {heading}
              </Text>
              <Text
                style={{
                  ...modalText,
                  fontFamily: "Roboto_light",
                  textAlign: "center"
                }}
              >
                {message}{" "}
              </Text>
            </View>
          </Row>
          <Row style={{ borderColor: blue, borderTopWidth: 0.5 }} size={25}>
            <Grid>
              <Col style={{ borderColor: blue, borderRightWidth: 0.5 }}>
                <View
                  style={{
                    flex: 1
                  }}
                >
                  <Button
                    style={linkBtn}
                    onPress={() => onCancel()}
                    transparent
                  >
                    <Text style={{ ...modalText, fontFamily: "Roboto_light" }}>
                      {" "}
                      {cancelText}
                    </Text>
                  </Button>
                </View>
              </Col>
              <Col>
                <View
                  style={{
                    flex: 1
                  }}
                >
                  <Button style={linkBtn} onPress={() => onOk()} transparent>
                    <Text style={{ ...modalText, fontFamily: "AgendaBold" }}>
                      {okText}{" "}
                    </Text>
                  </Button>
                </View>
              </Col>
            </Grid>
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
    fontWeight: "100"
  }
};

export default MessageDialog;

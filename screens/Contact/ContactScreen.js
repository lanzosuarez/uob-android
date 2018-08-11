import React, { Component } from "react";
import { Text, Image, View, Dimensions, ToastAndroid } from "react-native";

import MessageDialog from "../MessageDialog";

import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Icon,
  Button,
  Item,
  Input,
  Textarea,
  Content
} from "native-base";
import HelpDesk from "../../services/HelpDesk";
import Loading from "../Loading";

const blue = "#00246a";

const { width, height } = Dimensions.get("window");

class Contact extends Component {
  state = {
    showModal: false,
    issue: "",
    contact_number: "",
    loading: false
  };

  checkFields = fields => fields.some(field => this.state[field].length === 0);
  showToast = text => ToastAndroid.show(text, ToastAndroid.SHORT);
  toggleLoad = () => this.setState({ loading: !this.state.loading });
  toggleShowModal = () => this.setState({ showModal: !this.state.showModal });

  sendHelp = () => {
    if (this.checkFields(["issue", "contact_number"]) === false) {
      this.toggleLoad();
      const { issue: content, contact_number: contact_no } = this.state;
      const data = { content, contact_no };
      HelpDesk.sendHelp(data)
        .then(r => {
          this.toggleLoad();
          const { status, message } = r.data;
          if (status) {
            this.toggleShowModal();
            this.setState({ contact_number: "", issue: "" });
          } else {
            this.showToast(message);
          }
        })
        .catch(err => {
          this.toggleLoad();
          this.showToast(
            "Something went wrong. Try checking your internet connection"
          );
        });
    } else {
      this.showToast("All fields are required");
    }
  };

  changeText = (key, val) => this.setState({ [key]: val });

  render() {
    return (
      <Container>
        <Loading tip="Sending inquiry" isVisible={this.state.loading} />
        <Header style={{ backgroundColor: "#f6f6f6" }}>
          <Left style={{ flex: 1 }}>
            <Button
              onPress={() => this.props.navigation.openDrawer()}
              transparent
            >
              <Icon type="MaterialIcons" style={{ color: blue }} name="menu" />
            </Button>
          </Left>
          <Body
            style={{
              flex: 2,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Title
              style={{
                fontSize: 13,
                color: "#00246a",
                fontFamily: "AgendaBold"
              }}
            >
              Contact Us
            </Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <Content style={{ flex: 1 }}>
          <MessageDialog
            height={150}
            onOk={this.toggleShowModal}
            heading="Form Sent"
            message="Your inquiry has been sent successfully. Our representative will get back to you shortly."
            isVisible={this.state.showModal}
          />
          <Image
            style={styles.imgBg}
            source={require("../../assets/adult.png")}
          />
          <View
            style={{
              height: height + 100,
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              alignItems: "center",
              paddingTop: 70,
              paddingBottom: 60
            }}
          >
            <View
              style={{
                height: 445,
                width: width * 0.8,
                backgroundColor: "#f3f2f1",
                borderRadius: 6,
                padding: 40
              }}
            >
              <Text
                style={{
                  fontFamily: "AgendaBold",
                  fontSize: 18,
                  fontWeight: "600",
                  color: blue,
                  marginBottom: 15
                }}
              >
                Need Help?
              </Text>
              <Text
                style={{
                  marginBottom: 15
                }}
              >
                <Text
                  style={{
                    fontFamily: "Roboto_medium",
                    textDecorationLine: "underline",
                    fontWeight: "100",
                    color: "#00246a",
                    fontSize: 14
                  }}
                >
                  View our FAQ's{" "}
                </Text>
                <Text
                  style={{
                    fontFamily: "Roboto_light",
                    fontWeight: "100",
                    color: "#00246a",
                    fontSize: 14
                  }}
                >
                  or send us a message and we will get back to you as soon as
                  possible
                </Text>
              </Text>
              <View style={{ marginBottom: 15 }}>
                <Text
                  style={{
                    fontFamily: "Roboto_medium",
                    color: blue,
                    fontSize: 10,
                    marginBottom: 5,
                    marginLeft: 5
                  }}
                >
                  Contact Number
                </Text>
                <Item
                  style={{
                    borderRadius: 7,
                    borderWidth: 0,
                    borderColor: "transparent"
                  }}
                  rounded
                >
                  <Input
                    value={this.state.contact_number}
                    onChangeText={e => this.changeText("contact_number", e)}
                    style={styles.forgotInput}
                  />
                </Item>
              </View>
              <View style={{ marginBottom: 15 }}>
                <Text
                  style={{
                    fontFamily: "Roboto_medium",
                    color: blue,
                    fontSize: 10,
                    marginBottom: 5,
                    marginLeft: 5
                  }}
                >
                  Summary of issue
                </Text>
                <Textarea
                  value={this.state.issue}
                  onChangeText={e => this.changeText("issue", e)}
                  rowSpan={5}
                  bordered
                  style={styles.tArea}
                />
              </View>
              <Button
                onPress={() => this.sendHelp()}
                style={{
                  borderRadius: 8,
                  flex: 1,
                  backgroundColor: blue,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 12,
                    fontFamily: "AgendaBold"
                  }}
                >
                  Submit
                </Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = {
  imgBg: {
    resizeMode: "stretch",
    position: "absolute"
  },
  forgotInput: {
    height: 35,
    fontSize: 12,
    color: blue,
    backgroundColor: "#e0dcdb",
    paddingLeft: 20,
    borderRadius: 7,
    borderWidth: 0,
    borderColor: "transparent",
    fontFamily: "Roboto_medium"
  },
  tArea: {
    paddingTop: 20,
    fontSize: 12,
    color: blue,
    backgroundColor: "#e0dcdb",
    paddingLeft: 20,
    borderRadius: 7,
    borderWidth: 0,
    borderColor: "transparent",
    fontFamily: "Roboto_medium"
  }
};

export default Contact;

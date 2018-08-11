import React, { Component } from "react";

import {
  Header,
  Title,
  Body,
  Icon,
  Left,
  Right,
  Container,
  Button,
  Content,
  Form,
  Item,
  Label,
  Input,
  List
} from "native-base";

import { Text, View, ToastAndroid, Dimensions } from "react-native";

import { DrawerActions } from "react-navigation";
import Profile from "../../services/Profile";
import Loading from "../Loading";

const blue = "#00246a";
const { height } = Dimensions.get("window");

const FieldName = ({ field, value, last = false }) => {
  const { bold, txt, f, light } = styles;
  return (
    <ListItem last={last}>
      <Left style={{ ...f }}>
        <Text style={{ ...bold, ...txt }}>{field}</Text>
      </Left>
      <Body>
        <Text style={{ ...light, ...txt }}>{value}</Text>
      </Body>
    </ListItem>
  );
};

class ChangePassword extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    loading: false,
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  };

  checkFields = fields => fields.some(field => this.state[field].length === 0);

  openDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  };

  toggleLoad = () => this.setState({ loading: !this.state.loading });

  onChangeText = (key, val) => this.setState({ [key]: val });

  changePassword = () => {
    const fieldCheck = this.checkFields([
      "currentPassword",
      "newPassword",
      "confirmPassword"
    ]);
    const passwordCheck = this.state.newPassword === this.state.confirmPassword;
    if (fieldCheck) {
      this.showToast("All fields are required");
    } else if (passwordCheck === false) {
      this.showToast("New password and Confirm password should be the same");
    } else {
      this.toggleLoad();
      const {
        currentPassword: old_password,
        newPassword: new_password
      } = this.state;
      Profile.changePassword({ old_password, new_password })
        .then(r => {
          this.toggleLoad();
          const { status, message, data } = r.data;
          if (status) {
            this.props.navigation.goBack();
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
    }
  };

  showToast = text => ToastAndroid.show(text, ToastAndroid.SHORT);

  render() {
    const { bold, txt, f, light } = styles;
    return (
      <Container>
        <Loading isVisible={this.state.loading} transparent={false} />
        <Header style={{ backgroundColor: "white" }}>
          <Left style={{ flex: 1 }}>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Icon
                type="MaterialIcons"
                style={{ color: blue }}
                name="chevron-left"
              />
              <Text style={{ color: blue, fontFamily: "Roboto_medium" }}>
                Back
              </Text>
            </Button>
          </Left>
          <Body
            style={{
              flex: 1,
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
              Change Password
            </Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <Content
          contentContainerStyle={{ flex: 1, backgroundColor: "#f4f4ff" }}
        >
          <View
            stlye={{
              flex: 1,
              backgroundColor: "#f4f4ff",
              alignItems: "center"
            }}
          >
            <Form style={{ backgroundColor: "white", marginTop: 40 }}>
              <Item inlineLabel>
                <Label style={{ ...bold, ...txt }}>Current password</Label>
                <Input
                  value={this.state.currentPassword}
                  onChangeText={e => this.onChangeText("currentPassword", e)}
                  style={{ ...light, ...txt }}
                  secureTextEntry
                />
              </Item>
              <Item inlineLabel>
                <Label style={{ ...bold, ...txt }}>New password</Label>
                <Input
                  value={this.state.newPassword}
                  onChangeText={e => this.onChangeText("newPassword", e)}
                  style={{ ...light, ...txt }}
                  secureTextEntry
                />
              </Item>
              <Item inlineLabel last>
                <Label style={{ ...bold, ...txt }}>Confirm password</Label>
                <Input
                  value={this.state.confirmPassword}
                  onChangeText={e => this.onChangeText("confirmPassword", e)}
                  style={{ ...light, ...txt }}
                  secureTextEntry
                />
              </Item>
            </Form>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                marginTop: 20,
                justifyContent: "center"
              }}
            >
              <Button
                onPress={() => this.changePassword()}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 8,
                  backgroundColor: blue,
                  width: "90%"
                }}
              >
                <Text
                  style={{
                    ...light,
                    fontSize: 14,
                    color: "white",
                    textAlign: "center"
                  }}
                >
                  Change Password
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
  f: {
    flex: 1
  },
  bold: {
    fontFamily: "AgendaBold"
  },
  medium: {
    fontFamily: "Roboto_medium"
  },
  light: {
    fontFamily: "Roboto_light"
  },
  txt: {
    color: blue,
    fontSize: 14
  }
};

export default ChangePassword;

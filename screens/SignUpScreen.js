import React, { Component } from "react";
import { View, ToastAndroid, AsyncStorage } from "react-native";
import {
  Item,
  Input,
  Icon,
  Button,
  Text,
  Form,
  Container,
  Content
} from "native-base";
import Loading from "./Loading";

import AuthService from "../services/Auth";
import UserResource from "../services/UserResource";
import { UserConnect } from "../context/UserProvider";

const transparentBg = "rgba(255, 255, 255, 0.8)";
const blue = "#00246a";

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    loading: false,
    isModalVisible: false,
    modalMessage: "",
    email: "",
    activation_code: "",
    password: "",
    password_confirmation: "",
    verifyAccount: false
  };

  async componentWillMount() {
    const email = await AsyncStorage.getItem("unregistered_email");
    if (email) {
      this.setState({ email, verifyAccount: true });
      // this.setState({ email: "", verifyAccount: true });
    }
  }

  checkFields = fields => fields.some(field => this.state[field].length === 0);

  toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  toggleSignUpVerify = () =>
    this.setState({ verifyAccount: !this.state.verifyAccount });

  toggleLoad = () => this.setState({ loading: !this.state.loading });

  setTextValue = (key, val) => this.setState({ [key]: val });

  showToast = text => ToastAndroid.show(text, ToastAndroid.SHORT);

  signUp = () => {
    //sign upp code
    if (
      this.checkFields(["email", "password", "password_confirmation"]) === false
    ) {
      const { email, password, password_confirmation } = this.state;
      this.toggleLoad();
      AuthService.createAccount({ email, password, password_confirmation })
        .then(async r => {
          const { status, message } = r.data;
          this.toggleLoad();
          console.log("status", status);
          if (status === false) {
            console.log("message", message);
            this.showToast(message);
          } else {
            AsyncStorage.setItem("unregistered_email", email).then(() => {
              this.showToast(message);
              this.toggleSignUpVerify();
            });
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

  activate = () => {
    //sign upp code
    if (this.checkFields(["activation_code"]) === false) {
      const { email, activation_code } = this.state;
      this.toggleLoad();
      AuthService.activateAccount({ email, activation_code })
        .then(r => {
          const { status, message, data } = r.data;
          this.toggleLoad();
          if (status === false) {
            this.showToast(message);
          } else {
            UserResource.setUser(data).then(d => {
              AsyncStorage.removeItem("unregistered_email");
              this.props.removePending();
              this.props.setUser(data);
              this.props.gotoMain();
            });
          }
        })
        .catch(err => {
          this.toggleLoad();
          this.showToast(
            "Something went wrong. Try checking your internet connection"
          );
        });
    } else {
      this.showToast("Activation code is required");
    }
  };

  resendPin = () => {
    const { email } = this.state;
    this.toggleLoad();
    AuthService.resendPin({ email })
      .then(r => {
        const { status, message } = r.data;
        this.toggleLoad();
        if (status === false) {
          this.showToast(message);
        } else {
          this.showToast(message);
          // this.toggleSignUpVerify();
        }
      })
      .catch(err => {
        this.toggleLoad();
        this.showToast(
          "Something went wrong. Try checking your internet connection"
        );
      });
  };

  render() {
    const {
      mainCon,
      form,
      loginBtn,
      input,
      iconFont,
      item,
      verifyInput,
      verifyItem,
      linkBtn
    } = styles;
    const { verifyAccount } = this.state;
    const authText =
      "I understand and agree that my personal data may be shared to third party partners for course registration purposes";

    return (
      <Container style={mainCon}>
        <Loading isVisible={this.state.loading} />
        <Content>
          {verifyAccount === false ? (
            <Form style={{ flex: 1 }}>
              {/* form */}
              <View style={form}>
                <Item style={item}>
                  <Icon
                    style={iconFont}
                    type="MaterialIcons"
                    active
                    name="email"
                  />
                  <Input
                    onChangeText={e => this.setTextValue("email", e)}
                    placeholderTextColor={blue}
                    style={input}
                    placeholder="Email"
                  />
                </Item>
                <Item style={item}>
                  <Icon
                    style={iconFont}
                    type="MaterialIcons"
                    active
                    name="lock"
                  />
                  <Input
                    onChangeText={e => this.setTextValue("password", e)}
                    secureTextEntry
                    placeholderTextColor={blue}
                    style={input}
                    placeholder="Password"
                  />
                </Item>
                <Item style={{ ...item, marginBottom: 0 }}>
                  <Icon
                    style={iconFont}
                    type="MaterialIcons"
                    active
                    name="lock"
                  />
                  <Input
                    secureTextEntry
                    onChangeText={e =>
                      this.setTextValue("password_confirmation", e)
                    }
                    placeholderTextColor={blue}
                    style={input}
                    placeholder="Confirm Password"
                  />
                </Item>
              </View>
              {/* end form  */}
              <View style={{ height: 100 }}>
                <View style={{ width: "100%" }}>
                  <Button onPress={() => this.signUp()} style={loginBtn}>
                    <Text
                      uppercase={false}
                      style={{ color: "white", fontSize: 12 }}
                    >
                      Create an account
                    </Text>
                  </Button>
                  <View
                    style={{
                      marginTop: 5,
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text style={{ color: "white", fontSize: 11 }}>
                        By signing up, I agree to UOB's{" "}
                      </Text>
                      <Text
                        style={{
                          color: "red",
                          fontSize: 11,
                          textDecorationLine: "underline"
                        }}
                      >
                        Terms of Service
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </Form>
          ) : (
            <Form style={{ flex: 1 }}>
              <View style={{ marginBottom: 10 }}>
                <View style={{ width: "100%" }}>
                  <Item style={verifyItem} rounded>
                    <Input
                      onChangeText={e =>
                        this.setTextValue("activation_code", e)
                      }
                      style={verifyInput}
                      placeholder="Enter activation code"
                    />
                  </Item>
                </View>
              </View>
              <View style={{ height: 50 }}>
                <View
                  style={{
                    marginTop: 15,
                    marginBottom: 20,
                    width: "100%",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <Button
                    onPress={() => this.resendPin()}
                    style={linkBtn}
                    transparent
                  >
                    <Text
                      uppercase={false}
                      style={{
                        color: "white",
                        fontSize: 12,
                        textDecorationLine: "underline",
                        textAlign: "center",
                        fontFamily: "Roboto_medium"
                      }}
                    >
                      Resend activation code
                    </Text>
                  </Button>
                </View>
              </View>
              <View style={{ height: 100 }}>
                <View style={{ width: "100%" }}>
                  <Button onPress={() => this.activate()} style={loginBtn}>
                    <Text
                      uppercase={false}
                      style={{ color: "white", fontSize: 12 }}
                    >
                      Sign up
                    </Text>
                  </Button>
                  <View
                    style={{
                      marginTop: 5,
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text style={{ color: "white", fontSize: 11 }}>
                        By signing up, I agree to UOB's{" "}
                      </Text>
                      <Text
                        style={{
                          color: "red",
                          fontSize: 11,
                          textDecorationLine: "underline"
                        }}
                      >
                        Terms of Service
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </Form>
          )}
        </Content>
      </Container>
    );
  }
}

const styles = {
  mainCon: {
    flex: 1,
    paddingTop: 30,
    paddingRight: 15,
    paddingLeft: 15,
    backgroundColor: "rgba(255, 255, 255, 0)"
  },
  form: {
    height: 170,
    paddingTop: 17,
    paddingLeft: 25,
    paddingRight: 25,
    borderColor: transparentBg,
    backgroundColor: transparentBg,
    borderRadius: 7,
    marginBottom: 30
  },
  loginBtn: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#00246a",
    width: "100%",
    borderRadius: 5
  },
  item: {
    backgroundColor: "transparent",
    borderColor: blue,
    marginBottom: 5
  },
  verifyItem: {
    backgroundColor: "transparent"
  },
  iconFont: {
    color: "#143473",
    fontSize: 12
  },
  input: {
    fontSize: 12,
    color: blue,
    height: 35,
    fontFamily: "Roboto_medium"
  },
  verifyItem: {
    borderRadius: 7,
    borderWidth: 0,
    borderColor: "transparent"
  },
  verifyInput: {
    fontSize: 12,
    color: blue,
    backgroundColor: transparentBg,
    borderRadius: 7,
    borderWidth: 0,
    borderColor: "transparent",
    paddingLeft: 20,
    fontFamily: "Roboto_medium"
  },
  linkBtn: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center"
  }
};

export default UserConnect(["setUser"])(SignUpScreen);

// SplashScreen.hide();
// const images = [require("./assets/signin.png")];

// await Expo.Font.loadAsync({
//   Roboto: require("./assets/Fonts/AgendaLight.ttf"),
//   Roboto_medium: require("./assets/Fonts/AgendaMedium.ttf"),
//   AgendaBold: require("./assets/Fonts/AgendaBold.ttf")
// });

// const cacheImages = images.map(image => {
//   return Asset.fromModule(image).downloadAsync();
// });

// await Promise.all(cacheImages);
// this.setState({ isAppReady: true });

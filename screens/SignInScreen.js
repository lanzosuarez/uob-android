import React, { Component } from "react";
import { View, ToastAndroid, AsyncStorage, Linking } from "react-native";

import {
  Item,
  Input,
  Icon,
  Button,
  Text,
  Container,
  Content,
  Form
} from "native-base";

import MessageDialog from "./MessageDialog";

import AuthService from "../services/Auth";
import UserResource from "../services/UserResource";
import { UserConnect } from "../context/UserProvider";

import Loading from "./Loading";

const transparentBg = "rgba(255, 255, 255, 0.8)";
const blue = "#00246a";

class SignInScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    forgotMode: false,
    email: "",
    password: "",
    loading: false,
    forgotEmail: "",
    verifyAccount: false,
    showMessage: false,
    activation_code: ""
  };

  gotoTerms = async () => {
    const link = `https://www.uobsummit.com/terms`;
    Linking.openURL(link)
      .then(d => {
        this.showToast("Opening browser");
      })
      .catch(err => {
        this.showToast("Failed to open browser");
      });
  };

  gotoFqa = async () => {
    const link = "mailto:contact@uobsummit.com";
    Linking.openURL(link)
      .then(d => {
        this.showToast("Opening email app");
      })
      .catch(err => {
        this.showToast("Failed to email app");
      });
  };

  checkFields = fields => fields.some(field => this.state[field].length === 0);

  toggleVerify = () =>
    this.setState({ verifyAccount: !this.state.verifyAccount });

  toggleForgot = () => this.setState({ forgotMode: !this.state.forgotMode });

  toggleLoad = () => this.setState({ loading: !this.state.loading });

  toggleShowMessage = () =>
    this.setState({ showMessage: !this.state.showMessage });

  showToast = text => ToastAndroid.show(text, ToastAndroid.SHORT);

  setTextValue = (key, val) => this.setState({ [key]: val });

  signIn = () => {
    //sign in code
    if (this.checkFields(["email", "password"]) === false) {
      const { email, password } = this.state;
      this.toggleLoad();
      AuthService.signIn({
        email,
        password
      })
        .then(r => {
          this.toggleLoad();
          const { status, message, data } = r.data;
          if (status === false) {
            this.showToast(message);
          } else {
            if (data.is_activated === false) {
              this.toggleVerify();
            } else {
              UserResource.setUser(data).then(d => {
                this.props.setUser(data);
                this.props.gotoMain();
              });
            }
          }
        })
        .catch(err => {
          if (err.response) {
            this.toggleLoad();
            this.showToast(
              "Something went wrong. Try checking your internet connection"
            );
          }
        });
    } else {
      this.showToast("All fields are required");
    }
  };

  forgotPassword = () => {
    //sign in code
    // this.toggleShowMessage();
    if (this.checkFields(["forgotEmail"]) === false) {
      const { forgotEmail: email } = this.state;
      this.toggleLoad();
      AuthService.forgotPassword({ email })
        .then(r => {
          const { status, message } = r.data;
          this.toggleLoad();
          if (status === false) {
            this.showToast(message);
          } else {
            this.toggleForgot();
            this.toggleShowMessage();
          }
        })
        .catch(err => {
          if (err.response) {
            this.toggleLoad();
            this.showToast(
              "Something went wrong. Try checking your internet connection"
            );
          }
        });
    } else {
      this.showToast("Email is required");
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
            if (data.is_supervisor) {
              setUserType("supervisor");
            }
            UserResource.setUser(data).then(d => {
              // AsyncStorage.removeItem("unregistered_email");
              // this.props.removePending();
              this.props.setUser(data);
              this.props.gotoMain();
            });
          }
        })
        .catch(err => {
          if (err.response) {
            this.toggleLoad();
            this.showToast(
              "Something went wrong. Try checking your internet connection"
            );
          }
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
        if (err.response) {
          this.toggleLoad();
          this.showToast(
            "Something went wrong. Try checking your internet connection"
          );
        }
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
      linkBtn,
      forgotInput,
      forgotItem
    } = styles;

    const forgotText =
      "We have sent a reset password email to your email. Please click on the reset password link to set your new password";

    return (
      <Container style={mainCon}>
        <MessageDialog
          heading={"Reset your password"}
          message={forgotText}
          okText="Okay"
          onOk={this.toggleShowMessage}
          isVisible={this.state.showMessage}
          height={160}
        />
        <Loading isVisible={this.state.loading} />
        <Content>
          {this.state.forgotMode === false ? (
            this.state.verifyAccount ? (
              <Form style={{ flex: 1 }}>
                <View style={{ marginBottom: 10 }}>
                  <View style={{ width: "100%" }}>
                    <Item style={forgotItem} rounded>
                      <Input
                        onChangeText={e =>
                          this.setTextValue("activation_code", e)
                        }
                        style={forgotInput}
                        placeholder="Enter activation code"
                      />
                    </Item>
                  </View>
                </View>
                <View
                  style={{
                    height: 50
                  }}
                >
                  <View
                    style={{
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
                          fontSize: 15,
                          textDecorationLine: "underline",
                          textAlign: "center",
                          fontFamily: "Roboto_light"
                        }}
                      >
                        Resend activation code
                      </Text>
                    </Button>
                  </View>
                </View>
                <View style={{ height: 60 }}>
                  <View
                    style={{
                      marginTop: 5,
                      marginBottom: 20,
                      width: "100%",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <Button
                      onPress={() => this.toggleVerify()}
                      style={linkBtn}
                      transparent
                    >
                      <Text
                        uppercase={false}
                        style={{
                          color: "white",
                          fontSize: 15,
                          textDecorationLine: "underline",
                          textAlign: "center",
                          fontFamily: "Roboto_light"
                        }}
                      >
                        Back to sign in
                      </Text>
                    </Button>
                  </View>
                </View>
                <View style={{ height: 100 }}>
                  <View style={{ width: "100%" }}>
                    <Button onPress={() => this.activate()} style={loginBtn}>
                      <Text
                        uppercase={false}
                        style={{
                          color: "white",
                          fontSize: 15,
                          fontFamily: "Roboto_light"
                        }}
                      >
                        Verify and Sign in
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
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row"
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 13,
                            fontFamily: "Roboto_light"
                          }}
                        >
                          By signing in, I agree to UOB's{" "}
                        </Text>
                        <Text
                          onPress={() => this.gotoTerms()}
                          style={{
                            color: "red",
                            fontSize: 13,
                            textDecorationLine: "underline",
                            fontFamily: "Roboto_light"
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
              <Form
                style={{
                  flex: 1
                }}
              >
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
                </View>
                <View
                  style={{
                    height: 70
                  }}
                >
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
                      onPress={() => this.toggleForgot()}
                      style={linkBtn}
                      transparent
                    >
                      <Text
                        uppercase={false}
                        style={{
                          color: "white",
                          fontSize: 15,
                          textDecorationLine: "underline",
                          textAlign: "center",
                          fontFamily: "Roboto_light"
                        }}
                      >
                        Forgot your password
                      </Text>
                    </Button>
                  </View>
                </View>
                <View
                  style={{
                    height: 70,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}
                  transparent
                >
                  <Text
                    onPress={this.gotoFqa}
                    uppercase={false}
                    style={{
                      color: "white",
                      fontSize: 13,
                      textAlign: "center",
                      fontFamily: "Roboto_light"
                    }}
                  >
                    If you do not posses a '@uobgroup.com' email,
                  </Text>
                  <Text
                    onPress={this.gotoFqa}
                    style={{
                      color: "white",
                      fontSize: 13,
                      textAlign: "center",
                      fontFamily: "Roboto_light"
                    }}
                  >
                    do update your account details by sending us an email at{" "}
                    <Text
                      onPress={this.gotoFqa}
                      style={{
                        textDecorationLine: "underline",
                        color: "white",
                        fontSize: 13,
                        textAlign: "center",
                        fontFamily: "Roboto_light"
                      }}
                    >
                      contact@uobsummit.com
                    </Text>
                  </Text>
                </View>

                <View
                  style={{
                    height: 80
                  }}
                >
                  <View
                    style={{
                      width: "100%"
                    }}
                  >
                    <Button onPress={() => this.signIn()} style={loginBtn}>
                      <Text
                        uppercase={false}
                        style={{
                          color: "white",
                          fontSize: 15,

                          fontFamily: "Roboto_light"
                        }}
                      >
                        Sign in
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
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row"
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 13,
                            fontFamily: "Roboto_light"
                          }}
                        >
                          By signing in , I agree to UOB 's{" "}
                        </Text>
                        <Text
                          onPress={() => this.gotoTerms()}
                          style={{
                            color: "red",
                            fontSize: 13,
                            textDecorationLine: "underline",
                            fontFamily: "Roboto_light"
                          }}
                        >
                          Terms of Service
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Form>
            )
          ) : (
            <Form style={{ flex: 1 }}>
              <View style={{ marginBottom: 20 }}>
                <View
                  style={{
                    width: "100%",
                    paddingLeft: 20,
                    paddingRight: 20
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      fontFamily: "Roboto_light"
                    }}
                  >
                    Forgot your password?
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 15,
                      fontFamily: "Roboto_light"
                    }}
                  >
                    Enter your registered email and we will send you a link to
                    reset it
                  </Text>
                </View>
              </View>
              <View style={{ height: 30, marginBottom: 20 }}>
                <View style={{ width: "100%" }}>
                  <Item style={forgotItem} rounded>
                    <Input
                      onChangeText={e => this.setTextValue("forgotEmail", e)}
                      style={forgotInput}
                      placeholder="Enter email"
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
                    onPress={() => this.toggleForgot()}
                    style={linkBtn}
                    transparent
                  >
                    <Text
                      uppercase={false}
                      style={{
                        color: "white",
                        fontSize: 15,
                        textDecorationLine: "underline",
                        textAlign: "center",
                        fontFamily: "Roboto_medium"
                      }}
                    >
                      Back to sign in
                    </Text>
                  </Button>
                </View>
              </View>
              <View>
                <View style={{ width: "100%" }}>
                  <Button
                    onPress={() => this.forgotPassword()}
                    style={loginBtn}
                  >
                    <Text
                      uppercase={false}
                      style={{
                        color: "white",
                        fontFamily: "Roboto_medium",
                        fontSize: 15
                      }}
                    >
                      Reset password
                    </Text>
                  </Button>
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
    height: 130,
    paddingTop: 17,
    paddingLeft: 25,
    paddingRight: 25,
    borderColor: transparentBg,
    backgroundColor: transparentBg,
    borderRadius: 7
  },
  loginBtn: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: blue,
    width: "100%",
    borderRadius: 5
  },
  item: {
    backgroundColor: "transparent",
    borderColor: blue,
    marginBottom: 5
  },
  iconFont: {
    color: "#143473",
    fontSize: 15
  },
  input: {
    fontSize: 15,
    color: blue,
    height: 35,
    fontFamily: "Roboto_medium"
  },
  forgotItem: {
    borderRadius: 7,
    borderWidth: 0,
    borderColor: "transparent"
  },
  forgotInput: {
    fontSize: 15,
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

export default UserConnect(["setUser"])(SignInScreen);

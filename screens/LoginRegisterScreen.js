import React, { Component } from "react";
import {
  Image,
  View,
  Text,
  ToastAndroid,
  Dimensions,
  Alert,
  AsyncStorage
} from "react-native";
import { Button, Container, Content } from "native-base";
import { Row, Grid, Col } from "react-native-easy-grid";

import UserResource from "../services/UserResource";

import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import Loading from "./Loading";

import { StackActions, NavigationActions } from "react-navigation";
import { UserConnect } from "../context/UserProvider";
import { setUserType } from "../global";
import { Updates } from "expo";

const { height } = Dimensions.get("window");

class LoginRegister extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null
  };

  state = {
    active: 1,
    loading: true,
    pendingAccount: false
  };

  async componentDidMount() {
    try {
      // this.checkUpdates();
      const user = await UserResource.getUser();
      console.log("user", user);
      if (user) {
        this.gotoMain();
        this.props.setUser(user);
        this.toggleLoad();
      } else {
        this.toggleLoad();
      }
    } catch (e) {
      // this.showToast(
      //   "Something went wrong. Try checking your internet connection"
      // );
      this.toggleLoad();
    }
  }

  showToast = text => ToastAndroid.show(text, ToastAndroid.SHORT);

  renderTabStyle = tabId =>
    this.state.active === tabId ? styles.activeTab : styles.inActiveTab;

  toggleLoad = () => this.setState({ loading: !this.state.loading });

  toggleTabs = tabId => {
    if (this.state.pendingAccount && tabId === 1) {
    } else {
      this.setState({ active: tabId });
    }
  };

  removePending = () => this.setState({ pendingAccount: false });

  checkUpdates = async () => {
    try {
      console.log("checking for updates");
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        this.showUpdateDialog();
      }
    } catch (e) {
      // handle or log error
    }
  };

  showUpdateDialog = () => {
    Alert.alert(
      "A new version of this app is available.",
      "Click 'Download now' to start the download",
      [
        { text: "Not now" },
        {
          text: "Download now",
          onPress: async () => {
            try {
              this.showToast(
                "Download started. The app will notify you once its done"
              );
              await Updates.fetchUpdateAsync();
              this.showReloadDialog();
            } catch (error) {
              this.showToast(
                "Download failed. Please check you internet connection"
              );
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  showReloadDialog = () => {
    Alert.alert(
      "New version is available",
      "Restart is required for the changes to reflect",
      [
        { text: "Later" },
        {
          text: "Restart now",
          onPress: () => {
            Updates.reloadFromCache();
          }
        }
      ],
      { cancelable: false }
    );
  };

  gotoMain = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Main" })]
    });
    this.props.navigation.dispatch(resetAction);
    // this.props.navigation.navigate("Main");
  };

  render() {
    const { tabButton, imgBg, logo, tabs, tab, tabText } = styles;

    return (
      <Container style={{ flex: 1 }}>
        <Image style={imgBg} source={require("../assets/signin.jpg")} />
        {this.state.loading ? (
          <Loading isVisible={this.state.loading} />
        ) : (
          <Content>
            <View
              style={{
                height: height * 0.35,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image style={logo} source={require("../assets/logo.png")} />
            </View>
            <View style={{ height: 60 }}>
              <Grid>
                <Row size={15}>
                  <Col>
                    <View style={{ ...tab, ...this.renderTabStyle(0) }}>
                      <Button
                        onPress={() => this.toggleTabs(0)}
                        style={tabButton}
                        transparent
                      >
                        <Text style={tabText}>Sign up</Text>
                      </Button>
                    </View>
                  </Col>
                  <Col>
                    <View style={{ ...tab, ...this.renderTabStyle(1) }}>
                      <Button
                        onPress={() => this.toggleTabs(1)}
                        style={tabButton}
                        transparent
                      >
                        <Text style={tabText}>Sign in</Text>
                      </Button>
                    </View>
                  </Col>
                </Row>
              </Grid>
            </View>
            <View style={{ flex: 1 }}>
              {this.state.active ? (
                <SignInScreen
                  toggleTabs={this.toggleTabs}
                  gotoMain={this.gotoMain}
                />
              ) : (
                <SignUpScreen
                  toggleTabs={this.toggleTabs}
                  gotoMain={this.gotoMain}
                  scrollToInput={this.scrollToView}
                />
              )}
            </View>
          </Content>
        )}
      </Container>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  imgBg: {
    flex: 1,
    resizeMode: "stretch",
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  logoCon: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    display: "flex"
  },
  logo: {
    resizeMode: "center"
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(255, 255, 255, 0.7)",
    borderBottomWidth: 5,
    display: "flex"
  },
  tabText: {
    color: "white",
    textAlign: "center",
    fontFamily: "Roboto_light",
    fontSize: 17
  },
  activeTab: {
    borderBottomWidth: 8
  },
  inActiveTab: {
    borderBottomWidth: 2
  },
  tabButton: {
    paddingTop: 20,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center"
  }
};

export default UserConnect(["setUser"])(LoginRegister);

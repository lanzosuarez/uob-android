import React from "react";
import { StyleSheet, Platform, View, Image } from "react-native";

import LoginRegisterScreen from "./screens/LoginRegisterScreen";
import MainDrawerNavigator from "./screens/MainScreen";
// import AppLoading from "./screens/AppLoading";

import { createStackNavigator } from "react-navigation";

import { WorkshopProvider } from "./context/WorkshopProvider";
import { UserProvider } from "./context/UserProvider";
import { CourseProvider } from "./context/CourseProvider";
import { ProfileProvider } from "./context/ProfileProvider";
import { EvaluationProvider } from "./context/EvaluationProvider";

import { AppLoading, Asset, SplashScreen } from "expo";

class App extends React.Component {
  state = {
    isSplashReady: false,
    isAppReady: false
  };

  _cacheResourcesAsync = async () => {
    SplashScreen.hide();
    const images = [
      require("./assets/adult.png"),
      require("./assets/logo.png"),
      require("./assets/signin.png"),
      require("./assets/survey.png")
    ];

    await Expo.Font.loadAsync({
      Roboto: require("./assets/Fonts/AgendaLight.ttf"),
      Roboto_medium: require("./assets/Fonts/AgendaMedium.ttf"),
      AgendaBold: require("./assets/Fonts/AgendaBold.ttf"),
      AgendaLight: require("./assets/Fonts/AgendaLight.ttf"),
      AgendaMedium: require("./assets/Fonts/AgendaMedium.ttf")
    });

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    await Promise.all(cacheImages);
    this.setState({ isAppReady: true });
  };

  _cacheSplashResourcesAsync = async () => {
    const splash = require("./assets/loading.png");
    return Asset.fromModule(splash).downloadAsync();
  };

  render() {
    if (!this.state.isSplashReady) {
      return (
        <AppLoading
          startAsync={this._cacheSplashResourcesAsync}
          onFinish={() => this.setState({ isSplashReady: true })}
          onError={console.warn}
          autoHideSplash={false}
        />
      );
    }
    if (!this.state.isAppReady) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            style={{
              flex: 1,
              resizeMode: "cover",
              position: "absolute",
              width: "100%",
              height: "100%"
            }}
            source={require("./assets/loading.png")}
            onLoad={this._cacheResourcesAsync}
          />
        </View>
      );
    }
    return (
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight
        }}
      >
        <UserProvider>
          <WorkshopProvider>
            <CourseProvider>
              <ProfileProvider>
                <EvaluationProvider>
                  <AppStackNavigator />
                </EvaluationProvider>
              </ProfileProvider>
            </CourseProvider>
          </WorkshopProvider>
        </UserProvider>
      </View>
    );
  }
}

const AppStackNavigator = createStackNavigator(
  {
    LoginRegister: {
      screen: LoginRegisterScreen
    },
    Main: {
      screen: MainDrawerNavigator
    }
  },
  {
    initialRouteName: "LoginRegister",
    headerMode: "none"
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;

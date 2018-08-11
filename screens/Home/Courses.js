import React, { Component, Fragment } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  AsyncStorage,
  RefreshControl
} from "react-native";
import { DrawerActions } from "react-navigation";
import { WorkshopConnect } from "../../context/WorkshopProvider";
import { Icon } from "native-base";

import axios from "axios";
import ContentRepo from "../../services/ContentRepo";
import Loading from "../Loading";

import BannerCarousel from "./BannerCarousel";
import CourseItems from "./CourseItems";
import MessageDialog from "../MessageDialog";
import { UserConnect } from "../../context/UserProvider";

const { CancelToken } = axios;

export class Courses extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    activeSlide: 0,
    loading: false,
    refreshing: false,
    error: false,
    showAuthMessage: false
  };

  cancelToken = CancelToken.source();

  showAuthMsg = async () => {
    const check = await AsyncStorage.getItem("authUsers");
    console.log("check", check);
    if (check) {
      const authUsers = JSON.parse(check);
      const checkUser = authUsers.find(
        email => email === this.props.user.email
      );
      console.log("checkuser", checkUser);
      if (!checkUser) {
        this.setState({ showAuthMessage: true });
      }
    } else {
      this.setState({ showAuthMessage: true });
    }
  };

  componentDidMount() {
    this.fireGetWorkshop();
  }

  componentWillUnmount() {
    this.cancelToken.cancel();
  }

  showToast = text => ToastAndroid.show(text, ToastAndroid.SHORT);
  toggleLoad = () => this.setState({ loading: !this.state.loading });
  toggleError = () => this.setState({ error: !this.state.error });
  changeActiveItem = index => this.setState({ activeSlide: index });

  fireGetWorkshop = () => {
    this.getWorkshopsRq();
  };

  navigateToSpecifiCourse = id =>
    this.props.navigation.navigate("SpecificCourse", {
      id,
      from: "Home"
    });

  getWorkshopsRq = () => {
    if (this.props.banners === null) {
      this.toggleLoad();
      ContentRepo.getContents()
        .then(r => {
          this.toggleLoad();
          const { data } = r.data;
          console.log(data);
          this.showAuthMsg();
          this.props.setBanners(data.banners);
          this.props.setGenres(data.genres);
        })
        .catch(err => {
          this.toggleLoad();
          this.showToast(
            "Something went wrong. Try checking your internet connection"
          );
        });
    }
  };

  openDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  };

  authorizeApp = async () => {
    const authUsers = await AsyncStorage.getItem("authUsers");
    if (authUsers) {
      const parsed = JSON.parse(authUsers);
      parsed.push(this.props.user.email);
      await AsyncStorage.setItem("authUsers", JSON.stringify(parsed));
      this.setState({ showAuthMessage: false });
    } else {
      const authUser = [this.props.user.email];
      await AsyncStorage.setItem("authUsers", JSON.stringify(authUser));
      this.setState({ showAuthMessage: false });
    }
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    ContentRepo.getContents()
      .then(r => {
        this.setState({ refreshing: false });
        const { data } = r.data;
        this.props.setBanners(data.banners);
        this.props.setGenres(data.genres);
      })
      .catch(err => {
        this.setState({ refreshing: false });
        this.showToast(
          "Something went wrong. Try checking your internet connection"
        );
      });
  };

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor="#00246a"
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
        style={{ flex: 1, backgroundColor: "white" }}
      >
        <MessageDialog
          onOk={this.authorizeApp}
          isVisible={this.state.showAuthMessage}
          okText="I agree"
          heading="Authorization"
          message="I understand and agree that my personal data may be shared to third party partners for course registration purposes"
        />
        <TouchableOpacity
          onPress={() => this.openDrawer()}
          style={{
            position: "absolute",
            left: 10,
            top: 10,
            zIndex: 2,
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Icon
            type="MaterialIcons"
            style={{ color: "white", fontSize: 25 }}
            name="menu"
          />
        </TouchableOpacity>
        <ScrollView onScroll={() => {}} style={styles.container}>
          {this.state.loading ? (
            <Loading
              isVisible={true}
              transparent={false}
              tip="Fetching Courses"
            />
          ) : (
            <Fragment>
              <BannerCarousel
                navigateToSpecifiCourse={this.navigateToSpecifiCourse}
                changeActiveItem={this.changeActiveItem}
                activeSlide={this.state.activeSlide}
              />
              <CourseItems genres={this.props.genres} />
            </Fragment>
          )}
        </ScrollView>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    paddingBottom: 20
  },
  imgBg: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%"
  }
};

export default UserConnect(["user"])(
  WorkshopConnect(["banners", "genres", "setBanners", "setGenres"])(Courses)
);

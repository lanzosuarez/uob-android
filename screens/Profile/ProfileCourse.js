import React, { Component } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  RefreshControl,
  ScrollView,
  BackHandler
} from "react-native";

import { Icon } from "native-base";

import BannerImage from "../Home/BannerImage";
import NoUserEvent from "../Home/NoUserEvent";
import UserEvent from "../Home/UserEvent";
import ConfirmDialog from "../ConfirmDialog";

import ContentRepo from "../../services/ContentRepo";

import Loading from "../Loading";
import { UserConnect } from "../../context/UserProvider";
import UserResource from "../../services/UserResource";
import { StackActions, NavigationActions } from "react-navigation";

class ProfileCourse extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    workshop: null,
    loading: false,
    showConfirm: false,
    refreshing: false
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handlePress);
    this.getWorkshop();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handlePress);
  }

  handlePress = () => this.goBack();

  toggleRefresh = () => this.setState({ refreshing: !this.state.refreshing });
  onRefresh = () => {
    this.toggleRefresh();
    const { navigation } = this.props;
    const workshopId = navigation.getParam("id");
    ContentRepo.getWorkShop(workshopId)
      .then(r => {
        this.toggleRefresh();
        const { message, status, data } = r.data;
        if (status) {
          if (data) {
            this.setState({ workshop: data });
          } else {
            this.showToast("Workshop not found");
          }
        } else {
          this.showToast(message);
        }
      })
      .catch(err => {
        this.toggleRefresh();
        this.showToast(
          "Something went wrong. Try checking your internet connection"
        );
        this.props.navigation.goBack();
      });
  };

  toggleLoad = () => this.setState({ loading: !this.state.loading });
  toggleConfirm = () => this.setState({ showConfirm: !this.state.showConfirm });

  showToast = text => ToastAndroid.show(text, ToastAndroid.SHORT);

  getWorkshop = () => {
    const { navigation } = this.props;
    const workshopId = navigation.getParam("id");
    this.toggleLoad();
    ContentRepo.getWorkShop(workshopId)
      .then(r => {
        this.toggleLoad();
        const { message, status, data } = r.data;
        console.log(data);
        if (status) {
          if (data) {
            this.setState({ workshop: data });
          } else {
            this.showToast("Workshop not found");
            this.props.navigation.goBack();
          }
        } else {
          this.showToast(message);
          this.props.navigation.goBack();
        }
      })
      .catch(err => {
        this.toggleLoad();
        this.showToast(
          "Something went wrong. Try checking your internet connection"
        );
        this.props.navigation.goBack();
      });
  };

  withdraw = () => {
    this.toggleConfirm();
    this.toggleLoad();
    const { event_batch_id } = this.state.workshop.user_event;
    ContentRepo.withdrawFromWorkshop({ event_batch_id })
      .then(r => {
        this.toggleLoad();
        if (r.data) {
          const { status, message, data } = r.data;
          if (status) {
            this.showToast(message);
            this.getWorkshop();
            let user = { ...this.props.user };
            user.credits_available = data.credits_available;
            this.props.setUser(user);
            UserResource.setUser(user);
          } else {
            this.showToast(message);
          }
        }
      })
      .catch(err => {
        console.log(err);
        this.toggleLoad();
        this.showToast(
          "Something went wrong. Try checking your internet connection"
        );
      });
  };

  goBack = () => {
    const go = route => {
      //   const resetAction = StackActions.reset({
      //     index: 0,
      //     actions: [NavigationActions.navigate({ routeName: route })]
      //   });
      this.props.navigation.navigate(route);
    };
    const fromRoute = this.props.navigation.getParam("from");
    switch (fromRoute) {
      case "Home": {
        go("HomeCourses");
        break;
      }
      case "Courses": {
        go("CourseList");
        break;
      }
      case "UpcomingCourses": {
        go("UpcomingCourses");
        break;
      }
      case "PastCourses": {
        go("PastCourses");
        break;
      }
      case "SearchGenre": {
        go("SearchGenre");
        break;
      }
      default: {
        go("HomeCourses");
        break;
      }
    }
  };

  render() {
    let w = this.state.workshop;
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
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => this.goBack()}
            style={{
              position: "absolute",
              left: 10,
              top: 5,
              zIndex: 2,
              display: "flex",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Icon
              type="MaterialIcons"
              style={{ color: "white", fontSize: 17 }}
              name="chevron-left"
            />
            <Text
              style={{
                color: "white",
                fontFamily: "Roboto_medium",
                fontSize: 17
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
          {this.state.loading ? (
            <Loading isVisible={this.state.loading} transparent={false} />
          ) : (
            <View style={{ flex: 1 }}>
              <BannerImage image_url={w ? w.image_url : "image"} />
              {w &&
              w.user_event &&
              (w.user_event.booking_status === "confirmed" ||
                w.user_event.booking_status === "checked_in") ? (
                <UserEvent
                  withdrawConfirm={this.toggleConfirm}
                  workshop={this.state.workshop}
                />
              ) : (
                <NoUserEvent workshop={this.state.workshop} />
              )}
            </View>
          )}
          <ConfirmDialog
            isVisible={this.state.showConfirm}
            okText="Confirm"
            heading="Withdrawal Confirmation"
            message="Are you sure you want to proceed with the withdrawal of the course? Your slot will be released for other learners."
            onCancel={this.toggleConfirm}
            onOk={this.withdraw}
            height={165}
          />
        </View>
      </ScrollView>
    );
  }
}

export default UserConnect(["setUser", "user"])(ProfileCourse);

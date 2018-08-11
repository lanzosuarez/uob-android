import React, { Component } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  RefreshControl,
  ScrollView
} from "react-native";

import { Icon } from "native-base";

import BannerImage from "./BannerImage";
import NoUserEvent from "./NoUserEvent";
import UserEvent from "./UserEvent";
import ConfirmDialog from "../ConfirmDialog";

import ContentRepo from "../../services/ContentRepo";

import Loading from "../Loading";

class SpecificCourse extends Component {
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
    this.getWorkshop();
  }

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
    console.log(event_batch_id);
    ContentRepo.withdrawFromWorkshop({ event_batch_id })
      .then(r => {
        this.toggleLoad();
        if (r.data) {
          const { status, message } = r.data;
          if (status) {
            this.showToast(message);
            this.getWorkshop();
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
    const fromRoute = this.props.navigation.getParam("from");
    console.log(fromRoute);
    switch (fromRoute) {
      case "Home": {
        this.props.navigation.navigate("HomeCourses");
        break;
      }
      case "Courses": {
        this.props.navigation.navigate("CourseList");
        break;
      }
      case "UpcomingCourses": {
        this.props.navigation.navigate("UpcomingCourses");
        break;
      }
      case "PastCourses": {
        this.props.navigation.navigate("PastCourses");
        break;
      }
      case "SearchGenre": {
        this.props.navigation.navigate("SearchGenre");
        break;
      }
      default: {
        this.props.navigation.navigate("HomeCourses");
        break;
      }
      // case "GenreCourses": {
      //   this.props.navigation.navigate("GenreCourses");
      //   break;
      // }
    }
    // if (fromRoute === "Home") {
    // } else if (fromRoute) {
    //   this.props.navigation.navigate("CourseList");
    // }
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
        style={{ flex: 1 }}
      >
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
            style={{ color: "white" }}
            name="chevron-left"
          />
          <Text style={{ color: "white", fontFamily: "Roboto_medium" }}>
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
            w.user_event.booking_status !== "withdrawn" ? (
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
          height={155}
        />
      </ScrollView>
    );
  }
}

export default SpecificCourse;

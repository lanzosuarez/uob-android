import React, { Component } from "react";

import {
  Header,
  Title,
  Body,
  Icon,
  Left,
  Container,
  Content,
  Button,
  Right,
  List
} from "native-base";

import { View, ToastAndroid, RefreshControl, Text } from "react-native";
import { DrawerActions } from "react-navigation";
import Notification from "../../services/Notification";

import NotificationItem from "./NotificationItem";

import Loading from "../Loading";
import { NotificationConnect } from "../../context/NotificationProvider";

const blue = "#00246a";

class NotificationsScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = { loading: false, notifications: [], refreshing: false };

  componentDidMount() {
    if (this.props.notifications === null) {
      this.getNotifications();
    } else {
      this.setState({ notifications: this.props.notifications });
    }
  }

  showToast = text => ToastAndroid.show(text, ToastAndroid.SHORT);

  toggleLoad = () => this.setState({ loading: !this.state.loading });

  openDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  };

  toggleRefresh = () => this.setState({ refreshing: !this.state.refreshing });

  readNotif = notification => {
    if (notification.read === false) {
      const notifications = [...this.props.notifications];
      let nIndex = notifications.findIndex(n => n.id === notification.id);
      if (nIndex > -1) {
        let notif = notifications[nIndex];
        notif.read = true;
        notifications.splice(nIndex, 1, notif);
        this.props.setNotifications(notifications);
        Notification.readNotification(notif.id);
      }
    }
  };

  onRefresh = () => {
    this.toggleRefresh();
    Notification.getNotifications()
      .then(r => {
        this.toggleRefresh();
        const { status, message, data } = r.data;
        if (status) {
          this.props.setNotifications(data);
          this.setState({ notifications: data });
        } else {
          this.showToast(message);
        }
      })
      .catch(err => {
        this.toggleRefresh();
        this.showToast(
          "Something went wrong. Try checking your internet connection"
        );
      });
  };

  getNotifications = () => {
    this.toggleLoad();
    Notification.getNotifications()
      .then(r => {
        this.toggleLoad();
        const { status, message, data } = r.data;
        if (status) {
          this.props.setNotifications(data);
          this.setState({ notifications: data });
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
      });
  };

  goToBody = notification => {
    this.props.navigation.push("NotifBody", {
      notification
    });
    this.readNotif(notification);
  };

  render() {
    return (
      <Container>
        <Loading isVisible={this.state.loading} transparent={false} />
        <Header style={{ backgroundColor: "#f6f6f6" }}>
          <Left style={{ flex: 1 }}>
            <Button onPress={() => this.openDrawer()} transparent>
              <Icon type="MaterialIcons" style={{ color: blue }} name="menu" />
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
                fontFamily: "AgendaBold",
                fontSize: 13,
                color: "#00246a"
              }}
            >
              Notifications
            </Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <Content
          refreshControl={
            <RefreshControl
              tintColor="#00246a"
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          <View style={{ flex: 1, paddingRight: 10 }}>
            {this.state.notifications.length === 0 ? (
              <Text
                style={{
                  color: blue,
                  fontFamily: "Roboto_light",
                  textAlign: "center",
                  marginTop: 20
                }}
              >
                No notifications to show
              </Text>
            ) : (
              <List>
                {this.state.notifications.map(notification => (
                  <NotificationItem
                    goToBody={this.goToBody}
                    key={notification.id}
                    notification={notification}
                  />
                ))}
              </List>
            )}
          </View>
        </Content>
      </Container>
    );
  }
}

export default NotificationConnect(["notifications", "setNotifications"])(
  NotificationsScreen
);

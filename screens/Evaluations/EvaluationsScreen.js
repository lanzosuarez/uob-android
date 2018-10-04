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

import {
  View,
  ToastAndroid,
  Linking,
  Text,
  RefreshControl
} from "react-native";
import { DrawerActions } from "react-navigation";
import Evaluation from "../../services/Evaluation";

import Loading from "../Loading";

import EvaluationsItem from "./EvaluationsItem";
import { EvaluationConnect } from "../../context/EvaluationProvider";
import { headerBgColor, headerFontColor } from "../../global";
import UserResource from "../../services/UserResource";

const blue = "#00246a";

class EvaluationsScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    loading: false,
    evaluations: [],
    title: "Courses",
    refreshing: false
  };

  componentDidMount() {
    if (this.props.evaluations === null) {
      this.getEvaluations();
    } else {
      this.setState({ evaluations: this.props.evaluations });
    }
  }

  showToast = text => ToastAndroid.show(text, ToastAndroid.SHORT);

  toggleLoad = () => this.setState({ loading: !this.state.loading });

  openDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  };

  toggleRefresh = () => this.setState({ refreshing: !this.state.refreshing });
  onRefresh = () => {
    this.toggleRefresh();
    Evaluation.getEvaluations()
      .then(r => {
        this.toggleRefresh();
        const { status, message, data } = r.data;
        if (status) {
          this.props.setEvaluations(data);
          this.setState({ evaluations: data });
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

  getEvaluations = () => {
    this.toggleLoad();
    Evaluation.getEvaluations()
      .then(r => {
        this.toggleLoad();
        const { status, message, data } = r.data;
        console.log("evaluation", data);
        if (status) {
          this.props.setEvaluations(data);
          this.setState({ evaluations: data });
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

  goToEvaluate = async (batchId, eventId) => {
    const { authentication_token, email } = await UserResource.getUser();
    const link = `https://demo.uobsummit.com/user_evaluations/new?event_batch_id=${batchId}&event_id=${eventId}&auth_token=${authentication_token}&user_email=${email}`;
    Linking.openURL(link)
      .then(d => {
        this.showToast("Opening browser");
      })
      .catch(err => {
        this.showToast("Failed to open browser");
      });
  };

  render() {
    return (
      <Container>
        <Loading isVisible={this.state.loading} transparent={false} />
        <Header style={{ backgroundColor: headerBgColor }}>
          <Left style={{ flex: 1 }}>
            <Button onPress={() => this.openDrawer()} transparent>
              <Icon
                type="MaterialIcons"
                style={{ color: headerFontColor }}
                name="menu"
              />
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
                fontSize: 16,
                color: headerFontColor
              }}
            >
              Evaluations
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
            {this.state.evaluations.length === 0 ? (
              <Text
                style={{
                  color: blue,
                  fontFamily: "Roboto_light",
                  textAlign: "center",
                  marginTop: 20
                }}
              >
                No Evaluations to show
              </Text>
            ) : (
              <List>
                {this.state.evaluations.map(evaluation => (
                  <EvaluationsItem
                    goToEvaluate={this.goToEvaluate}
                    key={evaluation.event_id}
                    evaluation={evaluation}
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

export default EvaluationConnect(["evaluations", "setEvaluations"])(
  EvaluationsScreen
);

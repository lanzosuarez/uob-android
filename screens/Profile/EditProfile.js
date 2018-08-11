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
  Input
} from "native-base";

import { Text, View, ToastAndroid, Dimensions } from "react-native";

import { DrawerActions } from "react-navigation";

import Profile from "../../services/Profile";
import { ProfileConnect } from "../../context/ProfileProvider";
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

class EditProfile extends Component {
  constructor(props) {
    super(props);
  }

  state = { loading: false, supervisorName: "", supervisorEmail: "" };

  componentDidMount() {
    const { supervisor_name, supervisor_email } = this.props.profile;
    this.setState({
      supervisorName: supervisor_name,
      supervisorEmail: supervisor_email
    });
  }

  checkFields = fields => fields.some(field => this.state[field].length === 0);

  onChangeText = (key, val) => this.setState({ [key]: val });

  toggleLoad = () => this.setState({ loading: !this.state.loading });

  showToast = text => ToastAndroid.show(text, ToastAndroid.SHORT);

  openDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  };

  updateProfile = () => {
    if (this.checkFields(["supervisorName", "supervisorEmail"]) === false) {
      this.toggleLoad();
      const { supervisorName, supervisorEmail } = this.state;
      Profile.updateProfile(
        {
          supervisor: supervisorEmail,
          supervisor_name: supervisorName
        },
        this.props.profile.id
      )
        .then(r => {
          this.toggleLoad();
          const { status, message, data } = r.data;
          if (status) {
            let profile = this.props.profile;
            profile = Object.assign(profile, data);
            this.props.setProfile(profile);
            this.props.navigation.goBack();
          } else {
            this.showToast(message);
          }
        })
        .catch(err => {
          this.toggleLoad();
          this.props.navigation.goBack();
          this.showToast(
            "Something went wrong. Try checking your internet connection"
          );
        });
    } else {
      this.showToast("All fields are required");
    }
  };

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
              Edit Profile
            </Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <Content>
          <View
            stlye={{
              flex: 1,
              backgroundColor: "#f4f4ff",
              alignItems: "center"
            }}
          >
            <Form style={{ backgroundColor: "white", marginTop: 40 }}>
              <Item inlineLabel>
                <Label style={{ ...bold, ...txt }}>Supervisor's name</Label>
                <Input
                  value={this.state.supervisorName}
                  onChangeText={e => this.onChangeText("supervisorName", e)}
                  style={{ ...light, ...txt }}
                />
              </Item>
              <Item inlineLabel last>
                <Label style={{ ...bold, ...txt }}>Supervisor's email</Label>
                <Input
                  value={this.state.supervisorEmail}
                  onChangeText={e => this.onChangeText("supervisorEmail", e)}
                  style={{ ...light, ...txt }}
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
                onPress={() => this.updateProfile()}
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
                  Update Profile
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

export default ProfileConnect(["profile", "setProfile"])(EditProfile);

import React from "react";

import { Text, View } from "react-native";
import {
  Left,
  Right,
  Icon,
  Header,
  Body,
  Container,
  Content,
  Button,
  Title
} from "native-base";

const blue = "#00246a";

const NotifBody = props => {
  const { bold, light } = styles;
  console.log(props.navigation.getParam("notification"));
  const { title, message, subtitle, id } = props.navigation.getParam(
    "notification"
  );

  return (
    <Container>
      <Header style={{ backgroundColor: "#f6f6f6" }}>
        <Left style={{ flex: 1 }}>
          <Button onPress={() => props.navigation.goBack()} transparent>
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
      <Content contentContainerStyle={{ padding: 30, paddingTop: 40 }}>
        <View
          style={{
            flex: 1,
            borderBottomColor: "#bfc8da",
            borderBottomWidth: 2,
            paddingBottom: 20
          }}
        >
          <Text
            style={{ ...bold, fontSize: 20, marginBottom: 10, color: blue }}
          >
            {title}
          </Text>
          <Text style={{ ...light, fontSize: 13, color: blue }}>
            {subtitle}
          </Text>
        </View>
        <View style={{ paddingTop: 20 }}>
          <Text style={{ ...light, color: blue }}>{message}</Text>
        </View>
      </Content>
    </Container>
  );
};

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
  blue: {
    color: blue
  },
  txt: {
    color: blue,
    fontSize: 14
  }
};

export default NotifBody;

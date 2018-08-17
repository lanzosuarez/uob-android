import React from "react";

import { Text, View, Image, TouchableOpacity } from "react-native";
import { ListItem, Left, Right, Icon } from "native-base";

const blue = "#00246a";

const NotificationItem = props => {
  return (
    <ListItem
      onPress={() => props.goToBody(props.notification)}
      style={{ borderBottomColor: blue }}
    >
      <Left>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={{ justifyContent: "center", marginRight: 10 }}>
            {props.notification.read ? (
              <Image
                style={{ height: 40, width: 40 }}
                source={require("../../assets/notif_r.png")}
              />
            ) : (
              <Image
                style={{ height: 40, width: 40 }}
                source={require("../../assets/notif_u.png")}
              />
            )}
          </View>
          <View style={{ flex: 1, justifyContent: "space-around" }}>
            <Text
              style={{ fontFamily: "AgendaBold", fontSize: 14, color: blue }}
            >
              {props.notification.title}
            </Text>
            <Text
              style={{ fontFamily: "Roboto_light", fontSize: 12, color: blue }}
            >
              {props.notification.subtitle}
            </Text>
          </View>
        </View>
      </Left>
      <Right>
        <TouchableOpacity onPress={() => props.goToBody(props.notification)}>
          <Icon
            style={{ color: blue }}
            type="MaterialIcons"
            name="chevron-right"
          />
        </TouchableOpacity>
      </Right>
    </ListItem>
  );
};

export default NotificationItem;

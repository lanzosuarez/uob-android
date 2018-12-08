import React from "react";
import { View, Text } from "react-native";
import { Badge } from "native-base";
import { NotificationConnect } from "../../context/NotificationProvider";

const NotifBadge = props => {
  const notifs = props.notifications || [];
  const n = notifs.filter(n => !n.read).length;
  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <Text
        h5
        style={{
          marginLeft: 40,
          marginTop: 15,
          marginBottom: 15,
          fontWeight: "bold",
          color: "white"
        }}
      >
        Notifications
      </Text>
      {n > 0 && (
        <Badge
          style={{
            backgroundColor: "red",
            marginRight: 20,
            marginTop: 15,
            marginBottom: 15
          }}
        >
          <Text style={{ color: "white" }}>{n}</Text>
        </Badge>
      )}
    </View>
  );
};

export default NotificationConnect(["notifications"])(NotifBadge);

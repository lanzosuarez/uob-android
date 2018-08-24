import React from "react";

import { Text, View } from "react-native";
import { ListItem, Left, Right, Thumbnail } from "native-base";

const blue = "#00246a";

const EvaluationsItem = props => {
  const {
    title,
    schedule,
    event_batch_id,
    event_id,
    image_url
  } = props.evaluation;
  return (
    <ListItem
      onPress={() => props.goToEvaluate(event_batch_id, event_id)}
      style={{
        borderBottomWidth: 0,
        height: 140,
        padding: 0
      }}
    >
      <View style={{ flex: 1, marginRight: 20 }}>
        <Thumbnail
          defaultSource={require("../../assets/defaultimg.png")}
          style={{ flex: 1, width: "100%" }}
          square
          source={{ uri: image_url }}
        />
      </View>
      <View
        style={{
          height: "100%",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start", paddingTop: 5
        }}
      >
        <Text style={{ fontFamily: "AgendaBold", color: blue, fontSize: 15 }}>
          {title}
        </Text>
        <Text style={{ fontFamily: "Roboto_light", color: blue, fontSize: 13 }}>
          {schedule}
        </Text>
      </View>
    </ListItem>
  );
};

export default EvaluationsItem;

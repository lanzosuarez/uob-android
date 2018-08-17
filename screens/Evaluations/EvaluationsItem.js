import React from "react";

import { Text, View, Image, TouchableOpacity } from "react-native";
import { ListItem, Left, Right, Icon } from "native-base";

const blue = "#00246a";

const EvaluationsItem = props => {
  const { title, event_batch_id, event_id } = props.evaluation;
  return (
    <ListItem
      onPress={() => props.goToEvaluate(event_batch_id, event_id)}
      style={{ borderBottomColor: blue }}
    >
      <Left>
        <Text style={{ fontFamily: "Roboto_light", color: blue }}>{title}</Text>
      </Left>
      <Right>
        <TouchableOpacity
          onPress={() => props.goToEvaluate(event_batch_id, event_id)}
        >
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

export default EvaluationsItem;

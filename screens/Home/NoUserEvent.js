import React from "react";

import { Text, View, Dimensions, ScrollView } from "react-native";

import { Container, Content } from "native-base";

import Workshops from "./Workshops";

const blue = "#00246a";
const { height } = Dimensions.get("window");

const NoUserEvent = props => {
  const { workshop: w } = props;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 15
          }}
        >
          <View style={{ width: "100%" }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginBottom: 30,
                color: blue,
                textAlign: "center",
                fontFamily: "AgendaBold"
              }}
            >
              {w ? w.title : ""}
            </Text>
          </View>
          <View style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Workshops
              workshopId={w ? w.id : ""}
              workshop_types={w ? w.workshop_types : []}
            />
          </View>

          <Text
            style={{
              flex: 1,
              fontSize: 16,
              fontWeight: "100",
              color: blue,
              lineHeight: 20,
              marginTop: 20,
              fontFamily: "Roboto_medium",
              textAlign: "left"
            }}
          >
            {w ? w.description : ""}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default NoUserEvent;

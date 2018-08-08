import React from "react";

import { View, Text } from "react-native";
import { Button, CardItem, Card, Body } from "native-base";
import { withNavigation } from "react-navigation";

const blue = "#00246a";

const WorkshopItem = props => {
  const { type, credit, keyword } = props.workshopType;
  const workshopId = props.workshopId;

  console.log(workshopId, keyword);

  const viewSchedules = () => {
    props.navigation.navigate("ViewSchedule", {
      id: workshopId,
      keyword,
      credit
    });
  };

  return (
    <Card style={{ flex: 0, borderRadius: 8 }}>
      <CardItem
        style={{
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8
        }}
      >
        <Body>
          <View
            style={{
              height: 30,
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingLeft: 10,
              paddingRight: 10
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "100",
                  color: blue,
                  fontFamily: "AgendaMedium"
                }}
              >
                {type}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "100",
                  color: blue,
                  fontFamily: "AgendaMedium"
                }}
              >
                {credit} credits
              </Text>
            </View>
            <View>
              <Button
                onPress={() => viewSchedules()}
                style={{
                  padding: 3,
                  height: 35,
                  width: 100,
                  borderRadius: 10,
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: blue
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 10,
                    textAlign: "center",
                    fontFamily: "AgendaMedium"
                  }}
                >
                  View Schedule
                </Text>
              </Button>
            </View>
          </View>
        </Body>
      </CardItem>
    </Card>
  );
};

export default withNavigation(WorkshopItem);

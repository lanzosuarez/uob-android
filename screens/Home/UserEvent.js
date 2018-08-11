import React, { Component } from "react";

import { View, Text, ScrollView, Dimensions } from "react-native";
import { Button } from "native-base";

const blue = "#00246a";

const { height } = Dimensions.get("window");

class UserEvent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { workshop: w, withdrawConfirm } = this.props;
    let ue = w ? w.user_event : null;
    return (
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          backgroundColor: "white",
          paddingLeft: 30,
          paddingRight: 30,
          paddingTop: 15,
          flex: 1,
          alignItems: "center",
          minHeight: height
        }}
      >
        <View
          style={{
            alignItems: "center",
            marginBottom: 10
          }}
        >
          <Text
            style={{
              fontFamily: "AgendaBold",
              fontSize: 20,
              fontWeight: "bold",
              color: blue
            }}
          >
            {w ? w.title : ""}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "100",
              color: blue,
              fontFamily: "Roboto_medium"
            }}
          >
            ({ue ? ue.booking_status : ""})
          </Text>
        </View>
        <View
          style={{
            marginBottom: 10
          }}
        >
          <View
            style={{
              alignItems: "center",
              marginBottom: 10
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: blue,
                fontFamily: "AgendaBold"
              }}
            >
              {ue ? ue.date : ""}
            </Text>
            <Text
              style={{
                fontSize: 11,
                fontWeight: "100",
                color: blue,
                fontFamily: "Roboto_medium"
              }}
            >
              Available seats: {ue ? ue.available_slot : ""} of{" "}
              {ue ? ue.slot : ""}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginBottom: 10
          }}
        >
          <View
            style={{
              alignItems: "center",
              marginBottom: 10
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: blue,
                fontFamily: "AgendaBold"
              }}
            >
              Venue
            </Text>
            <Text
              style={{
                fontSize: 11,
                fontWeight: "100",
                color: blue,
                fontFamily: "Roboto_medium"
              }}
            >
              {ue ? ue.venue : ""}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginBottom: 10
          }}
        >
          <View
            style={{
              alignItems: "center",
              marginBottom: 10
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: blue,
                fontFamily: "AgendaBold"
              }}
            >
              Time
            </Text>
            <Text
              style={{
                fontSize: 11,
                fontWeight: "100",
                color: blue,
                fontFamily: "Roboto_medium"
              }}
            >
              {ue ? ue.time : ""}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginBottom: 20,
            alignItems: "center"
          }}
        >
          <Button
            onPress={() => withdrawConfirm()}
            style={{
              backgroundColor: "#00246a",
              padding: 3,
              height: 40,
              width: 150,
              borderRadius: 10,
              justifyContent: "center",
              display: "flex",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "900",
                color: "white",
                fontFamily: "AgendaBold"
              }}
            >
              Withdraw
            </Text>
          </Button>
        </View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "100",
            color: blue,
            fontFamily: "Roboto_medium",
            lineHeight: 20
          }}
        >
          {w ? w.description : ""}
        </Text>
      </ScrollView>
    );
  }
}

export default UserEvent;

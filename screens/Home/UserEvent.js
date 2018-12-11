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
        contentContainerStyle={{ backgroundColor: "white" }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: "white",
              paddingLeft: 30,
              paddingRight: 30,
              paddingTop: 15,
              flex: 1,
              alignItems: "center"
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
                  color: blue,
                  textAlign: "center"
                }}
              >
                {w ? w.title : ""}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "100",
                  color: blue,
                  fontFamily: "Roboto_light"
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
                    fontSize: 17,
                    fontWeight: "bold",
                    color: blue,
                    fontFamily: "AgendaBold"
                  }}
                >
                  {ue ? ue.date : ""}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "100",
                    color: blue,
                    fontFamily: "Roboto_light"
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
                  justifyContent:"center",
                  marginBottom: 10
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "bold",
                    color: blue,
                    fontFamily: "AgendaBold"
                  }}
                >
                  Venue
                </Text>
                <Text
                  style={{
                    textAlign:"center",
                    fontSize: 15,
                    fontWeight: "100",
                    color: blue,
                    fontFamily: "Roboto_light"
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
                    fontSize: 17,
                    fontWeight: "bold",
                    color: blue,
                    fontFamily: "AgendaBold"
                  }}
                >
                  Time
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "100",
                    color: blue,
                    fontFamily: "Roboto_light"
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
                flex: 1,
                fontSize: 14,
                fontWeight: "100",
                color: blue,
                fontFamily: "Roboto_light",
                lineHeight: 20,
                textAlign: "left"
              }}
            >
              {w ? w.description : ""}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default UserEvent;

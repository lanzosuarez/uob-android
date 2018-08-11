import React from "react";

import { Body, Button, Card, CardItem } from "native-base";

import { Text, View } from "react-native";

const blue = "#00246a";

const Schedule = ({ sched, selectSchedule }) => {
  return (
    <View
      style={{
        marginBottom: 20
      }}
      key={sched.event_id}
    >
      <Card
        style={{
          borderRadius: 8
        }}
      >
        <CardItem
          header
          style={{
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: blue,
              textAlign: "center",
              fontFamily: "AgendaBold"
            }}
          >
            {sched.date}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "100",
              color: blue,
              textAlign: "center",
              fontFamily: "Roboto_medium"
            }}
          >
            Available seats: {sched.available_slot} of {sched.slot}
          </Text>
        </CardItem>
        <CardItem
          style={{
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            paddingBottom: 30
          }}
        >
          <Body>
            <View
              style={{
                marginBottom: 10
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: blue,
                  fontFamily: "AgendaBold"
                }}
              >
                Venue{" "}
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "100",
                  color: blue,
                  fontFamily: "Roboto_medium"
                }}
              >
                {sched.venue}
              </Text>
            </View>
            <View
              style={{
                marginBottom: 10
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: blue,
                  fontFamily: "AgendaBold"
                }}
              >
                Time
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "100",
                  color: blue,
                  fontFamily: "Roboto_medium"
                }}
              >
                {sched.time}
              </Text>
            </View>
          </Body>
        </CardItem>
      </Card>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: -25
        }}
      >
        <View>
          <Button
            onPress={() => selectSchedule(sched)}
            style={{
              backgroundColor: "#00246a",
              padding: 3,
              height: 40,
              width: 150,
              borderRadius: 10,
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              elevation: 99
            }}
          >
            <Text
              style={{
                fontSize: 10,
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
                fontFamily: "AgendaBold"
              }}
            >
              Book{" "}
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Schedule;

import React from "react";

import { Text, View } from "react-native";
import { Card, Button, CardItem, Body } from "native-base";

const blue = "#00246a";

const CourseBookingItem = props => {
  const { booking } = props;
  const { bold, light, lab, txt, val, frow, r, c, btnText } = styles;
  return (
    <View
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderBottomColor: "#bfc8da",
        borderBottomWidth: 2
      }}
    >
      <View style={{ ...frow }}>
        <Text style={{ ...lab, ...bold, ...txt }}>Name</Text>
        <Text style={{ ...val, ...light, ...txt }}>{booking.name}</Text>
      </View>
      <View style={{ ...frow }}>
        <Text style={{ ...lab, ...bold, ...txt }}>Course</Text>
        <Text style={{ ...val, ...light, ...txt }}>
          {booking.course_name} {"\n"}
        </Text>
      </View>
      <View style={{ ...frow }}>
        <Text style={{ ...lab, ...bold, ...txt }}>Status</Text>
        <Text style={{ ...val, ...light, ...txt }}>{booking.status}</Text>
      </View>
      <View>
        {booking.status === "confirmed" ? (
          <Button
            onPress={() => props.confirmBooking(booking.id, "rejected")}
            style={{ ...r }}
          >
            <Text style={{ ...light, ...btnText }}>Reject</Text>
          </Button>
        ) : (
          <Button
            onPress={() => props.confirmBooking(booking.id, "confirmed")}
            style={{ ...c }}
          >
            <Text style={{ ...light, ...btnText }}>Approve</Text>
          </Button>
        )}
      </View>
    </View>
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
  txt: {
    color: blue,
    fontSize: 14
  },
  lab: {
    flex: 1
  },
  val: {
    flex: 2
  },
  frow: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 15
  },
  r: {
    backgroundColor: "#ed1c2b",
    width: 150,
    borderRadius: 10,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20
  },
  c: {
    backgroundColor: "#60d460",
    width: 170,
    borderRadius: 10,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20
  },
  btnText: {
    color: "white",
    fontSize: 14,
    textAlign: "center"
  }
};

export default CourseBookingItem;

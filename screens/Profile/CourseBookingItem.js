import React from "react";

import { Text, View } from "react-native";
const blue = "#00246a";
const grey = "#babac2";

const CourseBookingItem = props => {
  const { booking } = props;
  const { bold, light, lab, txt, val, frow } = styles;
  return (
    <View
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderBottomColor: "#bfc8da",
        borderBottomWidth: 2,
        marginBottom: 20,
        paddingBottom: 40
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
        <View
          style={{
            height: 30,
            ...val,
            display: "flex",
            flexDirection: "row"
          }}
        >
          <View
            style={{
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              justifyContent: "center",
              width: "50%",
              backgroundColor: booking.status === "confirmed" ? blue : grey
            }}
          >
            <Text
              onPress={() => props.confirmBooking(booking.id, "confirmed")}
              style={{
                color: "white",
                fontSize: 13,
                textAlign: "center",
                fontFamily: "Roboto_light"
              }}
            >
              Confirmed
            </Text>
          </View>
          <View
            style={{
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
              justifyContent: "center",
              width: "50%",
              backgroundColor: booking.status === "rejected" ? blue : grey
            }}
          >
            <Text
              onPress={() => props.confirmBooking(booking.id, "rejected")}
              style={{
                color: "white",
                fontSize: 13,
                textAlign: "center",
                fontFamily: "Roboto_light"
              }}
            >
              Rejected
            </Text>
          </View>
        </View>
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
    fontSize: 15
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
    fontSize: 15,
    textAlign: "center"
  }
};

export default CourseBookingItem;

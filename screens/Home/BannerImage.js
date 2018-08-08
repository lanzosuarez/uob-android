import React from "react";

import { View, Image } from "react-native";

const BannerImage = ({ image_url }) => (
  <View style={{ height: 250 }}>
    <View
      style={{
        flex: 1,
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.3)"
      }}
    />
    <Image
      style={styles.imgBg}
      source={{ uri: image_url, cache: "only-if-cached" }}
    />
  </View>
);

const styles = {
  imgBg: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%"
  }
};

export default BannerImage;

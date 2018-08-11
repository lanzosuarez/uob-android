import React, { Fragment } from "react";

import { Image, Text, View, Dimensions, TouchableOpacity } from "react-native";

import { WorkshopComsumer } from "../../context/WorkshopProvider";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { withNavigation } from "react-navigation";

const { width } = Dimensions.get("window");

const BannerCarousel = props => {
  const styles = {
    imgBg: {
      flex: 1,
      resizeMode: "cover",
      position: "absolute",
      width: "100%",
      height: "100%"
    }
  };
  const renderItem = ({ item, index }) => {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => props.navigateToSpecifiCourse(item.id)}
          style={{
            flex: 1,
            justifyContent: "flex-end"
          }}
        >
          <Image
            onProgress={e => console.log(e)}
            style={styles.imgBg}
            source={{ uri: item.image_url, cache: "only-if-cached" }}
          />
          <View
            style={{
              flex: 1,
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.2)"
            }}
          />
          <View style={{ marginBottom: 40, marginLeft: 20 }}>
            <Text
              style={{
                fontFamily: "Roboto_medium",
                color: "white",
                fontSize: 15
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                fontFamily: "Roboto_medium",
                color: "white",
                fontSize: 15
              }}
            >
              {item.credit} credits
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const { changeActiveItem, activeSlide } = props;

  return (
    <View style={{ height: 280 }}>
      <WorkshopComsumer>
        {({ banners }) => (
          <Fragment>
            <Carousel
              swipeThreshold={10}
              enableMomentum
              onSnapToItem={changeActiveItem}
              data={banners || []}
              renderItem={renderItem}
              sliderWidth={width}
              itemWidth={width}
            />
            <Pagination
              dotsLength={banners ? banners.length : 0}
              activeDotIndex={activeSlide}
              containerStyle={{
                backgroundColor: "rgba(255, 255, 255, 0)",
                height: 70,
                marginTop: -50
              }}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: "rgba(255, 255, 255, 0.92)"
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
          </Fragment>
        )}
      </WorkshopComsumer>
    </View>
  );
};

export default withNavigation(BannerCarousel);

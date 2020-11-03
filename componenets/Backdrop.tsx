import * as React from "react";

import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Islider } from "./../slider_data";
import { LinearGradient } from "expo-linear-gradient";
import Swiper from "../Swiper";
import { useValue } from "react-native-reanimated";

interface BackdropProp {
  slider: Islider;
  scrollX: any;
  ITEM_SIZE: number;
}
const { width, height } = Dimensions.get("window");
const Backdrop = ({ slider, scrollX, ITEM_SIZE }: BackdropProp) => {
  const translateX = useValue(0);
  const snapPoints = slider.map((_, i: number) => i * -width);
  return (
    <View style={styles.container}>
      <Animated.View style={StyleSheet.absoluteFill}>
        <FlatList
          data={slider.reverse()}
          keyExtractor={(item) => item.key + "-backdrop"}
          removeClippedSubviews={false}
          contentContainerStyle={{ width, height: height }}
          renderItem={({ item, index }) => {
            if (!item.backdrop) {
              return null;
            }
            const translateX = scrollX.interpolate({
              inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
              outputRange: [0, width],
              // extrapolate:'clamp'
            });
            return (
              <Animated.View
                removeClippedSubviews={false}
                style={{
                  position: "absolute",
                  width: translateX,
                  height,
                  overflow: "hidden",
                }}
              >
                <Image
                  source={{ uri: item.backdrop }}
                  style={{
                    width,
                    height: height,
                    position: "absolute",
                  }}
                />
              </Animated.View>
            );
          }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
  pictures: {
    height,
    flexDirection: "row",
  },
  picture: {
    width,
    height,
    overflow: "hidden",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});
export default Backdrop;

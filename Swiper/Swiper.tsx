import Animated, {
  add,
  clockRunning,
  cond,
  debug,
  divide,
  eq,
  floor,
  not,
  set,
  useCode,
} from "react-native-reanimated";
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import {
  snapPoint,
  timing,
  useClock,
  usePanGestureHandler,
  useValue,
} from "react-native-redash";

import React from "react";

interface sliderProp {
  slider: any;
  scrollX: any;
  ITEM_SIZE: number;
}
const { width, height } = Dimensions.get("window");

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

const Swiper = ({ slider, scrollX, ITEM_SIZE }: sliderProp) => {

 
  const clock = useClock();
  const index = useValue(0);
  const offsetX = useValue(0);
  const translateX = useValue(0);
 
  const snapPoints = slider.map((_, i: number) => i * -width);
  const {
    gestureHandler,
    state,
    velocity,
    translation,
  } = usePanGestureHandler();
  const to = snapPoint(translateX, velocity.x, snapPoints);
  useCode(
    () => [
      cond(eq(state, State.ACTIVE), [
        set(translateX, add(offsetX, translation.x)),
      ]),
      cond(eq(state, State.END), [
        set(translateX, timing({ clock, from: translateX, to })),
        set(offsetX, translateX),
        cond(not(clockRunning(clock)), [
          set(index, floor(divide(translateX, -width))),
          debug("index", index),
        ]),
      ]),
    ],
    []
  );
  return (
    <View style={styles.container}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Animated.View
            style={[
              styles.pictures,
              { width: width * slider.length },
              { transform: [{ translateX }] },
            ]}
          >
            {slider.map((data: any) => (
              <View key={data.key} style={styles.picture}>
                <Text style={{ color: "red" }}>{data.backdrop}</Text>
                <Image style={styles.image} source={{ uri: data.backdrop }} />
              </View>
            ))}
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default Swiper;

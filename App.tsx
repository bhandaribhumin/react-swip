import * as React from 'react';

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
} from 'react-native';

import Backdrop from './componenets/Backdrop'
import { LinearGradient } from 'expo-linear-gradient';
import { SLIDER_DATA } from './slider_data';
import Swiper from './Swiper';

const { width, height } = Dimensions.get('window');

const SPACING = 5;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.72;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height;

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);


export default function App() {
  const [slider, setSlider] = React.useState<any>([]);
  
  const scrollX = React.useRef(new Animated.Value(0)).current;
 
  React.useEffect(() => {
    if (slider.length === 0) {
      setSlider([{ key: 'empty-left' }, ...SLIDER_DATA, { key: 'empty-right' }]);
    }
  }, []);

  return (
    <View style={styles.container}>
      {/* <Swiper slider={slider} scrollX={scrollX} ITEM_SIZE={ITEM_SIZE}/> */}
      <Backdrop slider={slider} scrollX={scrollX} ITEM_SIZE={ITEM_SIZE} />
      <StatusBar hidden />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={slider}
        keyExtractor={(item) => item.key}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={{ alignItems: 'flex-end' }}
        snapToInterval={ITEM_SIZE}
        snapToAlignment='start'
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          if (!item.poster) {
            return <View style={{ width: EMPTY_ITEM_SIZE }} />;
          }
          return (
            <View style={{ width: ITEM_SIZE }}>
              <Animated.View
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING,
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  borderRadius: 34,
                }}
              >
                <Image
                  source={{ uri: item.poster }}
                  style={styles.posterImage}
                />
              </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 0.75,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});

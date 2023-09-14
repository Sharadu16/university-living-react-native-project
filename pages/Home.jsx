import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

const movieData = [
  { id: "1", image: require("../assets/images/thor.jpg"), title: "Thor" },
  {
    id: "2",
    image: require("../assets/images/Spiderman.jpg"),
    title: "Spiderman",
  },
  { id: "3", image: require("../assets/images/kgf.jpg"), title: "KGF" },
  {
    id: "4",
    image: require("../assets/images/heart-attack.jpg"),
    title: "Heart Attack",
  },
  {
    id: "5",
    image: require("../assets/images/avengers.jpg"),
    title: "Avengers",
  },
];

const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;

const Home = () => {
  const listRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    //--->>> To perform the animation autoscroll the images ----->>>>>> //
    let interval = setInterval(() => {
      if (activeIndex === movieData?.length - 1) {
        listRef.current.scrollToIndex({ animation: true, index: 0 });
      } else {
        listRef.current.scrollToIndex({
          animation: true,
          index: activeIndex + 1,
        });
      }
    }, 3000);
    // to clear the interval ------>>>>>>>>>>> //
    return () => clearInterval(interval);
  });

  //---->>>>>>> to measure the length & Offset for the image starting position----->>>>
  const getItemLayOut = (data, index) => ({
    length: Width,
    offset: Width * index,
    index: index,
  });

  // To display all images & text ------>>>>>> //
  const renderItem = ({ item }) => {
    return (
      <View style={styles.imageBox}>
        <Image
          style={{ width: "100%", height: "100%",}}
          source={item.image}
          alt={item.title}
        />
        <Text
          style={{
            position: "absolute",
            bottom: 20,
            fontSize: 42,
            fontWeight: "bold",
            color: "aqua",
            textAlign: "center",
            textTransform: 'uppercase',
            fontStyle:'italic',
            letterSpacing:10
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            position: "absolute",
            bottom:0,
            fontSize: 20,
            fontWeight: "900",
            color: "#F0B310",
            textAlign: "center",
            fontStyle:'normal',
          }}
        >
        Free Now😍
        </Text>
      </View>
    );
  };

  // To handle the scroll event ------>>>>>> //
  const handleScroll = (event) => {
    // get scroll count--------->>>>>>> //
    const scrollPosition = event.nativeEvent.contentOffset.x;
    // to get the index of active item--------->>>>>>> //
    const index = scrollPosition / Width;
    setActiveIndex(index);

    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(event);
  };

  return (
    <View style={styles.main}>
      <ImageBackground
        style={{ width: Width, height: "100%" }}
        imageStyle={{ opacity: 0.6 }}
        source={require("../assets/images/theater-template.jpg")}
      />
      <View style={styles.container}>
        <FlatList
          horizontal={true}
          data={movieData}
          ref={listRef}
          renderItem={renderItem}
          getItemLayout={getItemLayOut}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
        />

        <View style={styles.dotIndicator}>
          {movieData.map((_, ind) => {
            const inputRange = [
              (ind - 1) * Width,
              ind * Width,
              (ind + 1) * Width,
            ];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [12, 30, 12],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={ind}
                style={[
                  styles.dot,
                  { width: dotWidth },
                  activeIndex === ind && styles.dotActive,
                ]}
              ></Animated.View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {
    width: Width,
    height: "100%",
    alignItems: "center",
    // justifyContent: "center",
  },
  container: {
    position: "absolute",
    width: Width,
    height: Height,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 25,
  },
  imageBox: {
    width: Width,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#fff",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 0.8,
  },
  dotIndicator: {
    width: Width,
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 270,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 3,
  },
  dotActive: {
    backgroundColor: "#000",
  },
});

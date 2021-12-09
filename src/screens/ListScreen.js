/* eslint-disable react-native/no-inline-styles */
import { Box, Button, Flex, Image, Text, useToast } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { Linking, Platform } from "react-native";

const list = [
  {
    name: "กไก่",
    images: [],
    adress: {
      text: "สุพรรณ",
      coords: {
        latitude: 11,
        longitude: 22,
      },
      contact: "",
    },
  },
  {
    name: "s",
    images: [],
    adress: {
      text: "สุพรรณ",
      coords: {
        latitude: 11,
        longitude: 22,
      },
      contact: "",
    },
  },
  {
    name: "ss",
    images: [],
    adress: {
      text: "สุพรรณ",
      coords: {
        latitude: 11,
        longitude: 22,
      },
      contact: "",
    },
  },
  {
    name: "ss",
    images: [],
    adress: {
      text: "สุพรรณ",
      coords: {
        latitude: 11,
        longitude: 22,
      },
      contact: "",
    },
  },
];
const HomeScreen = () => {
  const toast = useToast();

  const [storeList, setStoreList] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  // function
  const getStoreList = useCallback(async () => {
    try {
      setIsloading(true);

      setStoreList(list);
    } catch (err) {
      console.error(err);
    } finally {
      setIsloading(false);
    }
  }, []);

  // hook
  useEffect(() => {
    getStoreList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex
      flexDirection="row"
      flexWrap="wrap"
      flex="1"
      position="relative"
      margin="4"
    >
      {storeList?.map((list, index) => {
        return (
          <>
            <CardList key={list.name} name={list.name} />
            {index % 2 === 1 && <Flex flexBasis="100%" width="0" />}
          </>
        );
      })}
    </Flex>
  );
};

export default HomeScreen;

const CardList = ({ name }) => {
  const openGoogleMap = (lat, lng) => {
    // var scheme = Platform.OS === "ios" ? "maps:" : "geo:";
    // var url = scheme + `${lat},${lng}`;
    // Linking.openURL(url);
    if (Platform.OS === "ios") {
      Linking.openURL(`maps://app?daddr=${lat}+${lng}`);
    }

    // <TouchableOpacity onPress={() => Linking.openURL('google.navigation:q=100+101')}></TouchableOpacity>

    // <TouchableOpacity onPress={() => Linking.openURL('maps://app?saddr=100+101&daddr=100+102')}>
  };

  return (
    <Flex
      marginX="1"
      marginBottom="2"
      background="white"
      shadow="4"
      borderRadius="sm"
      padding="2"
      flexGrow="1"
      flexDirection="column"
    >
      <Image
        source={{
          uri: "https://wallpaperaccess.com/full/317501.jpg",
        }}
        alt="store photo"
        width="100%"
        height="100"
      />
      <Flex flexDirection="row" justifyContent="space-between">
        <Text fontSize="lg" fontWeight="bold">
          {name}
        </Text>
        <Box>
          <Button onPress={() => openGoogleMap(14.758937, 100.0286152)}>
            a
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

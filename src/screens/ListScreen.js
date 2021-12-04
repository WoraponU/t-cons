/* eslint-disable react-native/no-inline-styles */
import { Box, Flex, Image, Text, useToast } from "native-base";
import React, { useCallback, useEffect, useState } from "react";

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
  }, [toast]);

  // hook
  useEffect(() => {
    getStoreList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box flex="1" position="relative" margin="4">
      {storeList?.map((list) => {
        return (
          <>
            <CardList key={list.name} name={list.name} />
          </>
        );
      })}
    </Box>
  );
};

export default HomeScreen;

const CardList = ({ name }) => {
  return (
    <Flex
      marginBottom="4"
      background="white"
      shadow="4"
      borderRadius="md"
      padding="2"
      height="100"
      flexDirection="row"
    >
      <Box flex="1">
        <Text>{name}</Text>
      </Box>
      <Image
        flex="1"
        marginLeft="auto"
        source={{
          uri: "https://wallpaperaccess.com/full/317501.jpg",
        }}
        alt="store photo"
        width="50"
        height="100%"
      />
    </Flex>
  );
};

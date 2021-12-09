/* eslint-disable react-native/no-inline-styles */
import getDistance from "geolib/es/getDistance";
import { Flex, Image, Text, useToast } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { Linking, Platform } from "react-native";
import { numberFormat } from "../helper";

const storeListApi = [
  {
    name: "ก.รุ่งเจริญ",
    images: ["https://wallpaperaccess.com/full/317501.jpg"],
    adress: {
      text: "สุพรรณ",
      coords: {
        latitude: 14.4614911,
        longitude: 100.1702438,
      },
      contact: "",
    },
  },
  {
    name: "ไทวัสดุ",
    images: ["https://wallpaperaccess.com/full/317501.jpg"],
    adress: {
      text: "สุพรรณ",
      coords: {
        latitude: 14.4767031,
        longitude: 100.1311502,
      },
      contact: "",
    },
  },
  {
    name: "Home Pro",
    images: ["https://wallpaperaccess.com/full/317501.jpg"],
    adress: {
      text: "สุพรรณ",
      coords: {
        latitude: 14.4744684,
        longitude: 100.1025889,
      },
      contact: "",
    },
  },
  {
    name: "ต.แสงสุพรรณ",
    images: ["https://wallpaperaccess.com/full/317501.jpg"],
    adress: {
      text: "สุพรรณ",
      coords: {
        latitude: 14.4670853,
        longitude: 100.129806,
      },
      contact: "",
    },
  },
  {
    name: "โรบินสัน",
    images: ["https://wallpaperaccess.com/full/317501.jpg"],
    adress: {
      text: "สุพรรณ",
      coords: {
        latitude: 14.4573198,
        longitude: 100.1259004,
      },
      contact: "",
    },
  },
  {
    name: "ลาดตาลค้าวัสดุก่อสร้าง",
    images: ["https://wallpaperaccess.com/full/317501.jpg"],
    adress: {
      text: "สุพรรณ",
      coords: {
        latitude: 14.5525646,
        longitude: 100.1938894,
      },
      contact: "",
    },
  },
];
const ListScreen = ({ route }) => {
  const { pinLocation } = route.params;
  const toast = useToast();

  const [storeList, setStoreList] = useState([]);
  const [, setIsloading] = useState(false);

  // function
  const renderDistanceKm = useCallback(
    (storeLocation) => {
      return getDistance(pinLocation, storeLocation) / 1000;
    },
    [pinLocation]
  );
  const inAreaSearch = useCallback(
    (storeLocation) => {
      const allowDistanceArea = 10000; // 10 km
      return getDistance(pinLocation, storeLocation) <= allowDistanceArea;
    },
    [pinLocation]
  );
  const getStoreList = useCallback(async () => {
    try {
      setIsloading(true);

      const allowList = storeListApi?.filter((store) => {
        return inAreaSearch(store?.adress?.coords);
      });
      setStoreList(allowList);
    } catch (err) {
      console.error(err);
      toast.show({
        title: "มีบางอย่างผิดพลาด กรุณาลองใหม่",
        status: "error",
      });
    } finally {
      setIsloading(false);
    }
  }, [toast, inAreaSearch]);

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
        const distance = numberFormat.distance(
          renderDistanceKm(list?.adress?.coords)
        );
        return (
          <>
            <CardList
              key={list.name}
              name={list.name}
              image={list?.images?.[0]}
              distance={distance}
            />
            {index % 2 === 1 && <Flex flexBasis="100%" width="0" />}
          </>
        );
      })}
    </Flex>
  );
};

export default ListScreen;

const CardList = ({ name, image, distance }) => {
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
      flex="1"
    >
      <Image
        source={{
          uri: image,
        }}
        alt="store photo"
        width="100%"
        height="100"
      />
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Text fontSize="lg" fontWeight="bold" isTruncated flex="1">
          {name}
        </Text>
        <Text isTruncated textAlign="right" fontSize="sm" color="blueGray.500">
          {distance} กม.
        </Text>
      </Flex>
    </Flex>
  );
};

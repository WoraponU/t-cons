/* eslint-disable react-native/no-inline-styles */
import getDistance from "geolib/es/getDistance";
import { Flex, Image, Text, useToast } from "native-base";
import React, { Fragment, useEffect, useState } from "react";
import { numberFormat } from "../helper";

const storeListApi = [
  {
    id: 1,
    name: "ก.รุ่งเจริญ",
    images: ["https://wallpaperaccess.com/full/317501.jpg"],
    detail: "detail",
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
    id: 2,
    name: "ไทวัสดุ",
    images: ["https://wallpaperaccess.com/full/317501.jpg"],
    detail: "detail",
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
    id: 3,
    name: "Home Pro",
    images: ["https://wallpaperaccess.com/full/317501.jpg"],
    detail: "detail",
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
    id: 4,
    name: "ต.แสงสุพรรณ",
    images: ["https://wallpaperaccess.com/full/317501.jpg"],
    detail: "detail",
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
    id: 5,
    name: "โรบินสัน",
    images: ["https://wallpaperaccess.com/full/317501.jpg"],
    detail: "detail",
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
    id: 6,
    name: "ลาดตาลค้าวัสดุก่อสร้าง",
    images: ["https://wallpaperaccess.com/full/317501.jpg"],
    detail: "detail",
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

const ListScreen = ({ route, navigation }) => {
  const { pinLocation } = route.params;
  const toast = useToast();

  const [storeList, setStoreList] = useState([]);
  const [, setIsloading] = useState(false);

  // function
  const renderDistanceKm = (storeLocation) => {
    return getDistance(pinLocation, storeLocation) / 1000;
  };
  const inAreaSearch = (storeLocation) => {
    const allowDistanceArea = 10000; // 10 km
    return getDistance(pinLocation, storeLocation) <= allowDistanceArea;
  };
  const getStoreList = async () => {
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
  };

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
          <Fragment key={`${list.name}-${index}`}>
            <CardList
              id={list.id}
              name={list.name}
              image={list?.images?.[0]}
              distance={distance}
              action={() => {
                navigation.navigate("Detail", { id: list.id });
              }}
            />

            {index % 2 === 1 && <Flex flexBasis="100%" width="0" />}
          </Fragment>
        );
      })}
      {storeList?.length % 2 === 1 && (
        <Flex flex="1" flexGrow="1" padding="3" />
      )}
    </Flex>
  );
};

export default ListScreen;

const CardList = ({ name, image, distance, action }) => {
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
      onTouchStart={action}
    >
      <Image
        source={{
          uri: image,
        }}
        alt="store photo"
        width="100%"
        height="100"
        resizeMode="cover"
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

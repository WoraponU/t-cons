/* eslint-disable react-native/no-raw-text */
/* eslint-disable react-native/no-inline-styles */
import { MaterialIcons } from "@expo/vector-icons";
import getDistance from "geolib/es/getDistance";
import {
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Text,
  useToast,
} from "native-base";
import React, { Fragment, useEffect, useState } from "react";
import { numberFormat } from "../helper";
import { storeService } from "../services";

const ListScreen = ({ route, navigation }) => {
  const { pinLocation } = route.params;
  const toast = useToast();

  const [storeList, setStoreList] = useState([]);
  const [isLoading, setIsloading] = useState(false);

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
      const { data } = await storeService.list();

      const inAreaStores = data?.filter((store) => {
        return inAreaSearch(store?.adress?.coords);
      });
      setStoreList(inAreaStores);
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

  // render
  const renderStoreList = () => {
    return (
      <>
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
      </>
    );
  };
  const renderEmptyState = () => {
    return (
      <Center flex={1}>
        <MaterialIcons name="location-pin" size={64} color="gray" />
        <Heading fontSize="xl" color="gray.400">
          ไม่พบร้านค้าบริเวณนี้
        </Heading>
        <Button
          marginTop="6"
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Heading color="white" fontSize="lg">
            กลับไปยังหน้าแรก
          </Heading>
        </Button>
      </Center>
    );
  };

  return (
    <Flex
      flexDirection="row"
      flexWrap="wrap"
      flex="1"
      position="relative"
      margin="4"
      width="100%"
    >
      {(storeList?.length && renderStoreList()) || null}
      {(storeList?.length === 0 && !isLoading && renderEmptyState()) || null}
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

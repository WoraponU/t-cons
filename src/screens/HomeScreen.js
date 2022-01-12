/* eslint-disable react-native/no-inline-styles */
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { Box, Button, Flex, useTheme, useToast } from "native-base";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { delay } from "../helper";

const HomeScreen = ({ navigation }) => {
  const toast = useToast();
  const theme = useTheme();

  const [isLoading, setIsloading] = useState(false);
  const [pinLocation, setPinLocation] = useState(null);
  const [mapViewLocation, setMapViewLocation] = useState({
    latitude: 14.5699883, // suphanburi
    longitude: 99.5021254,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // function
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      toast.show({
        title: "ไม่สามารถเข้าถึงตำแหน่งของโทรศัพท์ของคุณได้",
        status: "error",
        description: "กรุณาอนุญาตการเข้าถึงตำแหน่งของโทรศัพท์",
      });
    } else {
      try {
        setIsloading(true);
        const location = await Location.getCurrentPositionAsync({});

        const targetLocation = {
          latitude: location?.coords?.latitude,
          longitude: location?.coords?.longitude,
        };
        setPinLocation(targetLocation);
        setMapViewLocation({ ...mapViewLocation, ...targetLocation });
      } catch (err) {
        console.error(err);
        toast.show({
          title: JSON.stringify(err),
          status: "error",
        });
      } finally {
        setIsloading(false);
      }
    }
  };
  const onDragPin = async (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    const targetLocation = {
      latitude,
      longitude,
    };
    setPinLocation(targetLocation);
    await delay(1000);
    setMapViewLocation({
      ...targetLocation,
      latitudeDelta: mapViewLocation.latitudeDelta,
      longitudeDelta: mapViewLocation.longitudeDelta,
    });
  };
  const onRegionChange = (region, gesture) => {
    if (Platform.OS === "android") {
      if (gesture.isGesture) {
        setMapViewLocation(region);
      }
    } else {
      setMapViewLocation(region);
    }
  };

  // hook
  useEffect(() => {
    getCurrentLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      flex="1"
      position="relative"
      alignItems="center"
      justifyContent="center"
    >
      <MapView
        region={{
          latitude: mapViewLocation?.latitude,
          longitude: mapViewLocation?.longitude,
          latitudeDelta: mapViewLocation?.latitudeDelta,
          longitudeDelta: mapViewLocation?.longitudeDelta,
        }}
        onRegionChangeComplete={onRegionChange}
        zoomEnabled
        style={{ width: "100%", height: "100%" }}
      >
        {pinLocation && (
          <Marker
            title="กดค้างเพื่อย้ายบริเวณค้นหา"
            draggable
            coordinate={{
              latitude: pinLocation?.latitude,
              longitude: pinLocation?.longitude,
            }}
            onDragEnd={onDragPin}
          />
        )}
      </MapView>
      <Flex right="8" bottom="8" position="absolute" direction="column">
        <Button
          height="60"
          width="60"
          borderRadius="30"
          onPress={getCurrentLocation}
          isLoading={isLoading}
          background="white"
          shadow="4"
          startIcon={
            <MaterialIcons
              name="location-pin"
              size={24}
              color={theme.colors.brand[900]}
            />
          }
        />
        <Button
          marginTop="4"
          height="60"
          width="60"
          borderRadius="30"
          isLoading={isLoading}
          shadow="4"
          background="brand.900"
          startIcon={<AntDesign name="search1" size={24} color="white" />}
          onPress={() => {
            navigation.navigate("List", { pinLocation });
          }}
        />
      </Flex>
    </Box>
  );
};

export default HomeScreen;

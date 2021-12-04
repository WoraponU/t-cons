import * as Location from "expo-location";
import { Box, useToast } from "native-base";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";

const HomeScreen = () => {
  const toast = useToast();

  const [pinLocation, setPinLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // function
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      toast.show({
        title: "Account verified",
        status: "error",
        description: "Thanks for signing up with us.",
      });
    } else {
      const location = await Location.getCurrentPositionAsync({});

      setPinLocation({
        latitude: location?.coords?.latitude,
        longitude: location?.coords?.longitude,
      });
    }
  };
  const onDragPin = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;

    setPinLocation({
      latitude,
      longitude,
    });
  };

  // hook
  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <Box
      flex="1"
      position="relative"
      alignItems="center"
      justifyContent="center"
    >
      <MapView
        onPoiClick={(e) => alert(e)}
        onPress={(e) => console.log(e.nativeEvent)}
        region={{
          latitude: pinLocation?.latitude,
          longitude: pinLocation?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        zoomEnabled
        style={{ width: "100%", height: "100%" }}
      >
        <Marker
          title="ค้นหาบริเวณนี้"
          draggable
          coordinate={{
            latitude: pinLocation?.latitude,
            longitude: pinLocation?.longitude,
          }}
          onDragEnd={onDragPin}
        />
      </MapView>
    </Box>
  );
};

export default HomeScreen;

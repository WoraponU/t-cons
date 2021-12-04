import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const App = () => {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app! </Text>
        <StatusBar style="auto" />
      </View>
    </NativeBaseProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// App.js
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import AppNavigator from "./core/navigation/AppNavigator";
import { initializeDatabase } from './core/database/initDatabase';

export default function App() {
  useEffect(() => {
    const initialize = async () => {
      await initializeDatabase();
    };

    initialize();
  }, []);

  const [fontsLoaded] = useFonts({
    "Roboto-Italic": require("../assets/fonts/Roboto-Italic.ttf"),
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-SemiBold": require("../assets/fonts/Roboto-SemiBold.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppNavigator />
    </SafeAreaView>
  );
}

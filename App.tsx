import React, { useState, useEffect } from "react";
import RootStack from "./src/navigation/RootStack";
import { loadAsync } from "expo-font";
import { AppLoading, SplashScreen } from "expo";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import setupStore from "./src/redux/store";
import { NavigationContainer } from "@react-navigation/native";

export default function MyApp() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFonts() {
      await loadAsync({
        // Load a font `Montserrat` from a static resource

        Montserrat: {
          uri: require("./assets/fonts/Montserrat-Regular.ttf"),
        },
        "Montserrat-Medium": {
          uri: require("./assets/fonts/Montserrat-Medium.ttf"),
        },
        "Montserrat-Bold": {
          uri: require("./assets/fonts/Montserrat-Bold.ttf"),
        },
      });

      SplashScreen.hide();
      setLoading(false);
    }

    loadFonts();
  }, []);

  const { store, persistor } = setupStore();

  return loading ? (
    <AppLoading onError={console.warn} autoHideSplash={false} />
  ) : (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

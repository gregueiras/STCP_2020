import React, { useState, useEffect } from "react";
import Main from "./src/pages/Main";
import { loadAsync } from "expo-font";
import { AppLoading, SplashScreen } from "expo";

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

  return loading ? (
    <AppLoading onError={console.warn} autoHideSplash={false} />
  ) : (
    <Main />
  );
}

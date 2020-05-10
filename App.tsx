import { NavigationContainer } from '@react-navigation/native';
import { AppLoading, SplashScreen } from 'expo';
import Constants from 'expo-constants'
import {loadAsync} from 'expo-font'
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import * as Sentry from 'sentry-expo';

import RootStack from './src/navigation/RootStack';
import setupStore from './src/redux/store';

Sentry.init({
  dsn: 'https://c3d912011a1e4a98b114fdcc6a2f6465@o387238.ingest.sentry.io/5228960',
});
Sentry.setRelease(Constants?.manifest?.revisionId ?? '1.0');

export default function MyApp() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFonts() {
      await loadAsync({
        // Load a font `Montserrat` from a static resource

        Montserrat: {
          uri: require('./assets/fonts/Montserrat-Regular.ttf'),
        },
        'Montserrat-Medium': {
          uri: require('./assets/fonts/Montserrat-Medium.ttf'),
        },
        'Montserrat-Bold': {
          uri: require('./assets/fonts/Montserrat-Bold.ttf'),
        },
      });

      SplashScreen.hide();
      setLoading(false);
    }

    loadFonts();
  }, []);

  const { store, persistor } = setupStore();

  return loading ? (
    <AppLoading onError={Sentry.captureException} autoHideSplash={false} />
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

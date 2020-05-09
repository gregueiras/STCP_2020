import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Main from '../pages/Main';
import Settings from '../pages/Settings';

type RootStackParamList = {
  Main: undefined;
  Settings: { userId: string };
};

const RootStack = createStackNavigator<RootStackParamList>();
function MyStack() {
  return (
    <RootStack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Main" component={Main} />
      <RootStack.Screen name="Settings" component={Settings} />
    </RootStack.Navigator>
  );
}

export default MyStack;

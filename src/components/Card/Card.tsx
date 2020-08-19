/* eslint-disable no-unused-expressions */
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Toast from 'react-native-root-toast';

import { defaultColor } from '../../constants';
import { Stop } from '../../redux/stops/types';
import { getTimes, Line, subscribe, unsubscribe } from '../../services/stops';
import CardContent from './CardContent';
import CardHeader from './CardHeader';

interface CardProps extends Stop {
  message?: string;
}

interface ApiState {
  value: Line[];
  loading: boolean;
}

function useApi(action: () => Promise<Line[]>, initial: Line[]) {
  const [data, setData] = useState<ApiState>({
    value: initial,
    loading: false,
  });

  async function doLoad() {
    setData({
      value: data.value,
      loading: true,
    });
    const res = await action();

    setData({
      value: res,
      loading: false,
    });
  }
  return { lines: data.value, refresh: doLoad, loading: data.loading };
}

const Card = ({ code, provider, customName, message }: CardProps) => {
  const { lines, refresh, loading } = useApi(() => getTimes(provider, code), []);

  useEffect(() => {
    if (provider && code) refresh();
  }, []);

  const onSubscribe = async ({ line }: Line) => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return;
    }

    const token = await Notifications.getExpoPushTokenAsync();

    await subscribe({ token, code, provider, line });
    Toast.show(`Subscreveu o ${line} em ${code}`);
  };

  const onUnsubscribe = async () => {
    const token = await Notifications.getExpoPushTokenAsync();
    await unsubscribe({ code, provider, token });

    Toast.show(`Cancelou todas as subscrições em ${code}`);
  };

  return (
    <View style={styles.container}>
      <CardHeader
        code={code}
        provider={provider}
        customName={customName}
        containerStyle={styles.header}
        onPress={onUnsubscribe}
      />
      <CardContent
        containerStyle={styles.content}
        message={message}
        lines={lines}
        loading={loading}
        refresh={refresh}
        provider={provider}
        onPress={onSubscribe}
      />
    </View>
  );
};

const headerSize = 20;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width * 0.75,
    marginRight: Dimensions.get('screen').width * 0.125,
    marginLeft: Dimensions.get('screen').width * 0.125,
  },
  header: {
    backgroundColor: defaultColor,
    height: `${headerSize + 0.1}%`,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content: {
    backgroundColor: '#FFFFFF',
    height: `${100 - headerSize}%`,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default Card;

import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import { defaultColor } from '../../constants';
import { Stop } from '../../redux/stops/types';
import { getTimes, Line } from '../../services/stops';
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
  const { lines, refresh, loading } = useApi(() => getTimes(code, provider), []);

  return (
    <View style={styles.container}>
      <CardHeader code={code} provider={provider} customName={customName} containerStyle={styles.header} />
      <CardContent
        containerStyle={styles.content}
        message={message}
        lines={lines}
        loading={loading}
        refresh={refresh}
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
    width: '100%',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default Card;

import React from 'react';
import { Text, View, ViewStyle, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import { Line } from '../../services/stops';
import CardLine from './CardLine';

interface CardContentProps {
  containerStyle: ViewStyle;
  message?: string;
  lines: Line[];
  refresh: () => void;
  loading: boolean;
  onPress: (stop: Line) => void;
}

const CardContent = ({ containerStyle, message, lines, refresh, loading, onPress }: CardContentProps) => {
  return (
    <View style={containerStyle}>
      {message ? (
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{message}</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={lines}
          refreshing={loading}
          onRefresh={refresh}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onPress(item)}>
              <CardLine lineStop={item} />
            </TouchableOpacity>
          )}
          keyExtractor={({ remainingTime, line, destination, time }) =>
            `${remainingTime}_${line}_${destination}_${time}`
          }
          ListEmptyComponent={() => (
            <View style={styles.messageContainer}>
              <Text style={styles.message}>Não há autocarros</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 10,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    color: '#555',
  },
});

export default CardContent;

import React, { SetStateAction, Dispatch } from "react";
import {
  Text,
  View,
  ViewStyle,
  StyleSheet,
  FlatList,
  RefreshControl,
} from "react-native";
import CardLine from "./CardLine";
import { Line } from "../../services/stops";

interface CardContentProps {
  containerStyle: ViewStyle;
  message?: string;
  lines: Line[];
  refresh: () => void;
  loading: boolean;
}

const CardContent = ({
  containerStyle,
  message,
  lines,
  refresh,
  loading,
}: CardContentProps) => {
  console.log(loading, lines[0]);

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
          renderItem={({ item }) => <CardLine lineStop={item} />}
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
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontFamily: "Montserrat",
    fontSize: 16,
    color: "#555",
  },
});

export default CardContent;

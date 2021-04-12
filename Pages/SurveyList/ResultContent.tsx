import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface ResultContent {
  buttonColour: string;
  title: string;
  value: string;
}

export const ResultContent = ({buttonColour, title, value}: ResultContent) => (
  <View style={styles.surveySingleResultWrapper}>
    <Text>{title}</Text>
    <TouchableOpacity
      style={{
        ...styles.surveySingleResultButton,
        backgroundColor: buttonColour,
      }}>
      <Text>{value}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  surveySingleResultWrapper: {
    display: 'flex',
    flexDirection: 'row',
    margin: 5,
    alignItems: 'center',
  },
  surveySingleResultButton: {
    width: 40,
    height: 40,
    marginLeft: 5,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

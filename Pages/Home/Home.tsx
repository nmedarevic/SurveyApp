import * as React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export const Home = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{'Welcome to Survey app'}</Text>
      <Button
        title="Start a survey"
        onPress={() => navigation.navigate('Survey')}
      />
      <Button
        title="View previous surveys"
        onPress={() => navigation.navigate('SurveyList')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  label: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 24,
  },
});

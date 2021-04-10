import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colours} from '../../config/colours';
import {ColourButton} from './ColourButton';

export type OnPressCallback = {
  name: string;
  index: number;
};

export interface ColourButtonQuestionProps {
  onPress: (e: OnPressCallback) => void;
  selectedIndex: number;
  name: string;
  text: string;
}

export const ColourButtonQuestion = ({
  onPress,
  selectedIndex,
  name,
  text,
}: ColourButtonQuestionProps) => {
  return (
    <View style={styles.colourButtonQuestionStyle}>
      <Text>{text}</Text>
      <View style={styles.colourButtonQuestionContainer}>
        {colours.map((colour, index) => (
          <ColourButton
            index={index}
            name={name}
            selectedIndex={selectedIndex}
            colour={colour}
            onPress={onPress}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  colourButtonQuestionContainer: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    flexWrap: 'wrap',
  },
  colourButtonQuestionStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});

import * as React from 'react';
import {Button} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';

export interface ColourButtonProps {
  index?: number;
  selectedIndex?: number;
  name?: string;
  colour?: string;
  onPress?: Function;
}

const buttonSize = 50;
const buttonSizeSelected = 80;

const getButtonStyle = (isSelected: boolean) => ({
  height: isSelected ? buttonSize : buttonSize,
  width: isSelected ? buttonSizeSelected : buttonSize,
  paddingRight: 5,
  paddingLeft: 5,
});
const noop = () => {};
export const ColourButton = ({
  index = 0,
  selectedIndex = 1,
  name = '',
  colour = 'blue',
  onPress = noop,
}: ColourButtonProps) => (
  <TouchableHighlight style={getButtonStyle(index === selectedIndex)}>
    <Button
      key={colour}
      title={`${index + 1}`}
      color={index === selectedIndex ? 'blue' : colour}
      onPress={() => {
        onPress({index, name});
      }}
    />
  </TouchableHighlight>
);

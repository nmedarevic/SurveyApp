import React from 'react';
import renderer from 'react-test-renderer';
import {ColourButton} from '../ColourButton';

jest.mock('react-native-gesture-handler', () => ({
  TouchableHighlight: ({children}: any) => ({...children}),
}));
test('renders correctly', () => {
  const tree = renderer.create(<ColourButton />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with props', () => {
  const props = {
    colour: 'red',
    index: 0,
    selectedIndex: 1,
    name: 'Name',
  };
  const tree = renderer.create(<ColourButton {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with props when selected', () => {
  const props = {
    colour: 'red',
    index: 0,
    selectedIndex: 0,
    name: 'Name',
  };
  const tree = renderer.create(<ColourButton {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';
import {ColourButtonQuestion} from '../ColourButtonQuestion';

describe('<ColourButtonQuestion />', () => {
  test('renders correctly without props', () => {
    const tree = renderer.create(<ColourButtonQuestion />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders with props', () => {
    const props = {
      text: 'I am text',
      name: 'I am a name',
      onPress: jest.fn(),
    };
    const tree = renderer.create(<ColourButtonQuestion {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders with selected item', () => {
    const props = {
      text: 'I am text',
      name: 'I am a name',
      selectedIndex: 5,
      onPress: jest.fn(),
    };
    const tree = renderer.create(<ColourButtonQuestion {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should render with props', () => {
    const props = {
      text: 'I am text',
      name: 'I am a name',
    };
    const {queryByText, getByTestId} = render(
      <ColourButtonQuestion {...props} />,
    );

    const text = queryByText(props.text);
    let activeButton;

    try {
      activeButton = getByTestId('button-blue');
    } catch (e) {}

    expect(text).toBeTruthy();
    expect(activeButton).not.toBeTruthy();
  });
});

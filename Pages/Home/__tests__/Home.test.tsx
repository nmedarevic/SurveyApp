import React from 'react';
import renderer from 'react-test-renderer';
import {Home} from '../Home';
import {render, fireEvent} from '@testing-library/react-native';

test('renders correctly', () => {
  const tree = renderer.create(<Home />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('should initiate navigation to other pages', async () => {
  const props = {
    navigation: {
      navigate: jest.fn(),
    },
  };

  const {findByText} = render(<Home {...props} />);

  const surveyButton = await findByText('Start a survey');
  const listButton = await findByText('View previous surveys');

  expect(surveyButton).toBeTruthy();
  expect(listButton).toBeTruthy();

  fireEvent.press(surveyButton);

  expect(props.navigation.navigate).toHaveBeenCalledWith('Survey');
});

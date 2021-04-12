import * as React from 'react';
import {View} from 'react-native';
import {useSurvey} from '../../hooks/useSurvey';
import {SurveyItem} from './SurveyItem';

export const SurveyList = ({navigation}: any) => {
  const {list} = useSurvey();

  const onNavigate = (id: number) => {
    navigation.navigate('Survey', {id});
  };

  return (
    <View>
      {list.map((item, index) => (
        <SurveyItem
          key={`surveritem-${index}`}
          {...item}
          onNavigate={onNavigate}
        />
      ))}
    </View>
  );
};

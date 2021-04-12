import * as React from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSurvey} from '../../hooks/useSurvey';
import {SurveyItem} from './SurveyItem';

export const SurveyList = ({navigation}: any) => {
  const {list} = useSurvey();

  const onNavigate = (id: number) => {
    navigation.navigate('Survey', {id});
  };

  return (
    <View>
      <ScrollView>
        {list.map((item, index) => (
          <SurveyItem
            key={`surveritem-${index}`}
            {...item}
            onNavigate={onNavigate}
          />
        ))}
      </ScrollView>
    </View>
  );
};

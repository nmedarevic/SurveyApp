import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import {colours} from '../../config/colours';
import {QUESTION_TITLES} from '../../config/questions';

import {SurveyResult} from '../../types/SurveyResult';
import {ResultContent} from './ResultContent';

interface SurveyItemProps extends SurveyResult {
  onNavigate: Function;
}

/**
 * A lazy man's time format
 *
 * @param timestamp number
 * @returns string
 */
const formatTime = (timestamp: number) =>
  new Date(timestamp).toISOString().replace('T', ' ').split('.')[0];

export const SurveyItem = ({
  id,
  timestamp,
  surveyResult,
  onNavigate,
}: SurveyItemProps) => {
  return (
    <ListItem
      bottomDivider
      onPress={() => {
        onNavigate(id);
      }}>
      <ListItem.Content>
        <View>
          <Text>{formatTime(timestamp)}</Text>
        </View>
        <View style={styles.resultContentList}>
          {Object.keys(surveyResult).map((key: string) => (
            <ResultContent
              key={`result-content-${key}`}
              buttonColour={colours[surveyResult[key]]}
              title={QUESTION_TITLES[key]}
              value={(surveyResult[key] + 1).toString()}
            />
          ))}
        </View>
      </ListItem.Content>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  resultContentList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  surveySingleResultContent: {
    display: 'flex',
    flexDirection: 'row',
  },
});

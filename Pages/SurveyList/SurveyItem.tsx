import * as React from 'react';
import {Text, View, Button, StyleSheet, Pressable} from 'react-native';
import {ListItem} from 'react-native-elements';
import {colours} from '../../config/colours';
import {QUESTION_TITLES} from '../../config/questions';

import {SurveyResult} from '../../types/SurveyResult';

interface SurveyItemProps extends SurveyResult {
  onNavigate: Function;
}
interface ResultContent {
  buttonColour: string;
  title: string;
  value: string;
}

const noop = () => {};

export const ResultContent = ({buttonColour, title, value}: ResultContent) => (
  <View style={styles.surveySingleResultWrapper}>
    <Text>{title}</Text>
    <Pressable style={styles.surveySingleResultButton}>
      <Button onPress={noop} title={value} color={buttonColour} />
    </Pressable>
  </View>
);

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
          <Text>{new Date(timestamp).toDateString()}</Text>
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
  },
  surveySingleResultContent: {
    display: 'flex',
    flexDirection: 'row',
  },
  surveySingleResultWrapper: {
    display: 'flex',
    flexDirection: 'row',
    margin: 5,
    alignItems: 'center',
  },
  surveySingleResultButton: {width: 40, height: 40, marginLeft: 5},
});

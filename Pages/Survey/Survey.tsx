import * as React from 'react';
import {Button, Dimensions, StyleSheet, Text, View} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {QUESTIONS} from '../../config/questions';
import {useSurvey} from '../../hooks/useSurvey';
import {Alert} from 'react-native';
import {ColourButtonQuestion, OnPressCallback} from './ColourButtonQuestion';
import {SurveyResult} from '../../types/SurveyResult';

var width = Dimensions.get('window').width;

const questionTopics = [QUESTIONS.SKIN_RESULT, QUESTIONS.SLEEP_RESULT];

export const Survey = ({navigation, route}: any) => {
  const {list, createSurveyResult} = useSurvey();
  const [answers, setAnswer]: [any, Function] = React.useState({});

  React.useEffect(() => {
    const surveyId = route.params.id;

    const foundAnswer = list.find((item: SurveyResult) => item.id === surveyId);
    console.log(surveyId, foundAnswer);

    if (foundAnswer) {
      setAnswer(foundAnswer.surveyResult);
    }
  }, [list, route.params.id]);

  const onQuestionAnswer = ({index, name}: OnPressCallback) => {
    setAnswer({
      ...answers,
      [name]: index,
    });
  };

  const onSubmit = async () => {
    if (Object.keys(answers).length === 0) {
      Alert.alert('You must give both answers!');

      return;
    }

    await createSurveyResult(answers);

    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'How do you feel?'}</Text>
      <Text style={styles.subtitle}>{'On a scale from 1 to 10'}</Text>
      <View style={{width}}>
        {questionTopics.map((questionTopic, index) => (
          <ColourButtonQuestion
            key={`${questionTopic.key}-${index}`}
            name={questionTopic.key}
            text={questionTopic.text}
            selectedIndex={answers[questionTopic.key]}
            onPress={onQuestionAnswer}
          />
        ))}
      </View>
      <View>
        <TouchableHighlight style={styles.submitButton}>
          <Button title="Submit answer" color="blue" onPress={onSubmit} />
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {display: 'flex', flexDirection: 'column', width},
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {fontSize: 16, alignSelf: 'center', marginBottom: 20},
  submitButton: {alignSelf: 'center'},
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

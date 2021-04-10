import {SurveyData} from './SurveyData';

export interface SurveyResult {
  id: string;
  timestamp: number;
  surveyResult: SurveyData;
}

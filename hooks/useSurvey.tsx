import {useState, useEffect} from 'react';
import {useDatabase} from '../database/databaseContext';
import {SurveyData} from '../types/SurveyData';

import {SurveyResult} from '../types/SurveyResult';

export function useSurvey() {
  const [list, setResults] = useState<SurveyResult[]>([]);
  const database = useDatabase();

  useEffect(() => {
    refreshSurveyList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function refreshSurveyList() {
    // Query all lists from the DB, then store them as state
    return database.getAllSurveyResults().then(setResults);
  }

  function createSurveyResult(data: SurveyData): Promise<void> {
    return database.addSurveyResult(data).then(refreshSurveyList);
  }

  function updateSurveyResult(data: SurveyResult): Promise<void> {
    return database.updateSurveyResult(data).then(refreshSurveyList);
  }

  return {
    list,
    refreshSurveyList,
    createSurveyResult,
    updateSurveyResult,
  };
}

import SQLite from 'react-native-sqlite-storage';
import {DatabaseInitialization} from './databaseInit';
import {SurveyResult} from '../types/SurveyResult';
import {AppState, AppStateStatus} from 'react-native';
import {SurveyData} from '../types/SurveyData';
// import {uuid} from 'uuidv4';

export interface Database {
  addSurveyResult(result: SurveyData): Promise<void>;
  getAllSurveyResults(): Promise<SurveyResult[]>;
  updateSurveyResult(surveyResult: SurveyResult): Promise<SurveyResult>;
}

let databaseInstance: SQLite.SQLiteDatabase | undefined;

async function addSurveyResult(data: SurveyData): Promise<void> {
  const db = await getDatabase();

  const [results] = await db.executeSql(
    `INSERT INTO SurveyResult (id, timestamp, result)
     VALUES (${Date.now()}, ${Date.now()}, '${JSON.stringify(data)}')
    `,
  );

  console.log(results);

  return;
}

async function getAllSurveyResults(): Promise<SurveyResult[]> {
  console.log('[db] Fetching lists from the db...');

  const db = await getDatabase();

  const [results] = await db.executeSql(
    'SELECT id, timestamp, result FROM SurveyResult',
  );

  if (results === undefined) {
    return [];
  }

  const count = results.rows.length;

  const lists: SurveyResult[] = [];

  for (let i = 0; i < count; i++) {
    const row = results.rows.item(i);

    const {id, timestamp, result} = row;

    lists.push({id, timestamp, surveyResult: JSON.parse(result)});
  }

  return lists;
}

async function updateSurveyResult(
  updateData: SurveyResult,
): Promise<SurveyResult> {
  const {surveyResult, id} = updateData;
  const db = await getDatabase();

  await db.executeSql(
    'UPDATE ListItem SET timestamp = ?, result = ? WHERE item_id = ?;',
    [Date.now(), JSON.stringify(surveyResult), id],
  );

  return updateData;
}

// "Private" helpers

async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (databaseInstance !== undefined) {
    return Promise.resolve(databaseInstance);
  }

  return open();
}

// Open a connection to the database
async function open(): Promise<SQLite.SQLiteDatabase> {
  SQLite.DEBUG(true);
  SQLite.enablePromise(true);

  if (databaseInstance) {
    console.log(
      '[db] Database is already open: returning the existing instance',
    );
    return databaseInstance;
  }

  // Otherwise, create a new instance
  const db = await SQLite.openDatabase({
    name: 'AppDatabase.db',
    location: 'default',
  });
  console.log('[db] Database open!');

  // Perform any database initialization or updates, if needed
  const databaseInitialization = new DatabaseInitialization();
  await databaseInitialization.updateDatabaseTables(db);

  databaseInstance = db;
  return db;
}

// Close the connection to the database
async function close(): Promise<void> {
  if (databaseInstance === undefined) {
    console.log("[db] No need to close DB again - it's already closed");
    return;
  }
  await databaseInstance.close();
  console.log('[db] Database closed.');
  databaseInstance = undefined;
}

// Listen to app state changes. Close the database when the app is put into the background (or enters the "inactive" state)
let appState = 'active';
console.log('[db] Adding listener to handle app state changes');
AppState.addEventListener('change', handleAppStateChange);

// Handle the app going from foreground to background, and vice versa.
function handleAppStateChange(nextAppState: AppStateStatus) {
  if (appState === 'active' && nextAppState.match(/inactive|background/)) {
    // App has moved from the foreground into the background (or become inactive)
    console.log('[db] App has gone to the background - closing DB connection.');
    close();
  }
  appState = nextAppState;
}

// Export the functions which fulfill the Database interface contract
export const sqliteDatabase: Database = {
  addSurveyResult,
  getAllSurveyResults,
  updateSurveyResult,
};

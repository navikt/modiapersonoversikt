import { combineReducers } from 'redux';

import personReducer from '../ducks/person';
import { STATUS } from '../ducks/utils';
import { Person } from '../models/person';

export interface AppState {
    person: Reducer<Person>;
}

export default combineReducers<AppState>({
    person: personReducer
});

export interface Reducer<T> {
    status: STATUS;
    data: T;
}
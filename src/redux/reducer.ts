import { combineReducers } from 'redux';

import personReducer from './person';
import { STATUS } from './utils';
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
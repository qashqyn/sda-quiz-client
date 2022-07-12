import { combineReducers } from "redux";

import users from './users';
import quiz from './quiz';

export default combineReducers({
    users, quiz
});
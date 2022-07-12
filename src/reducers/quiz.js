import {  FETCH_QUESTIONS, FETCH_ATTEMPTS } from "../constants/actionTypes";

const quizReducers = (state = {}, action) => {
    switch (action.type) {
        case FETCH_QUESTIONS:
            return {...state, questions: action.payload.data};
        case FETCH_ATTEMPTS:
            return {...state, attempts: action.payload.data};
        default:
            return state;
    }
};
export default quizReducers;
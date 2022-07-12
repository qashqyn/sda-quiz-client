import * as api from '../api';
import { FETCH_ATTEMPTS, FETCH_QUESTIONS } from '../constants/actionTypes';

export const getQuestions = (count) => async (dispatch) => {
    try {
        const data = await api.fetchQuestions(count);
        dispatch({type: FETCH_QUESTIONS, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const getAttempts = () => async (dispatch) => {
    try {
        const data = await api.fetchAttempts();
        dispatch({type: FETCH_ATTEMPTS, payload: data});
    } catch (error) {
        console.log(error);
    }
}
export const calculateAttempt = (attempt) => async (dispatch) => {
    try {
        await api.calculateAttempt(attempt);
        // dispatch({type: FETCH_ATTEMPTS, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const addQuestion = (formData) => async (dispatch)=>{
    try {
        await api.addQuestion(formData);
    } catch (error) {
        console.log(error);
        
    }
}